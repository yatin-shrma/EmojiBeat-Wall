"use client"; // This layout uses client components like SidebarProvider

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // Assuming sidebar components are in ui
import Link from 'next/link';
import { Home, BarChart3, Music, Lightbulb, Settings, Users, ShieldAlert } from 'lucide-react';
import AppLogo from '@/components/layout/app-logo'; // Re-use AppLogo
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export default function HostLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract partyId from pathname, e.g. /host/party/XYZ -> XYZ
  const partyIdMatch = pathname.match(/\/host\/party\/([^/]+)/);
  const currentPartyId = partyIdMatch ? partyIdMatch[1] : null;

  const navItems = [
    { href: "/host", label: "Dashboard", icon: Home },
    ...(currentPartyId ? [
      { href: `/host/party/${currentPartyId}`, label: "Current Party", icon: Users },
    ] : []),
    // Add more host-specific global links if needed
    // { href: "/host/settings", label: "Settings", icon: Settings },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
             <AppLogo />
             <div className="md:hidden"> {/* Show trigger only on mobile if sidebar is collapsed by default */}
                <SidebarTrigger />
             </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <Separator className="my-2" />
        <SidebarFooter className="p-4 border-t">
           <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png" alt="Host Avatar" data-ai-hint="avatar person" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-sidebar-foreground">Party Host</p>
              <p className="text-xs text-sidebar-foreground/70">Online</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {/* Main content for host pages */}
        <div className="p-2 md:p-6"> 
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
