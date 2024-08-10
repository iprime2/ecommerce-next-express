"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-toogle";
import { ShoppingCart, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar: React.FC<{ onSearch?: (query: string) => void, type?: string }> = ({ onSearch, type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { token, clearAuth } = useAuthStore();
  const { getTotalCount } = useCartStore();
  const [mounted, setMounted] = useState<boolean>(false);
  const cartCount = getTotalCount();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "BUYER" && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    clearAuth();
    router.push("/auth");
  };

  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Krishil
            </Link>
          </div>
          {type === "BUYER" && (
            <div className="flex flex-1 justify-center items-center px-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg flex">
                <Input
                  id="search"
                  name="search"
                  className="w-full pl-4 pr-14 py-2 border border-gray-300 rounded-l-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search for products..."
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button
                  type="submit"
                  className="rounded-r-full bg-indigo-600 text-white px-4 py-2"
                >
                  Search
                </Button>
              </form>
            </div>
          )}
          <div className="flex items-center space-x-6">
            {!token ? (
              <Link
                href="/auth"
                className="bg-indigo-600 text-white px-3 py-2 rounded-full text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm group flex p-3 justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <LogOut className="text-gray-600 dark:text-white" />
              </button>
            )}
            {type === "BUYER" && (
              <Link href="/cart" className="relative">
                <ShoppingCart className="text-gray-600 dark:text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
