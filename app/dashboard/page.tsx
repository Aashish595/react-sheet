// app/dashboard/page.tsx
import Header from "./Header"
import Toolbar from "./Toolbar"
import TabNavigation from "./TabNavigation" 
import DataTable from "./DataTable"
import BottomTabs from "./BottomTabs"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      <Header />
      <Toolbar />
      <TabNavigation />
      <div className="flex-grow overflow-x-auto">
        <DataTable />
      </div>
      <BottomTabs />
    </div>
  )
}
