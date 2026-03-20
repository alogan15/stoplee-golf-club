"use client"

import { useParams, useRouter } from "next/navigation"



export default function PlayerProfile() {
  const params = useParams()
  const playerId = params.id
  const router = useRouter()

  const players: any = {
  jamar: {
    name: "Jamar",
    avatar: "/players/jamar.jpg"
  },
  andre: {
    name: "Andre",
    avatar: "/players/andre.png"
  },
  malcolm: {
    name: "Malcolm",
    avatar: "/players/malcolm.jpg"
  },
  erik: {
    name: "Erik",
    avatar: "/players/erik.jpg"
  }
}

const player = players[playerId as string]

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      background: "#f5f5f5"
    }}>

        <button
        onClick={() => router.back()}
        style={{
            marginBottom: "20px",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#eee",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(45,108,223,0.4)"
        }}
        >
        ← Back
        </button>


      {/* PROFILE CARD */}
      <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>

        {/* PROFILE PIC */}
        <img
        src={player?.avatar}
        style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            objectFit: "fill",
            marginBottom: "15px",
            border: "4px solid #2d6cdf",
            boxShadow: "0 0 25px rgba(45,108,223,0.4)"
        }}
        />

<h2>{player?.name}</h2>

        {/* NAME */}
        
 
        

        <p style={{ color: "#777", marginBottom: "20px" }}>
          SLGC Member
        </p>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "25px"
        }}>

          <Stat label="Wins" value="2" />
          <Stat label="Avg Score" value="15" />
          <Stat label="Points" value="113" />
          <Stat label="Rounds" value="8" />

        </div>

        {/* ACHIEVEMENTS */}
        <div style={{
          textAlign: "left",
          background: "#fafafa",
          padding: "15px",
          borderRadius: "12px"
        }}>
          <h3 style={{ marginBottom: "10px" }}>🏆 Achievements</h3>
          <p>🥇 Champion 2025</p>
          <p>🔥 Hot Streak</p>
          <p>🎯 Lowest Round: 12</p>
        </div>

      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div style={{
      background: "#f0f4ff",
      padding: "12px",
      borderRadius: "10px"
    }}>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        {value}
      </div>
      <div style={{ fontSize: "12px", color: "#555" }}>
        {label}
      </div>
    </div>
  )
}