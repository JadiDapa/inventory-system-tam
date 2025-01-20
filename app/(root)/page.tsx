import StatisticCard from "@/components/Home/StatisticCard";
import { ChartCandlestickIcon, UsersRound } from "lucide-react";

export default function Home() {
  return (
    <section className="flex min-h-screen w-full overflow-hidden">
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
    </section>
  );
}
