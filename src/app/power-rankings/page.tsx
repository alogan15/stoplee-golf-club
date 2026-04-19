"use client"

import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"

export default function PowerRankingsPage() {
const rankings = [
  { name: "Jamar", rank: 1, trend: "up", change: 1 },
  { name: "Tyrin", rank: 2, trend: "steady", change: 0 },
  { name: "Aaron", rank: 3, trend: "up", change: 2 },
  { name: "Andre", rank: 4, trend: "up", change: 1 },
  { name: "Erik", rank: 5, trend: "down", change: -1 },
  { name: "Malcolm", rank: 6, trend: "steady", change: 0 },
  { name: "Larry", rank: 7, trend: "steady", change: 0 },
  { name: "LJ", rank: 8, trend: "steady", change: 0 },
  { name: "Greeco", rank: 9, trend: "steady", change: 0 },
  { name: "Short", rank: 10, trend: "steady", change: 0 },
]


function getTrendDisplay(trend: string, change: number) {
  if (trend === "up") return `📈 +${change}`
  if (trend === "down") return `📉 ${change}`
  return "➖"
}

  function getTierIcon(rank: number) {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"

  if (rank <= 6) {
    const icons = ["👑", "💎", "⭐"]
    return icons[rank - 4]
  }

  if (rank <= 10) {
    const icons = ["⚔️", "🎯", "🧠", "🏌🏿‍♂️"]
    return icons[rank - 7]
  }

  return "🧱"
}

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <BackButton />
      
      <h1 style={{
        textAlign: "center",
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        ⚡ SLGC Power Rankings
      </h1>

      {rankings.map((player, i) => {
        let borderColor = "#444"

        if (i < 3) borderColor = "gold"
        else if (i < 6) borderColor = "silver"
        else borderColor = "#cd7f32" // bronze

        return (
            <div
            key={player.name}
            style={{
                background: "#1e293b",
                padding: "18px",
                borderRadius: "14px",
                marginBottom: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                borderLeft: `4px solid ${borderColor}`,
                boxShadow: i < 3 ? "0 0 10px rgba(255,215,0,0.3)" : "none",
            }}
            >
            <div
                style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                letterSpacing: "0.5px",
                fontSize: player.rank <= 3 ? "26px" : "20px",
                fontWeight: player.rank <= 3 ? "700" : "500"
                }}
            >
                <span style={{ fontSize: "22px" }}>
                {getTierIcon(player.rank)}
                </span>

                <span>
                #{player.rank} {player.name}
                </span>
            </div>
            </div>
        )
      })}
                  <SocialFooter />

    </div>
  )
}