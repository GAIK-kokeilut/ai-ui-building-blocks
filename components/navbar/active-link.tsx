"use client";

import {
  SidebarMenuButton,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, NavSubItem } from "./app-sidebar";
interface ActiveNavLinkProps {
  item: NavItem | NavSubItem;
  isSubItem?: boolean;
}

export function ActiveNavLink({ item, isSubItem = false }: ActiveNavLinkProps) {
  const pathname = usePathname();

  const isActiveRoute = (url: string) => {
    if (url === "#") return false;

    const normalizedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;

    return normalizedPath === normalizedUrl;
  };

  const isActive = isActiveRoute(item.url);

  return isSubItem ? (
    <SidebarMenuSubButton asChild data-active={isActive}>
      <Link href={item.url} className={cn(isActive && "font-semibold")}>
        {item.title}
      </Link>
    </SidebarMenuSubButton>
  ) : (
    <SidebarMenuButton asChild data-active={isActive}>
      <Link
        href={item.url}
        className={cn(
          isActive && "!font-semibold", // Lisätään ! pakottamaan tyyli
        )}
      >
        {item.title}
      </Link>
    </SidebarMenuButton>
  );
}
