"use client";

import { Bell, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function NotificationsBell({ role }: { role: string }) {
  const isManager = role.toLowerCase().includes("manager") || role.toLowerCase().includes("hr");
  const unread = isManager ? 2 : 1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-9 relative" aria-label="Notifications">
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          <div className="text-xs text-muted-foreground">
            Demo notifications for {role}
          </div>
        </div>
        <DropdownMenuSeparator />

        {isManager ? (
          <>
            <DropdownMenuItem className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-amber-600" />
              <div className="min-w-0">
                <div className="text-sm">2 leave approvals pending</div>
                <div className="text-xs text-muted-foreground">Review requests in Leave → Approvals</div>
              </div>
              <Badge variant="secondary" className="ml-auto">Pending</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 mt-0.5 text-blue-600" />
              <div className="min-w-0">
                <div className="text-sm">Policy updated</div>
                <div className="text-xs text-muted-foreground">Leave policy version changed</div>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
              <div className="min-w-0">
                <div className="text-sm">Leave request approved</div>
                <div className="text-xs text-muted-foreground">Your request LV-002 was approved</div>
              </div>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-xs text-muted-foreground">
          This is demo-only (no backend)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
