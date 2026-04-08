"use client"

import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"

export default function OddsPage() {
const weeklyOdds = [
  { name: "Jamar", odds: -900 },
  { name: "Andre", odds: -650 },
  { name: "Jay", odds: 300 },
  { name: "Erik", odds: 400 },
  { name: "Keivon", odds: 900 },
  { name: "Larry", odds: 1200 },
  { name: "The Field", odds: 1700}
]

const seasonOdds = [
  { name: "Jamar (2x Champ)", odds: -1100 },
  { name: "Andre", odds: 250 },
  { name: "Jay", odds: 600 },
  { name: "Erik", odds: 750 },
  { name: "Keivon", odds: 1200 },
  { name: "Larry", odds: 1500 },
  { name: "Malcolm", odds: 1800 },
  { name: "The Field", odds: 2200}
]

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : odds
  }

  return (

    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
         <BackButton />
      <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        📊 SLGC Odds Board
      </h1>

      {/* Weekly */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "10px" }}>🔥 This Month</h2>

        {weeklyOdds.map((player, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "10px",
              background: "#1e293b",
              color: "#fff"
            }}
          >
            <span>{player.name}</span>
            <span
              style={{
                color: player.odds < 0 ? "#22c55e" : "#ef4444",
                fontWeight: "bold"
              }}
            >
              {formatOdds(player.odds)}
            </span>
          </div>
        ))}
      </div>

      {/* Season */}
      <div>
        <h2 style={{ marginBottom: "10px" }}>🏆 Season Champion</h2>

        {seasonOdds.map((player, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "10px",
              background: "#1e293b",
              color: "#fff"
            }}
          >
            <span>{player.name}</span>
            <span
              style={{
                color: player.odds < 0 ? "#22c55e" : "#ef4444",
                fontWeight: "bold"
              }}
            >
              {formatOdds(player.odds)}
            </span>
          </div>
        ))}
      </div>
      <SocialFooter />
    </div>
  )
}