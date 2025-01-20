"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FadeLoader } from "react-spinners";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { username, password } = values;
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (response?.error) {
        toast.error("Invalid Email or Password!");
      } else {
        toast.success("Account Created Successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("TSomething Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="relative">
                <User
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-800"
                />
                <FormControl>
                  <Input
                    className="h-12 w-full border-slate-800 ps-12"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <Mail
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-800"
                />
                <FormControl>
                  <Input
                    className="h-12 w-full border-slate-600 ps-12"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <Lock
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-800"
                />
                <FormControl>
                  <Input
                    className="h-12 w-full border-slate-800 ps-12"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-start" />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isLoading}
          className="mt-10 flex h-12 w-full items-center gap-3 text-lg"
        >
          {isLoading ? (
            <>
              Submitting
              <FadeLoader />
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
