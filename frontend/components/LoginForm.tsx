"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiRequest } from "@/utils/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (loginData: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await apiRequest<{ token: string; user: { id: string; name: string; email: string; role: string } }>({
        url: "/api/auth/login",
        method: "POST",
        data: loginData,
      });
      setAuth(response.token, response.user);
      toast.success("Logged In successfully!!");
      router.push(`/`);
    } catch (error: any) {
      console.error("Login error:", error);
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
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
        className="space-y-8 w-full flex items-center flex-col"
      >
        <div className="w-full flex item-center gap-4 flex-col">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="sushil@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="sushil1234"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} className="w-full ml-auto" type="submit">
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
