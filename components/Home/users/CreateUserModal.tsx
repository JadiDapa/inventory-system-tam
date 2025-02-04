"use client";

import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserType } from "@/lib/types/user";
import { createUser } from "@/lib/networks/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  role: z.string().min(1, "Role is required"),
});

interface CreateUserModalProps {
  children: React.ReactNode;
}

export default function CreateUserModal({ children }: CreateUserModalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: onCreateUser, isPending } = useMutation({
    mutationFn: (values: CreateUserType) => createUser(values),
    onSuccess: () => {
      toast.success("Data Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.refresh();
      setIsDialogOpen(false);
    },
    onError: () => toast.error("Something Went Wrong!"),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    onCreateUser(values);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add a New User
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap gap-12 pt-4 lg:gap-4"
            >
              <div className="flex-1 space-y-2 lg:space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="User Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isPending}
                className="flex w-full items-center gap-3"
                type="submit"
              >
                {isPending ? (
                  <>
                    Submitting
                    <TailSpin
                      visible={true}
                      color="#ffffff"
                      ariaLabel="tail-spin-loading"
                      radius="0.2"
                      width={24}
                      height={24}
                      strokeWidth={5}
                    />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
