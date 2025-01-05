"use client";

import * as React from "react";
import { Bot, Clock, PieChart, Settings2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    // {
    //   title: "Dashboard",
    //   url: "/",
    //   icon: PieChart,
    // },
    {
      title: "Chat",
      url: "/chat",
      icon: Bot,
    },
    {
      title: "Coming Soon",
      url: "",
      icon: Clock,
      items: [
        {
          title: "Analytics",
          icon: PieChart,
          url: "",
        },
        {
          title: "Settings",
          icon: Settings2,
          url: "",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-primary shadow-primary shadow-md bg-white/30"
    >
      <SidebarHeader>
        <p
          className={`" text-4xl transition-all ease-in-out duration-200 font-bold w-full text-start bg-gradient-to-br bg-clip-text text-transparent from-black to-primary ${
            open ? "" : "text-xl"
          }`}
        >
          {open ? "SocialPulse" : "SP"}
        </p>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
