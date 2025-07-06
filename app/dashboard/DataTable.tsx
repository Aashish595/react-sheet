'use client'
import { tableData } from "@/lib/tableData"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"

// Define types
type Status = "In-process" | "Need to start" | "Complete" | "Blocked"
type Priority = "High" | "Medium" | "Low"

interface TableRow {
  id: number
  jobRequest: string
  submitted: string
  status: Status
  submitter: string
  url: string
  assigned: string
  priority: Priority
  dueDate: string
  estValue: string
}

// Type guards
const isStatus = (value: string): value is Status => {
  return ["In-process", "Need to start", "Complete", "Blocked"].includes(value)
}

const isPriority = (value: string): value is Priority => {
  return ["High", "Medium", "Low"].includes(value)
}

// Process the raw data
const typedTableData = tableData.map(row => ({
  ...row,
  status: isStatus(row.status) ? row.status : "Need to start",
  priority: isPriority(row.priority) ? row.priority : "Medium"
})) as TableRow[]

const getStatusColor = (status: Status) => {
  switch (status) {
    case "In-process": return "bg-[#fff3d6] text-[#85640b] border-[#85640b] hover:bg-[#ffe9b0] cursor-pointer"
    case "Need to start": return "bg-[#e2e8f0] text-[#475569] border-[#475569] hover:bg-[#d1dae5] cursor-pointer"
    case "Complete": return "bg-[#d3f2e3] text-[#0a6e3d] border-[#0a6e3d] hover:bg-[#b0e5cc] cursor-pointer"
    case "Blocked": return "bg-[#ffe1de] text-[#c22219] border-[#c22219] hover:bg-[#ffc9c3] cursor-pointer"
    default: return "bg-[#f6f6f6] text-[#545454] border-[#545454] hover:bg-[#e6e6e6] cursor-pointer"
  }
}

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "High": return "bg-[#ffe1de] text-[#c22219] hover:bg-[#ffc9c3] cursor-pointer"
    case "Medium": return "bg-[#fff3d6] text-[#85640b] hover:bg-[#ffe9b0] cursor-pointer"
    case "Low": return "bg-[#e2e8f0] text-[#475569] hover:bg-[#d1dae5] cursor-pointer"
    default: return "bg-[#f6f6f6] text-[#545454] hover:bg-[#e6e6e6] cursor-pointer"
  }
}

export default function DataTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: keyof TableRow; direction: 'ascending' | 'descending' } | null>(null)

  const handleRowClick = (id: number) => {
    console.log(`Row clicked: ${id}`)
    setSelectedRow(selectedRow === id ? null : id)
  }

  const handleStatusClick = (status: Status, id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log(`Status clicked: ${status} for row ${id}`)
  }

  const handlePriorityClick = (priority: Priority, id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log(`Priority clicked: ${priority} for row ${id}`)
  }

  const handleSort = (key: keyof TableRow) => {
    console.log(`Sort by: ${key}`)
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...typedTableData]
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#f8fafc] border-b border-[#e2e2e2]">
          <tr>
            <th className="text-left p-3 text-sm font-medium text-[#475569] w-8">#</th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Job Request</th>
            <th 
              className="text-left p-3 text-sm font-medium text-[#475569] hover:bg-[#e2e8f0] cursor-pointer"
              onClick={() => handleSort('submitted')}
            >
              Submitted {sortConfig?.key === 'submitted' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Status</th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Submitter</th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">URL</th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Assigned</th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Priority</th>
            <th 
              className="text-left p-3 text-sm font-medium text-[#475569] hover:bg-[#e2e8f0] cursor-pointer"
              onClick={() => handleSort('dueDate')}
            >
              Due Date {sortConfig?.key === 'dueDate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th className="text-left p-3 text-sm font-medium text-[#475569]">Est. Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => {
            // Make sure URL has a protocol for safety
            const safeUrl = row.url
              ? (row.url.startsWith("http://") || row.url.startsWith("https://")
                  ? row.url
                  : `http://${row.url}`)
              : ""

            return (
              <tr 
                key={row.id} 
                className={`border-b border-[#e2e2e2] hover:bg-[#f8fafc] ${selectedRow === row.id ? 'bg-[#f0f7ff]' : ''}`}
                onClick={() => handleRowClick(row.id)}
              >
                <td className="p-3 text-sm text-[#757575]">{row.id}</td>
                <td className="p-3 text-sm text-[#121212] max-w-xs">{row.jobRequest}</td>
                <td className="p-3 text-sm text-[#757575]">{row.submitted}</td>
                <td className="p-3">
                  <Badge 
                    className={`${getStatusColor(row.status)} border`}
                    onClick={(e) => handleStatusClick(row.status, row.id, e)}
                  >
                    {row.status}
                  </Badge>
                </td>
                <td className="p-3 text-sm text-[#121212]">{row.submitter}</td>
                <td className="p-3 text-sm text-[#1a8cff] underline">
                  {safeUrl ? (
                    <Link
                      href={safeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {new URL(safeUrl).hostname}
                    </Link>
                  ) : (
                    <span className="text-[#757575]">N/A</span>
                  )}
                </td>
                <td className="p-3 text-sm text-[#121212]">{row.assigned}</td>
                <td className="p-3">
                  <Badge 
                    className={getPriorityColor(row.priority)}
                    onClick={(e) => handlePriorityClick(row.priority, row.id, e)}
                  >
                    {row.priority}
                  </Badge>
                </td>
                <td className="p-3 text-sm text-[#757575]">{row.dueDate}</td>
                <td className="p-3 text-sm text-[#121212] font-medium">{row.estValue} ₹</td>
              </tr>
            )
          })}
          {/* Empty rows */}
          {Array.from({ length: 20 }, (_, i) => (
            <tr 
              key={`empty-${i}`} 
              className="border-b border-[#e2e2e2] hover:bg-[#f8fafc]"
              onClick={() => console.log(`Empty row ${6 + i} clicked`)}
            >
              <td className="p-3 text-sm text-[#757575]">{6 + i}</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
