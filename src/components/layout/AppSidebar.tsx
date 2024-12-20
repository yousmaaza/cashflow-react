import { Wallet, Home, LineChart, Brain, Lock, Unlock } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: LineChart,
  },
  {
    title: "Conseiller",
    url: "/advisor",
    icon: Brain,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { toggleSidebar, setOpen } = useSidebar()
  const [isLocked, setIsLocked] = useState(false)

  const handleMouseEvents = (enter: boolean) => {
    if (!isLocked) {
      setOpen(enter)
    }
  }

  const toggleLock = () => {
    setIsLocked(!isLocked)
    if (!isLocked) {
      setOpen(true)
    }
  }

  return (
    <div 
      className="group fixed left-0 top-0 h-full z-50"
      onMouseEnter={() => handleMouseEvents(true)}
      onMouseLeave={() => handleMouseEvents(false)}
    >
      {/* Thin visible strip to trigger sidebar */}
      <div className="absolute left-0 top-0 w-2 h-full bg-gray-200 hover:bg-accent/10 transition-colors dark:bg-gray-800" />
      
      <Sidebar>
        <SidebarContent>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              <span className="font-semibold text-lg">Finance App</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLock}
                className="hover:bg-accent rounded-md p-1"
              >
                {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </Button>
              <SidebarTrigger className="hover:bg-accent rounded-md p-1" />
            </div>
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url}
                        className={location.pathname === item.url ? "bg-accent" : ""}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* Theme Toggle */}
          <div className="mt-auto p-4 border-t dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}