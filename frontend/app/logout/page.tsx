"use client"

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
import { useCartStore } from '@/store/cartStore';

const LogoutPage = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { clearCart } = useCartStore();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const delay = 5000;
    const timer = setTimeout(() => {
      clearAuth();
      clearCart();
      setLoading(false);
      router.push('/');
    }, delay);

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [clearAuth, router, clearCart]);

  if (loading) {
    return <Loader />;
  }

  return null;
};

export default LogoutPage;
