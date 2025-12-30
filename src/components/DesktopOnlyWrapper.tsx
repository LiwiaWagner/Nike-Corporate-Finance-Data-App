"use client"

import { useState, useEffect } from "react"

interface DesktopOnlyWrapperProps {
  children: React.ReactNode
}

const DesktopOnlyWrapper: React.FC<DesktopOnlyWrapperProps> = ({
  children,
}) => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024) // breakpoint for desktop
    }

    handleResize() // initial check
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isDesktop) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-900">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Nike Corporate Finance Data App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This application was designed to be viewed on a large screen. <br />
          Please come back on a computer!
        </p>
      </div>
    )
  }

  return <>{children}</>
}

export default DesktopOnlyWrapper
