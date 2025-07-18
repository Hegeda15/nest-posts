import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SignIN from "./pages/signin"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import ProtectedRoutes from "./utils/protected-routes"
import Home from "./pages/home"

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SignIN />} />
          <Route path="/login" element={<Login />} />
          <Route  element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>

        </Routes>
      </QueryClientProvider>

    </>
  )
}

export default App
