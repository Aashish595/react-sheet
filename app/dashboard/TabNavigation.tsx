'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Plus } from "lucide-react"

type TabName = 'overview' | 'other'; // Add other tab names if needed
type ButtonName = 'extract' | 'answer'; // Fixed typo from 'extract' to match usage

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState<TabName>('overview');
  const [isExtractActive, setIsExtractActive] = useState(false);
  const [isAnswerActive, setIsAnswerActive] = useState(false);

  const handleTabClick = (tabName: TabName) => {
    console.log(`Tab clicked: ${tabName}`);
    setActiveTab(tabName);
  };

  const handleButtonClick = (buttonName: ButtonName) => {
    console.log(`Button clicked: ${buttonName}`);
    
    if (buttonName === 'extract') {
      setIsExtractActive(!isExtractActive);
    } else if (buttonName === 'answer') {
      setIsAnswerActive(!isAnswerActive);
    }
  };

  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  return (
    <div className="border-b border-[#e2e2e2] bg-[#ffffff]">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-1">
          <div 
            className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${activeTab === 'overview' ? 'bg-[#f8fafc] border-b-2 border-[#618666]' : 'hover:bg-[#f8f8f8]'}`}
            onClick={() => handleTabClick('overview')}
          >
            <Info className="w-4 h-4 text-[#618666]" />
            <span className="text-sm font-medium text-[#121212]">Q3 Financial Overview</span>
            <Info className="w-4 h-4 text-[#fa6736]" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge 
            className="bg-[#d3f2e3] text-[#0a6e3d] hover:bg-[#d3f2e3] cursor-pointer"
            onClick={() => console.log('ABC badge clicked')}
          >
            ABC
          </Badge>
          
          <Button 
            className={`${isAnswerActive ? 'bg-[#c9b8f9]' : 'bg-[#dccffc]'} text-[#463e59] hover:bg-[#eae3fc]`}
            onClick={() => handleButtonClick('answer')}
          >
            Answer a question
          </Button>
          
          <Button 
            className={`${isExtractActive ? 'bg-[#f5a78f]' : 'bg-[#fac2af]'} text-[#695149] hover:bg-[#ffe9e0]`}
            onClick={() => handleButtonClick('extract')}
          >
            Extract
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleAddClick}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TabNavigation