"use client"

import { Card } from "@/components/Card"
import { Divider } from "@/components/Divider"
import { LineChart, TooltipProps } from "@/components/LineChart"
import { assetsAndLiabilities } from "@/data/balance_sheet_data"
import React from "react"

const CurrentAssetsAndLiabilities: React.FC = () => {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const currencyFormatter = (number: number) =>
    `$${(number / 1_000_000).toLocaleString("en-US", { minimumFractionDigits: 1 })}M`

  const payload = datas?.payload?.[0]?.payload

  // Current Assets
  const totalCurrentAssets =
    payload?.["Total current assets"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current assets"
    ]
  const cashAndEquivalents =
    payload?.["Cash and equivalents"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Cash and equivalents"
    ]
  const shortTermInvestments =
    payload?.["Short-term investments"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Short-term investments"
    ]
  const accountsReceivable =
    payload?.["Accounts receivable, net"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Accounts receivable, net"
    ]
  const inventories =
    payload?.["Inventories"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Inventories"]
  const prepaidExpences =
    payload?.["Prepaid expenses"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Prepaid expenses"]

  // Current Liabilites
  const totalCurrentLiabilities =
    payload?.["Total current liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Total current liabilities"
    ]
  const currentPortionOfLongTermDebt =
    payload?.["Current portion of long-term debt"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Current portion of long-term debt"
    ]
  const notesPayable =
    payload?.["Notes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Notes payable"]
  const accountsPayable =
    payload?.["Accounts payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accounts payable"]
  const currentPortionOfOperatingLeaseLiabilities =
    payload?.["Current portion of operating lease liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Current portion of operating lease liabilities"
    ]
  const accruedLiabilities =
    payload?.["Accrued liabilities"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1]["Accrued liabilities"]
  const incomeTaxesPayable =
    payload?.["Income taxes payable"] ??
    assetsAndLiabilities[assetsAndLiabilities.length - 1][
      "Income taxes payable"
    ]

  const formattedTotalCurrentAssets = currencyFormatter(totalCurrentAssets)
  const formattedCashAndEquivalents = currencyFormatter(cashAndEquivalents)
  const formattedShortTermInvestments = currencyFormatter(shortTermInvestments)
  const formattedAccountsReceivable = currencyFormatter(accountsReceivable)
  const formattedInventories = currencyFormatter(inventories)
  const formattedPrepaidExpences = currencyFormatter(prepaidExpences)

  const cashAndEquivalentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Cash and equivalents"],
  }))

  const shortTermInvestmentsData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Short-term investments"],
  }))

  const accountsReceivableData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Accounts receivable, net"],
  }))

  const inventoriesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Inventories"],
  }))

  const prepaidExpencesData = assetsAndLiabilities.map((item) => ({
    fiscal_year: item.fiscal_year,
    value: item["Prepaid expenses"],
  }))

  const getYoYChange = (
    data: { fiscal_year: number; value: number }[],
    currentYear: number,
  ) => {
    const currentIndex = data.findIndex(
      (item) => item.fiscal_year === currentYear,
    )
    if (currentIndex <= 0) return 0 // No YoY change for the first year or invalid year
    const previousValue = data[currentIndex - 1].value
    const currentValue = data[currentIndex].value
    return ((currentValue - previousValue) / previousValue) * 100
  }

  return (
    <div className="pt-6">
      <Card className="mb-6">
        <h2 className="pb-8 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Current Assets & Top Categories of Current Assets
        </h2>
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Cash and equivalents
            </p>
            <div>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedCashAndEquivalents}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      cashAndEquivalentsData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          cashAndEquivalentsData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(cashAndEquivalentsData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          cashAndEquivalentsData,
                          assetsAndLiabilities[assetsAndLiabilities.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        cashAndEquivalentsData,
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Short-term investments
            </p>
            <div>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedShortTermInvestments}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      shortTermInvestmentsData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          shortTermInvestmentsData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(shortTermInvestmentsData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          shortTermInvestmentsData,
                          assetsAndLiabilities[assetsAndLiabilities.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        shortTermInvestmentsData,
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Accounts receivable, net
            </p>
            <div>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedAccountsReceivable}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      accountsReceivableData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          accountsReceivableData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(accountsReceivableData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          accountsReceivableData,
                          assetsAndLiabilities[assetsAndLiabilities.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        accountsReceivableData,
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Inventories
            </p>
            <div>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedInventories}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      inventoriesData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          inventoriesData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(inventoriesData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          inventoriesData,
                          assetsAndLiabilities[assetsAndLiabilities.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        inventoriesData,
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Prepaid expenses
            </p>
            <div>
              <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedPrepaidExpences}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      prepaidExpencesData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          prepaidExpencesData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(prepaidExpencesData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          prepaidExpencesData,
                          assetsAndLiabilities[assetsAndLiabilities.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        prepaidExpencesData,
                        assetsAndLiabilities[assetsAndLiabilities.length - 1]
                          .fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${assetsAndLiabilities[assetsAndLiabilities.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div>
          </div>
        </div>
        <LineChart
          data={assetsAndLiabilities}
          index="fiscal_year"
          categories={[
            "Cash and equivalents",
            "Short-term investments",
            "Accounts receivable, net",
            "Inventories",
            "Prepaid expenses",
          ]}
          showLegend={true}
          showYAxis={true}
          startEndOnly={false}
          className="-mb-2 mt-8 h-80"
          tooltipCallback={(props) => {
            if (props.active) {
              setDatas((prev) => {
                if (prev?.label === props.label) return prev
                return props
              })
            } else {
              setDatas(null)
            }
            return null
          }}
        />
        <Divider />
        <h2 className="pb-8 pt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          FY Trend: Total Current Liabilities & Top Categories of Current
          Liabilities
        </h2>
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Demand Creation Expense
            </p>
            {/* <div>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedDemandExpense}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      demandCreationData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          demandCreationData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(demandCreationData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          demandCreationData,
                          expenseCombined[expenseCombined.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        demandCreationData,
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${expenseCombined[expenseCombined.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div> */}
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Operating Overhead Expense
            </p>
            {/* <div>
              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                {formattedOverheadExpense}
              </p>
              <p className="text-sm">
                <span
                  className={`${
                    getYoYChange(
                      overheadData,
                      datas?.payload?.[0]?.payload?.fiscal_year ??
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                    ) >= 0
                      ? "text-red-500"
                      : "text-emerald-500"
                  } font-semibold`}
                >
                  {datas
                    ? `${
                        getYoYChange(
                          overheadData,
                          datas?.payload?.[0]?.payload?.fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(overheadData, datas?.payload?.[0]?.payload?.fiscal_year).toFixed(1)}%`
                    : `${
                        getYoYChange(
                          overheadData,
                          expenseCombined[expenseCombined.length - 1]
                            .fiscal_year,
                        ) > 0
                          ? "+"
                          : ""
                      }${getYoYChange(
                        overheadData,
                        expenseCombined[expenseCombined.length - 1].fiscal_year,
                      ).toFixed(1)}%`}
                </span>
                <span className="text-gray-500">
                  {datas
                    ? ` vs. FY${datas?.payload?.[0]?.payload?.fiscal_year - 1}`
                    : ` vs. FY${expenseCombined[expenseCombined.length - 1].fiscal_year - 1}`}
                </span>
              </p>
            </div> */}
          </div>
        </div>
        {/* <LineChart /> */}
      </Card>
    </div>
  )
}

export default CurrentAssetsAndLiabilities
