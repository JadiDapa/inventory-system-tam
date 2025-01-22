import Image from "next/image";
import RegisterForm from "@/components/Auth/Register/RegisterForm";
import Link from "next/link";
import { BookUser } from "lucide-react";

export default function RegisterPage() {
  return (
    <section className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <figure className="hidden h-full w-full overflow-hidden p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1721937718756-3bfec49f42a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW52ZW50b3J5fGVufDB8fDB8fHww"
            alt="Dummy Image"
            fill
            className="h-full w-full object-cover object-center"
          />
        </div>
      </figure>
      <main className="flex flex-col justify-center p-8 lg:p-32">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl lg:text-5xl">Create An Account</h1>
          <BookUser
            className="-translate-y-4 text-primary"
            size={48}
            strokeWidth={1.2}
          />
        </div>

        <p className="mt-4 text-sm lg:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur.
        </p>
        <RegisterForm />
        <p className="mt-4 text-center lg:mt-6">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/login">
            Login Now!
          </Link>
        </p>
      </main>
    </section>
  );
}
