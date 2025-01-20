import { Globe, Menu, Rocket, Stars } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="mx-6 pb-6 pt-6 lg:mx-20">
      <div className="flex justify-between">
        <div className="flex">
          <div className="grid h-20 w-20 place-items-center border border-black p-6">
            <Menu size={32} strokeWidth={1.5} />
          </div>
          <div className="grid h-20 place-items-center border border-black bg-black px-6 text-4xl font-bold text-white">
            DAFFA AR
          </div>
        </div>
        <div className="flex h-20 items-center gap-24 border border-black px-6 text-xl font-bold">
          <p>GET STARTED</p>
          <Rocket />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-y-6 border border-black bg-gray-50/50 py-24">
        <div className="flex items-center gap-8">
          <h2>CREATIVE SERVICE</h2>
          <Globe size={48} strokeWidth={1.1} />
          <h2>FOR MODERN BRANDS</h2>
        </div>
        <h1 className="text-center text-8xl font-black">
          WE BUILD BRANDS <br /> THAT{" "}
          <span
            style={{
              textShadow:
                "0px 0px 3px black,-2px 2px black, -4px 4px black, -6px 6px black, -8px 8px black",
            }}
            className="-translate-y-40 text-white"
          >
            STAND
          </span>{" "}
          OUT
        </h1>
        <p className="max-w-xl text-center text-2xl font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut in
          voluptatibus temporibus odio.
        </p>
      </div>

      <div className="grid h-full grid-cols-4">
        <div />
        <div className="flex h-20 w-full items-center justify-between border border-t-0 border-black px-6 font-bold">
          <p>VIEW OUR WORK</p>
          <Stars size={32} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
