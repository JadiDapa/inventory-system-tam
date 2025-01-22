"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FadeLoader } from "react-spinners";
import { createUser } from "@/lib/networks/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserType } from "@/lib/types/user";
import { AxiosError } from "axios";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

interface ErrorResponse {
  error: string;
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const query = useQueryClient();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: onCreateUser } = useMutation({
    mutationFn: (values: CreateUserType) => createUser(values),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["users"] });
      toast.success("Akun Berhasil Terdaftar!");
      router.push("/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Terjadi Kessalahan Pada Server!");
      }
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    onCreateUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full lg:mt-6"
      >
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
                    className="h-10 w-full border-2 border-primary ps-12 lg:h-12"
                    placeholder="Username"
                    type="text"
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
                <div
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1 text-slate-800"
                >
                  {isVisible ? <Eye size={24} /> : <EyeClosed size={24} />}
                </div>

                <FormControl>
                  <Input
                    className="h-10 w-full border-2 border-primary ps-12 lg:h-12"
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
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
          className="mt-6 flex h-10 w-full items-center gap-3 text-lg lg:mt-10 lg:h-12"
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
