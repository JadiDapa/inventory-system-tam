"use client";

import { ArrowRight, Palette, Stars } from "lucide-react";
import { useAnimation } from "motion/react";
import * as motion from "motion/react-client";

export default function Expertise() {
  const controls = useAnimation();

  return (
    <section
      id="expertise"
      className="mx-6 mt-24 space-y-24 pb-6 pt-6 lg:mx-20"
    >
      <div className="grid grid-cols-4">
        <div className="col-span-2 space-y-3 px-6">
          <h2 className="text-8xl font-black">EXPERTISE</h2>
          <div className="text-2xl font-medium">
            Physical, digital, meta-physical – We’ll find a creative solution
            for all your business problems
          </div>
        </div>
        <div />
        <div className="flex h-20 w-full items-center justify-between border border-black px-6 font-bold">
          <p>VIEW SERVICES</p>
          <Stars size={32} strokeWidth={1.5} />
        </div>
      </div>
      <div className="grid grid-cols-4">
        <motion.div
          onHoverStart={() => controls.start({ x: 0 })}
          onHoverEnd={() => controls.start({ x: -1 })}
          className="h-[440px] translate-y-3 border border-black p-10"
        >
          <div className="h-full w-full overflow-hidden rounded-lg border">
            <motion.div
              className="flex gap-6"
              initial={{ x: -1 }}
              animate={controls}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowRight size={48} strokeWidth={1.2} />
              <Palette size={48} strokeWidth={1.2} />
            </motion.div>
            <div className="space-y-4">
              <h4 className="text-4xl">Branding</h4>
              <p className="text-xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
                impedit doloribus necessitatibus!
              </p>
            </div>
          </div>
        </motion.div>
        <div className="h-[440px] translate-y-9 border border-black"></div>
        <div className="h-[440px] translate-y-6 border border-black"></div>
        <div className="h-[440px] border border-black"></div>
      </div>
    </section>
  );
}
