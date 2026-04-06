"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

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
  <div>
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
              src={w.image_url || "/default-avatar.png"}
              alt={w.player_name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid gold",
                marginBottom: "12px",
                boxShadow: "0 0 0 4px rgba(255,215,0,0.3), 0 8px 16px rgba(0,0,0,0.2)"
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