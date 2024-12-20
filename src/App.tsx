import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import Advisor from "./pages/Advisor";
import { ThemeProvider } from "./hooks/use-theme";
import { AppSidebar } from "./components/layout/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="finance-theme">
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <div className="container mx-auto p-4">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/advisor" element={<Advisor />} />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;