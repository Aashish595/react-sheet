'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Search } from "lucide-react"

type DropdownName = 'workspace' | 'folder';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownName | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleDropdownClick = (dropdownName: DropdownName) => {
    console.log(`Dropdown clicked: ${dropdownName}`);
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(`Search query: ${e.target.value}`);
  };

  const handleNotificationClick = () => {
    console.log('Notification bell clicked');
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleAvatarClick = () => {
    console.log('Avatar clicked');
    // Could add dropdown menu logic here
  };

  return (
    <div className="border-b border-[#e2e2e2] bg-[#ffffff]">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2 text-sm text-[#757575]">
          <button 
            className={`flex items-center space-x-1 ${activeDropdown === 'workspace' ? 'text-[#121212]' : ''}`}
            onClick={() => handleDropdownClick('workspace')}
          >
            <span>Workspace</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'workspace' ? 'rotate-180' : ''}`} />
          </button>
          
          <button 
            className={`flex items-center space-x-1 ${activeDropdown === 'folder' ? 'text-[#121212]' : ''}`}
            onClick={() => handleDropdownClick('folder')}
          >
            <span>Folder 2</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'folder' ? 'rotate-180' : ''}`} />
          </button>
          
          <span className="text-[#121212] font-medium">Spreadsheet 3</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#757575]" />
            <Input 
              placeholder="Search within sheet" 
              className="pl-10 w-64 bg-[#f8fafc] border-[#e2e2e2] hover:border-[#c2c2c2] focus:border-[#618666] transition-colors"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          
          <button 
            className="relative p-1 rounded-full hover:bg-[#f0f0f0] transition-colors"
            onClick={handleNotificationClick}
          >
            <Bell className="w-5 h-5 text-[#757575]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1a8cff] rounded-full flex items-center justify-center">
              <span className="text-xs text-white">2</span>
            </div>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2">
                <div className="p-2 hover:bg-gray-100">New message from Alice</div>
                <div className="p-2 hover:bg-gray-100">Document shared with you</div>
              </div>
            )}
          </button>
          
          <button 
            className="flex items-center space-x-2 hover:bg-[#f0f0f0] rounded-lg p-1 transition-colors"
            onClick={handleAvatarClick}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#618666] text-white text-sm">JD</AvatarFallback>
            </Avatar>
            <div className="text-sm text-left">
              <div className="font-medium text-[#121212]">John Doe</div>
              <div className="text-[#757575]">john.doe@company.com</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header