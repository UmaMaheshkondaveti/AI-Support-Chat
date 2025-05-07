
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

// Helper function to get users from localStorage
const getUsersFromStorage = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsersToStorage = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for logged-in user on initial load
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        try {
          setUser(JSON.parse(loggedInUser));
        } catch (e) {
           console.error("Failed to parse loggedInUser", e);
           localStorage.removeItem('loggedInUser');
        }
    }
    setLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    setLoading(true);
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.username === username && u.password === password); // Insecure password check for demo

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name || foundUser.username, // Use name if available
      };
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
      navigate('/chat', { replace: true });
       setLoading(false);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid username or password.",
      });
       setLoading(false);
      return false;
    }
  }, [navigate, toast]);


  const signup = useCallback((name, username, password) => {
     setLoading(true);
    const users = getUsersFromStorage();
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Username already exists. Please choose another.",
      });
       setLoading(false);
      return false;
    } else {
      const newUser = {
        id: Date.now().toString(),
        name,
        username,
        password, // Storing plain password - highly insecure, for demo only!
      };
      const updatedUsers = [...users, newUser];
      saveUsersToStorage(updatedUsers);

      toast({
        title: "Signup Successful",
        description: "Your account has been created. Please login.",
      });
      navigate('/login'); // Redirect to login after successful signup
       setLoading(false);
      return true;
    }
  }, [navigate, toast]);

  const logout = useCallback(() => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    // Clear chat messages for the logged-out user
     const userId = user?.id; // Get user id before setting user to null
     if (userId) {
       localStorage.removeItem(`chat_${userId}`);
     }
    navigate('/login', { replace: true });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [navigate, toast, user]);


  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
  