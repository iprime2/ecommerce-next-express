"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiRequest } from '@/utils/api';
import { useAuthStore } from '@/store/authStore';
import { useParams, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-hot-toast';


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['SELLER', 'BUYER']),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const roles =  [
    'SELLER',
    'BUYER',
  ];
  const params = useParams();
  const router = useRouter();

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined,
    },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = async (loginData: LoginFormValues) => {
    setLoading(true)
    try {
      const response = await apiRequest<{ token: string; user: { id: string; name: string; email: string; role: string } }>({
        url: '/api/auth/login',
        method: 'POST',
        data:loginData,
      });
      setAuth(response.token, response.user);
      toast.success("Logged In successful!!");
      if(response.user.role === "SELLER"){
        router.push(`/seller/products`)
      }
      if(response.user.role === "BUYER"){
        router.push(`/`)
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Login Failed!");
      toast.error(error.response.data.error as string);
    } finally {
      setLoading(false)
    }
  };

  const handleSignup = async (signupData: SignupFormValues) => {
    setLoading(true)
    try {
      const response = await apiRequest<{ token: string; user: { id: string; name: string; email: string; role: string } }>({
        url: '/api/auth/register',
        method: 'POST',
        data:signupData,
      });
      setAuth(response.token, response.user);
      toast.success("Signup successful");
      if(response.user.role === "SELLER"){
        router.push(`/seller/products`)
      }
      if(response.user.role === "BUYER"){
        router.push(`/`)
      }
      setIsLogin(true); 
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Signup Failed!");
      //@ts-ignore
      toast.error(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full dark:bg-slate-900">
        <h2 className="text-2xl font-semibold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {isLogin ? (
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
                           placeholder='Email'
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
                           placeholder='Passsword'
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
        ) : (
          <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(handleSignup)}
            className='space-y-8 w-full flex items-center flex-col'
          >
            <div className='w-full flex item-center gap-4 flex-col'>
            <FormField
                control={signupForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter Email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={signupForm.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        placeholder='Enter Passsword'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={signupForm.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a role'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
        )}

        <Separator className="my-6" />

        <div className="flex items-center flex-col text-center">
          {isLogin ? (
            <span>
              Dont have an account?{' '}
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
              Already have an account?{' '}
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

export default AuthPage;
