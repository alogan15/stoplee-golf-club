"use client"

import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaHome, FaTrophy, FaCalendarAlt, FaUser, FaSignOutAlt, FaGolfBall } from "react-icons/fa"
import { FaC, FaH } from "react-icons/fa6"
import { link } from "fs"

export default function Navbar() {

  const router = useRouter()
  const [user,setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

const linkStyle = (path: string) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: pathname.startsWith(path) ? "#1d4ed8" : "transparent",
  color: pathname.startsWith(path) ? "white" : "#1a1a1a",
  transition: "all 0.2s ease"
})

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
    router.push("/")
  }

  useEffect(()=>{
    async function getUser(){
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()
  },[])

  return (

    <nav style={{ padding:"15px", borderBottom:"1px solid gray" }}>
                <button onClick={() => setOpen(!open)}>
                  ☰
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

          {!user && <Link href="/signup">Signup</Link>}
          {!user && <Link href="/login">Login</Link>}


          <Link href="/" style={linkStyle("/")}> <FaHome /> Home</Link>
          <Link href="/dashboard" style={linkStyle("/dashboard")}> <FaUser /> Dashboard</Link>
          <Link href="/gameday" style={linkStyle("/gameday")}> <FaGolfBall /> Game Day</Link>
          <Link href="/around-the-league" style={linkStyle("/around-the-league")}> <FaTrophy /> Around The League</Link>
          <Link href="/leaderboard" style={linkStyle("/leaderboard")}> <FaTrophy /> Leaderboard</Link>
          <Link href="/schedule" style={linkStyle("/schedule")}> <FaCalendarAlt /> Schedule</Link>
          <Link href="/champions" style={linkStyle("/champions")}> 🏆 Champions</Link>



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