"use client";

import React, { useState } from "react";
import SignupForm from "@/components/SignupForm";
import LoginForm from "@/components/LoginForm";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full dark:bg-slate-900">
        <h2 className="text-2xl font-semibold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}

        <Separator className="my-6" />

        <div className="flex items-center flex-col text-center">
          {isLogin ? (
            <span>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 hover:underline"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 hover:underline"
              >
                Login
              </button>
            </span>
          )}
          <span>
            Return back to{" "}
            <button
              type="button"
              onClick={() => router.push(`/`)}
              className="text-indigo-600 hover:underline"
            >
              home!
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
