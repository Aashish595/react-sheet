"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type TabName = "All Orders" | "Pending" | "Reviewed" | "Arrived"

export default function BottomTabs() {
  const [activeTab, setActiveTab] = useState<TabName>("All Orders")
  const tabs: TabName[] = ["All Orders", "Pending", "Reviewed", "Arrived"]

  const handleTabClick = (tab: TabName) => {
    console.log(`Tab clicked: ${tab}`)
    setActiveTab(tab)
  }

  const handleAddClick = () => {
    console.log('Add button clicked')
    // Visual feedback - we'll use the button's built-in pressed state
  }

  return (
    <div className="border-t border-[#e2e2e2] bg-[#ffffff]">
      <div className="flex items-center px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#618666] text-[#121212] bg-[#f8fafc]"
                : "border-transparent text-[#757575] hover:text-[#121212] hover:bg-[#f8f8f8]"
            }`}
          >
            {tab}
          </button>
        ))}
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 hover:bg-[#f8f8f8]"
          onClick={handleAddClick}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}