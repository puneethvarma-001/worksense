"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  DollarSign,
  Calendar,
  Clock,
  UserPlus,
  Building2,
  FileText,
  CalendarDays,
  Brain,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearDemoSessionCookie, protocol, rootDomain } from "@/lib/utils"

type NavItem = {
  key: string
  label: string
  href: string
  icon: React.ReactNode
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tenant: string
  subdomain: string
  role: string
}

export function AppSidebar({ tenant, subdomain, role, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const { open } = useSidebar()

  // Navigation items - ALL items shown for demo purposes
  const dashboardNav: NavItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: `/s/${subdomain}/app`,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
  ]

  const hrModulesNav: NavItem[] = [
    {
      key: "leave",
      label: "Leave Management",
      href: `/s/${subdomain}/app/leave`,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      key: "attendance",
      label: "Attendance",
      href: `/s/${subdomain}/app/attendance`,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      key: "payroll",
      label: "Payroll",
      href: `/s/${subdomain}/app/payroll`,
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      key: "holidays",
      label: "Holidays",
      href: `/s/${subdomain}/app/holidays`,
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      key: "policies",
      label: "Policies",
      href: `/s/${subdomain}/app/policies`,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      key: "onboarding",
      label: "Onboarding & Exits",
      href: `/s/${subdomain}/app/onboarding-exits`,
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      key: "org",
      label: "Organization",
      href: `/s/${subdomain}/app/org`,
      icon: <Building2 className="h-4 w-4" />,
    },
  ]

  const aiToolsNav: NavItem[] = [
    {
      key: "ai",
      label: "AI Tools",
      href: `/s/${subdomain}/app/ai`,
      icon: <Brain className="h-4 w-4" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === `/s/${subdomain}/app`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  const handleSignOut = () => {
    clearDemoSessionCookie()
    window.location.href = `${protocol}://${rootDomain}/signin`
  }

  // Get initials for avatar
  const initials = tenant
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-sm">{initials}</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{tenant}</span>
                <span className="truncate text-xs text-muted-foreground">{subdomain}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* HR Modules Section */}
        <SidebarGroup>
          <SidebarGroupLabel>HR Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hrModulesNav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* AI Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiToolsNav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{tenant}</span>
                    <span className="truncate text-xs capitalize">{role}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                Theme
              </span>
              <ModeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-1 group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-muted-foreground">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>B
            </kbd>{" "}
            to toggle
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
