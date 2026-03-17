"use client"

import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {

  const router = useRouter()
  const [user,setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)



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
          <div style={{ marginTop: "15px"}}>
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

          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/gameday">Game Day</Link>
          <Link href="/around-the-league">Around The League</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/champions">Champions</Link>

          {user && (
            <button   onClick={handleLogout}
                    style={{
                marginTop: "15px",
                padding: "12px",
                width: "30%",
                border: "none",
                borderRadius: "8px",
                background: "navy",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer"
              }}>
              Logout
            </button>
          )}


        </div>

      </div>

    </nav>

  )
}