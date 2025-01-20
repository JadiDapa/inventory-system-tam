"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function SearchDialog() {
  const [search, setSearch] = useState("");
  const [pages] = useState([
    {
      name: "Data Diri",
      url: "/dashboard/data-diri",
    },
    {
      name: "Pendidikan",
      url: "/dashboard/pendidikan",
    },
    {
      name: "Prestasi",
      url: "/dashboard/prestasi",
    },
  ]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const filteredSection = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-[44px] w-80 items-center gap-4 rounded-md bg-white px-4">
      <div className="flex size-5 items-center justify-center rounded-full duration-300 hover:bg-gray-200">
        <Search strokeWidth={1.5} />
      </div>
      <Dialog>
        <DialogTrigger className="w-full text-start text-gray-400">
          Search
        </DialogTrigger>
        <DialogContent className="flex flex-col px-0 pb-0 pt-4 lg:w-[660px]">
          <div className="relative w-80 pl-8">
            <Search className="absolute left-10 top-1.5 text-sm text-slate-400" />
            <Input
              type="text"
              placeholder="Search a page"
              value={search}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
          <hr />
          <div className="flex h-72 flex-col overflow-y-scroll px-8 py-4">
            {filteredSection?.map((section) => (
              <DialogClose key={section.name}>
                <Link
                  href={section.url}
                  className="group pt-2 duration-300 hover:rounded-lg hover:bg-gray-100"
                >
                  <div className="flex flex-col items-start">
                    <div className="translate-x-2 font-semibold">
                      {section.name}
                    </div>
                    <div className="translate-x-2 text-sm text-slate-500">
                      {section.url}
                    </div>
                  </div>
                  <hr className="mt-2 group-hover:opacity-0" />
                </Link>
              </DialogClose>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
