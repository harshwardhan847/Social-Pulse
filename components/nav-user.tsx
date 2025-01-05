"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export function NavUser() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-start gap-2">
        <SignedIn>
          <UserButton />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.fullName}</span>
            <span className="truncate text-xs">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
        </SignedIn>
        <SignedOut>
          <Button className="w-full" onClick={() => openSignIn()}>
            Sign in
          </Button>
        </SignedOut>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
