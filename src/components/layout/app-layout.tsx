import * as React from "react";
import { Leaf } from 'lucide-react';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <div className="flex h-12 items-center gap-2 border-b border-sidebar-border p-2">
            <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:hidden">
                <Leaf className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-bold">IndiYield</h1>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:ml-auto" />
        </div>
        <SidebarMenu className="p-2">
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/">
                        <div className="i-lucide-layout-dashboard" />
                        <span>Dashboard</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="New Prediction">
                    <Link href="/predict">
                         <div className="i-lucide-brain-circuit" />
                        <span>New Prediction</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <main className="min-h-svh flex-1 flex-col bg-background md:ml-[calc(var(--sidebar-width-icon))]">
          {children}
      </main>
    </>
  );
}
