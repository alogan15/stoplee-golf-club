"use client"

export default function OddsPage() {
  const weeklyOdds = [
    { name: "Andre", odds: -950 },
    { name: "Jamar", odds: +400 },
    { name: "Malik", odds: +750 }
  ]

  const seasonOdds = [
    { name: "Jamar (2x Champ)", odds: -1050 },
    { name: "Andre", odds: +250 },
    { name: "Dre", odds: +600 }
  ]

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds}` : odds
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        📊 SLGC Odds Board
      </h1>

      {/* Weekly */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "10px" }}>🔥 This Week</h2>

        {weeklyOdds.map((player, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "10px",
              background: "#1e293b"
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
              background: "#1e293b"
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
    </div>
  )
}