export const siteConfig = {
  name: "Dashboard",
  url: "https://dashboard.tremor.so",
  description: "Nike Corporate Finance.",
  baseLinks: {
    home: "/",
    incomeStatement: "/income-statement/executive-summary",
    balanceSheet: "/balance-sheet/executive-summary",
    cashFlow: "/cash-flow",
  },
  externalLink: {
    blocks: "https://blocks.tremor.so/templates#dashboard",
  },
}

export type siteConfig = typeof siteConfig
