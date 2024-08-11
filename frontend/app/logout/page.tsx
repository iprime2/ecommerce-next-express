"use client"

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
import { useCartStore } from '@/store/cartStore';

const LogoutPage = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(true); 
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        clearCart();
        clearAuth();
        router.push('/');
      }, 2000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [clearAuth, router, clearCart]);

  return (
    <div className={`transition-opacity duration-2000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <Loader />
      <p className="text-center text-gray-500 mt-4">Logging out, please wait...</p>
    </div>
  );
};

export default LogoutPage;
