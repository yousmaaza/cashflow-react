import { ThemeProvider } from "@/components/providers/theme-provider"
import { RouterProvider } from "react-router-dom"
import { router } from "@/routes"

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App