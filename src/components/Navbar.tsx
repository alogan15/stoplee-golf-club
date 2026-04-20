"use client"

import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaHome, FaTrophy, FaHandshake, FaUser, FaGolfBall, FaBars, FaChartLine } from "react-icons/fa"
import { FiLogIn, FiUserPlus } from "react-icons/fi"
import { BarChart3 } from "lucide-react"



export default function Navbar() {

  const router = useRouter()
  const [user,setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

const linkStyle = (path: string) => {
  const active =
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  return {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: active ? "#1d4ed8" : "transparent",
    color: active ? "white" : "#1a1a1a",
    transition: "all 0.2s ease"
  }
}

const buttonStyle = {
  width: "50%",
  padding: "15px",
  borderRadius: "100px",
  border: "none",
  background: "#1d4ed8",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
}



  async function handleLogout(){
    await supabase.auth.signOut()
    router.replace("/login")
  }

useEffect(() => {
  // get initial user
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user)
  })

  // listen for login/logout
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user || null)
    }
  )

  return () => {
    listener.subscription.unsubscribe()
  }
}, [])

  return (

    <nav style={{ padding:"15px", borderBottom:"1px solid gray" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "#f1f5f9",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <FaBars size={24} />
          </button>

          <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>

        {user && (
          <div style={{ marginTop: "15px", color:"navy"}}>
            Welcome {user.user_metadata?.name}
          </div>
        )}

        <div style={{
            display: open ? "flex" : "none",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px"
          }}>


          {!user && <Link href="/signup" onClick={() => setOpen(false)} style={linkStyle("/signup")}> <FiUserPlus /> Signup</Link> }
          {!user && <Link href="/login" onClick={() => setOpen(false)} style={linkStyle("/login")}> <FiLogIn /> Login</Link>}
          <Link href="/home" onClick={() => setOpen(false)} style={linkStyle("/home")}><FaHome /> League News </Link>          
          <Link href="/dashboard" onClick={() => setOpen(false)} style={linkStyle("/dashboard")}> <FaUser /> Dashboard</Link>
          <Link href="/leaderboard-simple" onClick={() => setOpen(false)} style={linkStyle("/leaderboard-simple")}> <FaTrophy /> Leaderboard</Link>
          <Link href="/power-rankings" onClick={() => setOpen(false)} style={linkStyle("/power-rankings")}> <BarChart3 size={18} /> Power Rankings</Link>
          <Link href="/champions" onClick={() => setOpen(false)} style={linkStyle("/champions")}> 🏆 Champions</Link>
          {user && (
            <button onClick={handleLogout}
                style={buttonStyle}>
              Logout
            </button>
          )}


        </div>

      </div>

    </nav>

  )
}