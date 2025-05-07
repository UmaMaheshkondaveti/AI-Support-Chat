
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MiniCart from '@/components/MiniCart';
import { useCart } from '@/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Replace with actual logo if available */}
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Mellow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <Link to="/products" className="transition-colors hover:text-primary">Products</Link>
          <Link to="/#about" className="transition-colors hover:text-primary">About</Link> {/* Example link */}
          <Link to="/#contact" className="transition-colors hover:text-primary">Contact</Link> {/* Example link */}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 mr-4" align="end">
               <MiniCart />
            </DropdownMenuContent>
          </DropdownMenu>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link to="/">Home</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/products">Products</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/#about">About</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/#contact">Contact</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
  