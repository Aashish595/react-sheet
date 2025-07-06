'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ChevronDown, ArrowUpDown, Filter, Grid3X3, Download, Upload, Share, Plus } from "lucide-react"

const buttons = [
  { id: 'sort', icon: ArrowUpDown, label: 'Sort' },
  { id: 'filter', icon: Filter, label: 'Filter' },
  { id: 'cellView', icon: Grid3X3, label: 'Cell view' },
  { id: 'import', icon: Download, label: 'Import' },
  { id: 'export', icon: Upload, label: 'Export' },
  { id: 'share', icon: Share, label: 'Share' }
]

const Toolbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [fieldsHidden, setFieldsHidden] = useState(false)  // state for hide fields button

  const handleAction = (id: string) => {
    console.log(`Button clicked: ${id}`)
    setActiveButton(id === activeButton ? null : id)

    if (id === 'sort') {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
      console.log(`Sort direction: ${sortDirection}`)
    } else if (id !== 'newAction' && id !== 'hideFields') {
      setTimeout(() => setActiveButton(null), 1000)
    }
  }

  const handleHideFieldsClick = () => {
    setFieldsHidden(prev => {
      const newState = !prev
      console.log(`Fields are now ${newState ? 'hidden' : 'shown'}`)
      return newState
    })
  }

  return (
    <div className="border-b border-[#e2e2e2] bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <button 
          onClick={() => setActiveDropdown(!activeDropdown)}
          className="flex items-center space-x-1 text-sm text-[#757575] hover:bg-[#f8fafc] px-2 py-1 rounded"
        >
          <span>Tool bar</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center space-x-2">
          {/* Hide fields button with toggle icon */}
          <Button
            variant="ghost"
            size="sm"
            className={`text-[#757575] hover:bg-[#f8fafc] ${fieldsHidden ? 'bg-[#f0f0f0]' : ''}`}
            onClick={handleHideFieldsClick}
          >
            {fieldsHidden ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Hide fields
          </Button>

          {/* Render other buttons */}
          {buttons.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              className={`text-[#757575] hover:bg-[#f8fafc] ${activeButton === id ? 'bg-[#f0f0f0]' : ''}`}
              onClick={() => handleAction(id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {id === 'sort' ? `${label} ${sortDirection === 'asc' ? '↑' : '↓'}` : label}
            </Button>
          ))}
          
          <Button 
            className={`${activeButton === 'newAction' ? 'bg-[#4b6a4f]' : 'bg-[#618666]'} hover:bg-[#4b6a4f] text-white`}
            onClick={() => handleAction('newAction')}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Action
          </Button>
        </div>
      </div>

      {activeDropdown && (
        <div className="px-6 py-2 bg-white border-t border-[#e2e2e2]">
          {['Option 1', 'Option 2'].map(option => (
            <div key={option} className="text-sm text-[#757575] p-2 hover:bg-[#f8fafc] cursor-pointer">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Toolbar
