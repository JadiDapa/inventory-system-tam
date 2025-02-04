"use client";

import StatisticCard from "@/components/Home/StatisticCard";
import { ChartCandlestickIcon, UsersRound } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data } = useSession();
  return (
    <section className="min-h-screen w-full overflow-hidden">
      <div className="grid w-full grid-cols-4 gap-5">
        <StatisticCard Icon={UsersRound} title="Total Users" value={100} />
        <StatisticCard
          Icon={ChartCandlestickIcon}
          title="Total Users"
          value={100}
        />
        <StatisticCard Icon={UsersRound} title="Total Users" value={100} />
        <StatisticCard Icon={UsersRound} title="Total Users" value={100} />
      </div>
      <h1 className="mt-12 text-4xl font-medium">
        Welcome Back,{" "}
        <span className="font-bold text-primary">{data?.user?.username}</span>
      </h1>
    </section>
  );
}
