import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <section className="font-jakarta min-h-screen w-full overflow-hidden">
      {children}
    </section>
  );
}
