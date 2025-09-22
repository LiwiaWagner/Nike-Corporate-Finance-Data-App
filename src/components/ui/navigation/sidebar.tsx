"use client"
import { siteConfig } from "@/app/siteConfig"
import { cx, focusRing } from "@/lib/utils"
import {
  RiExchangeDollarLine,
  RiFileChartLine,
  RiLineChartLine,
  RiLinkM,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "./Logo"
import { UserProfileDesktop } from "./UserProfile"

const navigation = [
  {
    name: "Income Statement",
    href: siteConfig.baseLinks.incomeStatement,
    icon: RiExchangeDollarLine,
  },
  {
    name: "Balance Sheet",
    href: siteConfig.baseLinks.balanceSheet,
    icon: RiFileChartLine,
  },
  {
    name: "Cash Flow",
    href: siteConfig.baseLinks.cashFlow,
    icon: RiLineChartLine,
  },
] as const

const shortcuts = [
  {
    name: "YoY Revenue Performance",
    href: "/income-statement/profit-and-loss",
    icon: RiLinkM,
  },
  {
    name: "EBIT Performance Overview",
    href: "/income-statement/executive-summary#ebit",
    icon: RiLinkM,
  },
  {
    name: "NIKE Brand Revenue Highlight",
    href: "/income-statement/revenue-and-cor#nike-revenue",
    icon: RiLinkM,
  },
  {
    name: "Equity Performance",
    href: "/balance-sheet/equity",
    icon: RiLinkM,
  },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.incomeStatement) {
      return pathname.startsWith("/income-statement")
    }
    return pathname === itemHref || pathname.startsWith(itemHref)
  }
  return (
    <>
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 pt-[0px] dark:border-gray-800 dark:bg-gray-950">
          <div className="ml-1 h-20">
            <Logo />
          </div>
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      isActive(item.href)
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cx(
                        pathname === item.href || pathname.startsWith(item.href)
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
    </>
  )
}
