"use client"
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation"

export default function CashFlow() {
  return (
    <>
      <main className="lg:pl-1">
        <div className="relative">
          <div className="p-4 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pt-7">
            <div aria-labelledby="current-billing-cycle">
              <h1
                id="current-billing-cycle"
                className="mb-12 scroll-mt-10 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
              >
                Cash Flow
              </h1>
              <TabNavigation>
                <TabNavigationLink href="#" active>
                  Executive Summary
                </TabNavigationLink>
                <TabNavigationLink href="#">
                  Cash Flow & Balance
                </TabNavigationLink>
              </TabNavigation>
              <div className="mt-4 grid grid-cols-1 gap-14 sm:mt-8 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3">
                <h1>Test</h1>
              </div>
            </div>
            {/* {children} */}
          </div>
        </div>
      </main>
    </>
  )
}
