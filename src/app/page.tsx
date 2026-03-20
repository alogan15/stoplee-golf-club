"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function LandingPage() {
  const router = useRouter()

useEffect(() => {
  async function checkUser() {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push("/login")
      return
    }

    // 👇 NEW LOGIC
    const hasVisited = localStorage.getItem("visited")

    if (hasVisited) {
      router.replace("/home")
    }
  }

  checkUser()
}, [])


  return (
  <div
    style={{
      position: "relative",
      height: "100vh",
      width: "100%",
        backgroundImage: "url('/welcomePic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
    }}
  >
    {/* DARK OVERLAY */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
      }}
    />

    {/* CONTENT */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        padding: "20px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Our Mission</h2>

      <p style={{ maxWidth: "600px", lineHeight: "1.6" }}>
        This league was created in honor of Eric "StopLee" Logan, whose love for
        golf and bringing people together inspired us all. Through this league,
        we celebrate his passion, his kindness, and the joy he found on the
        course.
        <br />
        <br />
        Thank you for being part of this journey as we honor his legacy with
        fellowship, fun, and great golf. Here's to a fantastic season!
      </p>

      <button
        onClick={() => {
          localStorage.setItem("visited", "true")
          router.push("/home")
        }}
        style={{
          marginTop: "30px",
          padding: "12px 30px",
          fontSize: "16px",
          backgroundColor: "#2d2dbf",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
    </div>
  </div>
)
  }