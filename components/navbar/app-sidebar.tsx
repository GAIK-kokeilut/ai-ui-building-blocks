import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ActiveNavLink } from "./active-link";
import { NavUser } from "./nav-user";

export interface NavData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
}

export interface NavItem {
  title: string;
  url: string;
  items?: NavSubItem[];
}

export interface NavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export const navigationData: NavData = {
  user: {
    name: "Kass",
    email: "kass@miukumauku.com",
    avatar: "/avatars/cat.png",
  },
  navMain: [
    {
      title: "Animated Bento Grid",
      url: "/dashboard",
      items: [
        {
          title: "Simple Bento Grid",
          url: "/dashboard/bento-grid",
        },
        // Voit lisätä tähän muita reittejä
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Dokumentaatio</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationData.navMain.map((section) => (
              <SidebarMenuItem key={section.title}>
                <ActiveNavLink item={section} />
                {section.items?.length ? (
                  <SidebarMenuSub>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <ActiveNavLink item={item} isSubItem />
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
