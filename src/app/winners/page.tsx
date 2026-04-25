"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import BackButton from "@/src/components/BackButton"

type Winner = {
  id: string
  player_name: string
  score: number
  course: string
  tour_name: string
  date: string
  image_url: string
}

export default function WinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([])

  useEffect(() => {
    fetchWinners()
  }, [])

  async function fetchWinners() {
    const { data, error } = await supabase
      .from("winners")
      .select("*")
      .order("date", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setWinners(data || [])
    }
  }

  
 return (
    

    <div style={{
      padding: "16px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>    <BackButton />
    <h1
      style={{
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
        color: "#15803d"
      }}
    >
      🏆 Tour Winners
    </h1>

    <div style={{
        textAlign: "center",
        fontSize: "15px",
        color: "#999",
        marginBottom: "6px"
        }}>
        Swipe → →
        </div>

    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "16px",
        paddingBottom: "10px",
        scrollSnapType: "x mandatory"
      }}
    >
      {winners.map((w) => (
        <div
          key={w.id}
          style={{
            minWidth: "85%",
            flexShrink: 0,
            scrollSnapAlign: "center",
            borderRadius: "18px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
          }}
        >
          {/* Top */}
          <div style={{ textAlign: "center" }}>
            <img
              src={w.image_url}
              alt={w.player_name}
              style={{
                width: "250px",
                height: "200px",
                borderRadius: "0%",
                objectFit: "cover",
                objectPosition: "70% 25%", // 🔥 KEY FIX
                border: "3px solid gold",
                marginBottom: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}
            />

            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {w.player_name}
            </div>

            <div style={{ color: "#666", marginBottom: "10px" }}>
              {w.tour_name}
            </div>
          </div>

          {/* Details */}
          <div style={{ textAlign: "center", fontSize: "16px", lineHeight: "1.8" }}>
            ⛳ {w.course} <br />
            🏌️ Score: <b style={{ fontSize: "20px" }}>{w.score}</b> <br />
            🗓 {new Date(w.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  </div>
)}