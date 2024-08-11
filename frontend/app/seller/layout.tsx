"use client"

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const { token, user } = useAuthStore();

  if(!token){
    toast.error("Unauthorized.Please Login First!")
    router.push("/login");
  }

  if(token && user?.role == "BUYER"){
    toast.error("Unauthorized.Please Login First!")
    router.push("/");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="w-full md:pl-60">
        <Navbar type="seller"/>
        <div className="pt-16"> 
        {children}
      </div>
      </main>
    </div>
  );
}
