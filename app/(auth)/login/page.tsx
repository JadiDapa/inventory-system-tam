"use client";

import Image from "next/image";
import LoginForm from "@/components/Auth/Login/LoginForm";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1521106047354-5a5b85e819ee?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1589935447067-5531094415d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1682145723071-33e2207f4eb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <main className="flex flex-col justify-center p-8 lg:px-36 lg:py-24">
        <div className="flex items-center gap-4 lg:justify-between">
          <h1 className="text-3xl font-medium text-primary lg:text-5xl">
            <span className="font-semibold text-secondary lg:text-6xl">
              Login
            </span>{" "}
            With
            <br className="hidden lg:block" /> Your Account!
          </h1>
          <KeyRound
            className="size-12 text-secondary lg:size-20"
            strokeWidth={1.4}
          />
        </div>

        <p className="mt-4 text-sm lg:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur.
        </p>
        <LoginForm />
        <p className="mt-4 text-center lg:mt-6">
          Dont have an account?{" "}
          <Link className="text-primary underline" href="/register">
            Create Now!
          </Link>
        </p>
      </main>
      <aside className="absolute -z-50 h-full w-full overflow-hidden p-4 opacity-40 lg:relative lg:z-0 lg:block lg:opacity-100">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <div className="absolute right-0 top-0 z-50 flex h-20 w-52 items-center justify-center rounded-bl-3xl bg-tertiary/50 p-4">
            <figure className="relative h-16 w-40">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain object-center"
              />
            </figure>
          </div>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
