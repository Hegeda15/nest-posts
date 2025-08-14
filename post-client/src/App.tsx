import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SignIN from "./pages/signin"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import ProtectedRoutes from "./utils/protected-routes"
import Home from "./pages/home"
import Navbar from "./components/navbar"
import EditprofilePage from "./pages/editprofile"
import OwnpostsPage from "./pages/ownposts"
import EditOwnPost from "./pages/editOwnPost"

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<SignIN />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route
                element={
                  <>
                    <Navbar />
                    <Outlet />
                  </>
                }
              >
                <Route path="/home" element={<Home />} />
                <Route path="/editprofile" element={<EditprofilePage />} />
                <Route path="/ownposts" element={<OwnpostsPage />} />
                <Route path="/editOwnPost/:id" element={<EditOwnPost />} />
              </Route>
            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>


    </>
  )
}

export default App
