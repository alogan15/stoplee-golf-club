"use client"

import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"
import { useState } from "react"

export default function PowerRankingsPage() {
  const [flight, setFlight] = useState<"A" | "B">("A")

  // FINAL 2026 SEASON POWER RANKINGS
  const flightARankings = [
    { name: "Tyrin", rank: 1 },
    { name: "Jamar", rank: 2 },
    { name: "Andre", rank: 3 },
    { name: "Eric B", rank: 4 },
    { name: "Jay", rank: 5 },
    { name: "Spurg", rank: 6 },
    { name: "Erik L", rank: 7 },
    { name: "Short", rank: 8 },
    { name: "Larry", rank: 9 },
    { name: "Keivon", rank: 10 },
    { name: "Aaron", rank: 11 },
    { name: "Malcolm", rank: 12 },
  ]

  const flightBRankings = [
    { name: "LJ", rank: 1 },
    { name: "Justin", rank: 2 },
    { name: "James", rank: 3 },
    { name: "Julian", rank: 4 },
    { name: "Steph", rank: 5 },
    { name: "Greeco", rank: 6 },
    { name: "Danny", rank: 7 },
    { name: "Anthony", rank: 8 },
    { name: "Greg", rank: 9 },
    { name: "Isaiah", rank: 10 },
    { name: "Walt", rank: 11 },
    { name: "Rickey", rank: 12 },
  ]

  const rankings =
    flight === "A"
      ? flightARankings
      : flightBRankings

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
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <BackButton />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          ⚡ SLGC Power Rankings
        </h1>

        <div
          style={{
            color: "#166534",
            fontWeight: "800",
            fontSize: "15px",
          }}
        >
          🏆 2026 SEASON FINALE
        </div>

        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginTop: "6px",
          }}
        >
          Final Power Rankings
        </p>
      </div>

      {/* Championship Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1f5133 0%, #16452b 100%)",
          color: "white",
          borderRadius: "18px",
          padding: "22px 18px",
          marginBottom: "24px",
          textAlign: "center",
          borderLeft: "6px solid #d4af37",
          boxShadow: "0 8px 24px rgba(0,0,0,.12)",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#f5d76e",
            marginBottom: "8px",
          }}
        >
          FINAL CHAMPIONS
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "8px",
          }}
        >
          {flight === "A"
            ? "🥇 Tyrin — Flight A Champion"
            : "🥇 LJ — Flight B Champion"}
        </div>

        <div
          style={{
            fontSize: "13px",
            opacity: 0.85,
          }}
        >
          Wyncote Golf Club • Tour Championship
        </div>
      </div>

      {/* Flight Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setFlight("A")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "999px",
            background:
              flight === "A" ? "#166534" : "#e5e7eb",
            color:
              flight === "A" ? "white" : "#374151",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Flight A
        </button>

        <button
          onClick={() => setFlight("B")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "999px",
            background:
              flight === "B" ? "#166534" : "#e5e7eb",
            color:
              flight === "B" ? "white" : "#374151",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Flight B
        </button>
      </div>

      {/* Podium Summary */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: "16px",
          padding: "18px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
            fontWeight: "700",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          {flight === "A"
            ? "Flight A Podium"
            : "Flight B Podium"}
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: "800",
            lineHeight: "30px",
          }}
        >
          {flight === "A" ? (
            <>
              🥇 Tyrin &nbsp; 🥈 Jamar &nbsp; 🥉 Andre
            </>
          ) : (
            <>
              🥇 LJ &nbsp; 🥈 Justin &nbsp; 🥉 James
            </>
          )}
        </div>
      </div>

      {/* Rankings */}
      {rankings.map((player, i) => {
        let borderColor = "#444"

        if (i < 3) {
          borderColor = "#d4af37"
        } else if (i < 6) {
          borderColor = "#c0c0c0"
        } else {
          borderColor = "#cd7f32"
        }

        return (
          <div
            key={player.name}
            style={{
              background: "#1f5133",
              padding: "18px",
              borderRadius: "14px",
              borderLeft: `6px solid ${borderColor}`,
              marginBottom: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              boxShadow:
                i < 3
                  ? "0 0 10px rgba(255,215,0,0.3)"
                  : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                letterSpacing: "0.5px",
                fontSize:
                  player.rank <= 3 ? "26px" : "20px",
                fontWeight:
                  player.rank <= 3 ? "700" : "500",
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

      {/* Season Ending Message */}
      <div
        style={{
          marginTop: "28px",
          marginBottom: "20px",
          padding: "22px",
          borderRadius: "18px",
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: "#166534",
            marginBottom: "10px",
          }}
        >
          🏆 That's a wrap.
        </div>

        <p
          style={{
            color: "#666",
            lineHeight: "23px",
            margin: 0,
          }}
        >
          The 2026 StopLee Golf Club season is officially
          in the books. Six rounds, two flights, two
          champions, and plenty of drama from start to
          finish.
        </p>
      </div>

      <div
        style={{
          textAlign: "right",
          fontSize: "12px",
          color: "#666",
          fontStyle: "italic",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        * Final rankings reflect the completed 2026 season.
      </div>

      <SocialFooter />
    </div>
  )
}