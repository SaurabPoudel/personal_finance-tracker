"use client";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggler";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="lg:hidden" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/categories"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/transactions"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Transactions
                  </Link>
                  <Link
                    href="/budgets"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Budgets
                  </Link>
                  <Link
                    href="/reports"
                    className="block px-2 py-1 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    Reports
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 ml-4 lg:ml-0">
              <MountainIcon className="h-6 w-6" />
              <span className="font-semibold">Personal Finance</span>
            </Link>

            {/* Desktop Navigation */}
            <SignedIn>
              <NavigationMenu className="hidden lg:flex ml-6">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/dashboard" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] grid-cols-2">
                        <Link
                          href="/categories"
                          className="group block space-y-1 rounded-md p-3 hover:bg-accent"
                        >
                          <div className="font-medium">Categories</div>
                          <div className="text-sm text-muted-foreground">
                            Organize your transactions with custom categories
                          </div>
                        </Link>
                        <Link
                          href="/transactions"
                          className="group block space-y-1 rounded-md p-3 hover:bg-accent"
                        >
                          <div className="font-medium">Transactions</div>
                          <div className="text-sm text-muted-foreground">
                            Track your income and expenses
                          </div>
                        </Link>
                        <Link
                          href="/budgets"
                          className="group block space-y-1 rounded-md p-3 hover:bg-accent"
                        >
                          <div className="font-medium">Budgets</div>
                          <div className="text-sm text-muted-foreground">
                            Set and manage spending limits
                          </div>
                        </Link>
                        <Link
                          href="/reports"
                          className="group block space-y-1 rounded-md p-3 hover:bg-accent"
                        >
                          <div className="font-medium">Reports</div>
                          <div className="text-sm text-muted-foreground">
                            Analyze your financial data
                          </div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SignedIn>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
