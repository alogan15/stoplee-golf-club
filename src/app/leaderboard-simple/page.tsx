"use client"

import { useMemo } from "react"


type Player = {
  id: string
  name: string
  scores: {
    event: string
    stableford: number
  }[]
}

// 🧠 HARD CODE YOUR DATA HERE
const players: Player[] = [
  {
    id: "1",
    name: "Andre",
    scores: [
      { event: "Broad Run", stableford: 17 }    ]
  },
  {
    id: "2",
    name: "Malcolm",
    scores: [
      { event: "Broad Run", stableford: 14 }    ]
  },
  {
    id: "3",
    name: "Aaron",
    scores: [
      { event: "Broad Run", stableford:  20 }    ]
  },
    {
    id: "4",
    name: "Julian",
    scores: [
      { event: "Broad Run", stableford:  5}    ]
  },
  {
    id: "5",
    name: "Greg",
    scores: [
      { event: "Broad Run", stableford: 1 }    ]
  },
  {
    id: "6",
    name: "LJ",
    scores: [
      { event: "Broad Run", stableford:  11 }    ]
  },
    {
    id: "7",
    name: "Steph",
    scores: [
      { event: "Broad Run", stableford: 9 }    ]
  },
  {
    id: "8",
    name: "Walt",
    scores: [
      { event: "Broad Run", stableford: 4 }    ]
  },
  {
    id: "9",
    name: "James",
    scores: [
      { event: "Broad Run", stableford:  6 }    ]
  },
    {
    id: "10",
    name: "Jamar",
    scores: [
      { event: "Broad Run", stableford: 23 }    ]
  },
  {
    id: "11",
    name: "Larry",
    scores: [
      { event: "Broad Run", stableford: 13 }    ]
  },
  {
    id: "12",
    name: "Greeco",
    scores: [
      { event: "Broad Run", stableford:  10 }    ]
  },
    {
    id: "13",
    name: "Danny",
    scores: [
      { event: "Broad Run", stableford: 4 }    ]
  },
  {
    id: "14",
    name: "Erik L",
    scores: [
      { event: "Broad Run", stableford: 14 }    ]
  },
  {
    id: "15",
    name: "Isaiah",
    scores: [
      { event: "Broad Run", stableford:  3 }    ]
  },
    {
    id: "16",
    name: "Tyrin",
    scores: [
      { event: "Broad Run", stableford: 21 }    ]
  },
  {
    id: "17",
    name: "Short",
    scores: [
      { event: "Broad Run", stableford: 9 }    ]
  },
  {
    id: "18",
    name: "Spurg",
    scores: [
      { event: "Broad Run", stableford:  13 }    ]
  },
    {
    id: "19",
    name: "Cuffy",
    scores: [
      { event: "Broad Run", stableford: 0 }    ]
  },
  {
    id: "20",
    name: "Jay",
    scores: [
      { event: "Broad Run", stableford: 0 }    ]
  },
  {
    id: "21",
    name: "Keivon",
    scores: [
      { event: "Broad Run", stableford:  0 }    ]
  },
    {
    id: "22",
    name: "Anthony",
    scores: [
      { event: "Broad Run", stableford:  0 }    ]
  },
  {
    id: "23",
    name: "Eric B",
    scores: [
      { event: "Broad Run", stableford: 0 }    ]
  },
    {
    id: "24",
    name: "Rickey",
    scores: [
      { event: "Broad Run", stableford: 5 }    ]
  }
]

// 🏌️ EVENTS (ORDER MATTERS)
const events = [
  "Broad Run",
  "Rock Manor",
  "Moccasin Run",
  "Mercer Oaks(West)",
  "The Architects",
  "Town & Country"
]

function calculateStableford(stableford: number, par: number) {
  const diff = stableford - par

  if (diff <= -3) return 9   // Albatross+
  if (diff === -2) return 7 // Eagle
  if (diff === -1) return 5 // Birdie
  if (diff === 0) return 3   // Par
  if (diff === 1) return 1   // Bogey
  return 0                   // Double+
}

export default function LeaderboardSimple() {
  

const leaderboard = players
  .map(player => {
    let total = 0
    let roundsPlayed = 0

    // ✅ convert array → object
    const scoreMap: Record<string, number> = {}

    player.scores.forEach(s => {
      scoreMap[s.event] = s.stableford
    })

    events.forEach(event => {
      const score = scoreMap[event]

      if (score !== undefined) {
        total += score
        roundsPlayed++
      }
    })

    const avg =
      roundsPlayed > 0
        ? (total / roundsPlayed).toFixed(1)
        : "0.0"

    return {
      ...player,
      total,
      avg,
      scoreMap // ✅ use this in UI
    }
  })
  .sort((a, b) => b.total - a.total)

const leaderboardWithRank = leaderboard.map((player, index, arr) => {
  // find first index where this score appears
  const firstIndex = arr.findIndex(p => p.total === player.total)

  const rankNumber = firstIndex + 1

  // check if it's a tie
  const isTie = arr.filter(p => p.total === player.total).length > 1

  return {
    ...player,
    rank: isTie ? `T-${rankNumber}` : `${rankNumber}`
  }
})

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1100px",
      margin: "0 auto"
    }}>
      <h1 style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🏆 League Leaderboard
      </h1>

      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>
        <table style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: "800px"
        }}>
          <thead>
            <tr>
              <th style={thStyle}>Rank</th>


        <th
          style={{
            ...thStyle,
            position: "sticky",
            left: 0,
            background: "#f9fafb",
            zIndex: 3
          }}
        >
          Player
        </th>
              {events.map(event => (
                <th key={event} style={thStyle}>
                  {event}
                </th>
              ))}

              <th style={thStyle}>Total</th>
              <th style={thStyle}>AVG</th>
            </tr>
          </thead>

          <tbody>
              {leaderboardWithRank.map((player, i) => (
                <tr key={player.id} style={{
                background:
                  i === 0
                    ? "#fff8e1"
                    : i === 1
                    ? "#f1f5f9"
                    : i === 2
                    ? "#fef2f2"
                    : i % 2 === 0
                    ? "#fafafa"
                    : "white",
                fontWeight: i === 0 ? "700" : "normal"
              }}>
              <td style={tdCenter}>{player.rank}</td>
                <td   style={{
                  ...tdLeft,
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 2,
                  boxShadow: "2px 0 5px rgba(0,0,0,0.05)"
                }}>
                  {i === 0 && "🥇 "}
                  {i === 1 && "🥈 "}
                  {i === 2 && "🥉 "}
                  {player.name}
                </td>

                {events.map(event => (
                  <td key={event} style={tdCenter}>
                    {player.scoreMap[event] ?? "-"}
                  </td>
                ))}

                <td style={{ ...tdCenter, fontWeight: "700" }}>
                  {player.total}
                </td>

                <td style={tdCenter}>
                  {player.avg}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 🎨 STYLES
const thStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "13px",
  textTransform: "uppercase",
  color: "#666",
  textAlign: "center"
}

const tdCenter: React.CSSProperties = {
  padding: "12px",
  textAlign: "center"
}

const tdLeft: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "500"
}