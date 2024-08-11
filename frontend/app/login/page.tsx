"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiRequest } from '@/utils/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (loginData: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await apiRequest<{ token: string; user: { id: string; name: string; email: string; role: string } }>({
        url: '/api/auth/login',
        method: 'POST',
        data: loginData,
      });
      setAuth(response.token, response.user);
      toast.success("Logged In successfully!!");
      router.push(`/`);
    } catch (error: any) {
      console.error('Login error:', error);
      if ((error as any).response.data.error) {
        toast.error((error as any).response.data.error);
      } else {
        toast.error("Something Went Wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full dark:bg-slate-900">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className='space-y-8 w-full flex items-center flex-col'
          >
            <div className='w-full flex item-center gap-4 flex-col'>
              <FormField
                control={loginForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='sushil@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        placeholder='sushil1234'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className='w-full ml-auto' type='submit'>
              Log In
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="flex items-center flex-col text-center">
          <span>
            Do not have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-indigo-600 hover:underline"
            >
              Sign Up
            </button>
          </span>
          <span>
            Return back to {' '}
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

export default LoginPage;
