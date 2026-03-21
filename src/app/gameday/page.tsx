"use client"

import { useRouter } from "next/navigation"

export default function GameDayHome() {
  const router = useRouter()

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa, #e4efe9)",
        padding: "20px",
      }}
    >


      <div
        style={{
          textAlign: "center",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >

       
        {/* 🔥 LOGO */}
        <img
          src="/Logo.png"
          alt="SLGC Logo"
          style={{
            width: "300px",
            marginBottom: "20px",
          }}
        />

        {/* TITLE */}
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Game Day
        </h1>

        {/* SUBTEXT */}
        <p
          style={{
            color: "#555",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          Start a new round and track the competition
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {
            const id = Math.random().toString(36).substring(2, 10)
            router.push(`/gameday/${id}`)
          }}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          ⛳ Start New Round
        </button>
      </div>
    </div>
  )
}