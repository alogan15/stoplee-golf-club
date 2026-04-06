"use client"

import BackButton from "@/src/components/BackButton"

export default function RecordsPage() {
  const records = [
    { label: "Most Pars", value: "-", player: "-" },
    { label: "Most Birdies", value: "-", player: "-" },
    { label: "Most Bogeys", value: "-", player: "-" },
    { label: "Eagle", value: "-", player: "-" },
    { label: "Albatross", value: "-", player: "-" },
    { label: "Lowest Round", value: "-", player: "-" },
    { label: "Most Stableford Points", value: "-", player: "-" },
    { label: "Best Front 9", value: "-", player: "-" },
    { label: "Best Back 9", value: "-", player: "-" },
    { label: "Hole in One", value: "-", player: "-" },
    { label: "Winning Streak", value: "-", player: "-" },
    { label: "Most Tour Wins", value: "-", player: "-" }

  ]

  return (

    
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>

        <BackButton />

      {/* Header */}
      <h1 style={{
        fontSize: "32px",
        fontWeight: "800",
        marginBottom: "8px"
      }}>
        🏆 SLGC Archives
      </h1>

      <p style={{
        opacity: 0.7,
        marginBottom: "24px"
      }}>
        All-time league achievements
      </p>

      {/* Records Grid */}
      <div style={{
        display: "grid",
        gap: "12px"
      }}>
        {records.map((record, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "16px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}>
            <div>
              <div style={{ fontWeight: "600" }}>{record.label}</div>
              <div style={{ fontSize: "12px", opacity: 0.6 }}>
                {record.player}
              </div>
            </div>

            <div style={{
              fontSize: "20px",
              fontWeight: "700"
            }}>
              {record.value}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}