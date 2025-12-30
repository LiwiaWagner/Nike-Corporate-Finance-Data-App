"use client"

import * as d3 from "d3"
import {
  sankey as d3Sankey,
  sankeyCenter,
  sankeyLinkHorizontal,
} from "d3-sankey"
// import { useTheme } from "next-themes"
import React, { useEffect, useRef, useState } from "react"

type Node = {
  name: string
  value: number
  sourceLinks?: any[]
  targetLinks?: any[]
  x0?: number
  x1?: number
  y0?: number
  y1?: number
}

type Link = {
  source: Node
  target: Node
  value: number
  width?: number
  color?: string
}

type SankeyProps = {
  data: { nodes: Node[]; links: Link[] }
}

const SankeySegmentRegion: React.FC<SankeyProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  // const { theme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // const isDarkMode = theme === "dark"
    // const textColor = isDarkMode ? "#F9FAFB" : "#111827"

    const updateTheme = () => {
      const darkModeActive = document.documentElement.classList.contains("dark")
      setIsDarkMode(darkModeActive)
    }

    updateTheme() // Initialize state
    window.addEventListener("theme-change", updateTheme) // Custom theme-change event if supported
    return () => {
      window.removeEventListener("theme-change", updateTheme)
    }
  }, [])

  useEffect(() => {
    const svgElement = d3.select(svgRef.current)
    const containerWidth = svgRef.current?.parentElement?.offsetWidth || 975
    const containerHeight = 550

    const sankey = d3Sankey<Node, Link>()
      .nodeId((d) => d.name)
      .nodeAlign(sankeyCenter)
      .nodeSort(() => 0)
      .nodeWidth(15)
      .nodePadding(24)
      .extent([
        [0, 20],
        [containerWidth, containerHeight - 30],
      ])

    const { nodes, links } = sankey({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    })

    svgElement.selectAll("*").remove()

    const svg = svgElement
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")

    const levels = d3.group(nodes, (d) => d.x0)
    const levelTotals = new Map<number, number>()

    levels.forEach((nodesAtLevel, level) => {
      const levelTotal = d3.sum(nodesAtLevel, (d) => d.value || 0)
      levelTotals.set(level as number, levelTotal)
    })

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background-color", isDarkMode ? "#1f2937" : "#ffffff")
      .style("color", isDarkMode ? "#f9fafb" : "#111827")
      .style("padding", "8px 12px")
      .style("border-radius", "6px")
      .style("font-size", "0.875rem")
      .style("line-height", "1.25rem")
      .style("box-shadow", "0 2px 10px rgba(0, 0, 0, 0.1)")
      .style("opacity", 0)
      .style("transform", "translateY(10px)")
      .style("z-index", 1000)
      .style("transition", "opacity 0.2s ease, transform 0.2s ease")

    // Nodes
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", (d) => d.x0! + 1)
      .attr("y", (d) => d.y0!)
      .attr("width", (d) => d.x1! - d.x0! - 2)
      .attr("height", (d) => d.y1! - d.y0!)
      .attr("fill", (d) => {
        if (d.name === "Gross profit") return "#059669"
        if (d.name === "Other income") return "#059669"
        if (d.name === "Income before taxes") return "#059669"
        if (d.name === "Net income") return "#059669"
        if (d.name === "Cost of sales") return "#ef4444"
        if (d.name === "Tax expense") return "#ef4444"
        if (d.name === "Interest expense") return "#ef4444"
        if (d.name === "Selling and administrative expense") return "#ef4444"
        if (d.name === "Demand creation expense") return "#ef4444"
        if (d.name === "Operating overhead expense") return "#ef4444"
        return isDarkMode ? "#d1d5db" : "#d1d5db"
      })
      .attr("stroke-opacity", 0.3)
    // .append("title") // Tooltip
    // .text((d) => `${d.name}\n${d.value.toLocaleString()}M`)

    // Links
    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(links.sort((a, b) => b.width! - a.width!))
      .join("g")
      .append("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke-width", (d) => Math.max(1, d.width || 1))
      .attr(
        "stroke",
        isDarkMode ? (d) => d.color || "#d1d5db" : (d) => d.color || "#d1d5db",
      )
      .attr("stroke-opacity", isDarkMode ? 0.4 : 0.4)
      .on("mouseover", (event: MouseEvent, d: Link) => {
        tooltip
          .html(
            `<div>${d.source.name} → ${d.target.name}</div>
             <div><span style="font-weight: 600;">$${d.value.toLocaleString()}M</span></div>`,
          )
          .style("background-color", isDarkMode ? "#1f2937" : "#ffffff")
          .style("color", isDarkMode ? "#f9fafb" : "#111827")
          .style("opacity", 1)
          .style("transform", "translateY(0)")
      })
      .on("mousemove", (event: MouseEvent) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0).style("transform", "translateY(10px)")
      })

    // Labels
    svg
      .append("g")
      .style("font", "12px Inter, sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d) =>
        (d.x0 as number) < containerWidth / 2
          ? (d.x1 as number) + 6
          : (d.x0 as number) - 6,
      )
      .attr("y", (d) => ((d.y1 as number) + (d.y0 as number)) / 2)
      .attr("text-anchor", (d) =>
        (d.x0 as number) < containerWidth / 2 ? "start" : "end",
      )
      .attr("fill", isDarkMode ? "#F9FAFB" : "#111827")
      .each(function (d) {
        const levelTotal = levelTotals.get(d.x0!) || 1 // Level total value
        const percentage = ((d.value! / levelTotal) * 100).toFixed(1) // Percentage calculation

        const textElement = d3.select(this)

        // Add node name as a block
        textElement
          .append("tspan")
          .text(d.name)
          .attr(
            "x",
            (d.x0 as number) < containerWidth / 2
              ? (d.x1 as number) + 6
              : (d.x0 as number) - 6,
          )
          .attr("dy", "-0.6em")

        // Add absolute value and percentage on the next line
        textElement
          .append("tspan")
          .html(
            `<tspan style="font-weight:bold;">$${d.value?.toLocaleString()}M</tspan> (${percentage}%)`,
          )
          .attr(
            "x",
            (d.x0 as number) < containerWidth / 2
              ? (d.x1 as number) + 6
              : (d.x0 as number) - 6,
          )
          .attr("dy", "1.2em")
      })

    return () => {
      svgElement.selectAll("*").remove()
    }
  }, [data, isDarkMode])

  return <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
}

export default SankeySegmentRegion
