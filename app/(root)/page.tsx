"use client";

import StatisticCard from "@/components/Home/StatisticCard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllConsumes } from "@/lib/networks/consume";
import { getAllEntries } from "@/lib/networks/entry";
import { getAllItems } from "@/lib/networks/item";
import { getAllRequests } from "@/lib/networks/request";
import { getAllUsers } from "@/lib/networks/user";
import { useQuery } from "@tanstack/react-query";
import { Boxes, Package, PackageOpen, UserCog, UsersRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 198 },
  { month: "August", desktop: 100 },
  { month: "September", desktop: 100 },
  { month: "October", desktop: 100 },
  { month: "November", desktop: 100 },
  { month: "December", desktop: 100 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  const { data: entries } = useQuery({
    queryFn: getAllEntries,
    queryKey: ["entries"],
  });

  const { data: consumes } = useQuery({
    queryFn: getAllConsumes,
    queryKey: ["consumes"],
  });

  const { data: users } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const { data: requests } = useQuery({
    queryFn: getAllRequests,
    queryKey: ["requests"],
  });

  const { data } = useSession();

  if (!items || !entries || !consumes || !users || !requests)
    return <div>Loading...</div>;

  return (
    <section className="min-h-screen w-full space-y-6 overflow-hidden">
      <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        <StatisticCard Icon={Boxes} title="Total Items" value={items?.length} />
        <StatisticCard
          Icon={Package}
          title="Total Entries"
          value={entries.length}
        />
        <StatisticCard
          Icon={PackageOpen}
          title="Total Consumes"
          value={consumes.length}
        />
        <StatisticCard
          Icon={UsersRound}
          title="Total Requests"
          value={users?.length}
        />
      </div>
      <div className="flex flex-col gap-6 lg:h-96 lg:flex-row">
        <div className="flex-[3] rounded-md bg-tertiary p-6 shadow-md lg:h-96">
          <ChartContainer className="h-full w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-[1] flex-col items-center gap-3 space-y-2 rounded-md bg-tertiary p-6 shadow-md">
          <figure className="relative size-32 overflow-hidden rounded-full">
            <Image
              src="/images/logo-placeholder.jpg"
              alt=""
              fill
              className="object-cover object-center"
            />
          </figure>
          <h1 className="text-xl font-semibold capitalize">
            Welcome! {data?.user?.username}
          </h1>
          <div className="flex items-center gap-2 text-primary">
            <UserCog />
            <p className="text-2xl capitalize">{data?.user?.role}</p>
          </div>
          <div className="flex justify-center gap-3">
            <div className="flex flex-col items-center">
              <p>Requests</p>
              <p className="text-2xl font-bold text-primary">
                {requests?.length}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p>Accepted</p>
              <p className="text-2xl font-bold text-green-500">
                {requests.filter((r) => r.status === "accepted").length}
              </p>{" "}
            </div>
            <div className="flex flex-col items-center">
              <p>Rejected</p>
              <p className="text-2xl font-bold text-red-500">
                {requests.filter((r) => r.status === "rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
