import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <section className="font-jakarta relative min-h-screen w-full overflow-hidden">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="mx-6 grid h-full grid-cols-4 lg:mx-20">
          <div className="border-l" />
          <div className="border-l" />
          <div className="border-l" />
          <div className="border-l" />
        </div>
      </div>
      <div className="z-10">{children}</div>
    </section>
  );
}
