"use client"

import { useMemo } from "react"
import { useState } from "react"


type Player = {
  id: string
  name: string
  flight: "A" | "B"
  scores: {
    event: string
    points: number
    strokes: number
    isOfficial: boolean
  }[]
}

// 🧠 HARD CODE YOUR DATA HERE
const players: Player[] = [
  {
    id: "1",
    name: "Andre",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 17, strokes: 102, isOfficial: true }  ]
  },
  {
    id: "2",
    name: "Malcolm",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 14, strokes: 100, isOfficial: true }    ]
  },
  {
    id: "3",
    name: "Aaron",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  20, strokes: 95, isOfficial: true }   ]
  },
    {
    id: "4",
    name: "Julian",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  5, strokes: 120, isOfficial: true }    ]
  },
  {
    id: "5",
    name: "Greg",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 1, strokes: 127, isOfficial: true }    ]
  },
  {
    id: "6",
    name: "LJ",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  11, strokes: 113, isOfficial: true }    ]
  },
    {
    id: "7",
    name: "Steph",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 9, strokes: 112, isOfficial: true }    ]
  },
  {
    id: "8",
    name: "Walt",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 4, strokes: 108, isOfficial: true }    ]
  },
  {
    id: "9",
    name: "James",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  6, strokes: 115, isOfficial: true }    ]
  },
    {
    id: "10",
    name: "Jamar",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 23, strokes: 95, isOfficial: true }    ]
  },
  {
    id: "11",
    name: "Larry",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 13, strokes: 104, isOfficial: true }    ]
  },
  {
    id: "12",
    name: "Greeco",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  10, strokes: 119, isOfficial: true }    ]
  },
    {
    id: "13",
    name: "Danny",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 4 , strokes: 122, isOfficial: true }    ]
  },
  {
    id: "14",
    name: "Erik L",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 14, strokes: 106, isOfficial: true }    ]
  },
  {
    id: "15",
    name: "Isaiah",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  3, strokes: 119, isOfficial: true }    ]
  },
    {
    id: "16",
    name: "Tyrin",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 21, strokes: 93, isOfficial: true }    ]
  },
  {
    id: "17",
    name: "Short",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 9, strokes: 110, isOfficial: true }    ]
  },
  {
    id: "18",
    name: "Spurg",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  13, strokes: 0, isOfficial: true }    ]
  },
    {
    id: "19",
    name: "Cuffy",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 0, strokes: 0, isOfficial: true }    ]
  },
  {
    id: "20",
    name: "Jay",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 0, strokes: 0, isOfficial: false }    ]
  },
  {
    id: "21",
    name: "Keivon",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  0, strokes: 0, isOfficial: false }    ]
  },
    {
    id: "22",
    name: "Anthony",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  0, strokes: 0, isOfficial: false  }    ]
  },
  {
    id: "23",
    name: "Eric B",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 0, strokes: 0, isOfficial: false  }    ]
  },
    {
    id: "24",
    name: "Rickey",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 5, strokes: 0, isOfficial: true  }    ]
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

function calculatepoints(points: number, par: number) {
  const diff = points - par

  if (diff <= -3) return 9   // Albatross+
  if (diff === -2) return 7 // Eagle
  if (diff === -1) return 5 // Birdie
  if (diff === 0) return 3   // Par
  if (diff === 1) return 1   // Bogey
  return 0                   // Double+
}

export default function LeaderboardSimple() {
  const [flight, setFlight] = useState<"A" | "B">("A")

  const filteredPlayers = players.filter(p => p.flight === flight)

  const leaderboard = filteredPlayers
    .map(player => {
      let total = 0
      let roundsPlayed = 0

      const scoreMap: Record<string, number> = {}

      player.scores.forEach(s => {
        scoreMap[s.event] = s.points
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
        scoreMap
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


const eventWinners: Record<string, string> = {}

events.forEach(event => {
  let lowest = Infinity
  let winnerId: string | null = null

  players.forEach(player => {
    const scoreObj = player.scores.find(s => s.event === event)

    // ❌ skip if not official round
    if (!scoreObj || !scoreObj.isOfficial) return

    // ❌ skip invalid strokes
    if (!scoreObj.strokes || scoreObj.strokes <= 0) return

    // ✅ lowest official score wins
    if (scoreObj.strokes < lowest) {
      lowest = scoreObj.strokes
      winnerId = player.id
    }
  })

  if (winnerId) {
    eventWinners[event] = winnerId
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
        🏆 Flight {flight} Leaderboard
      </h1>

      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        overflowX: "auto"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px"
        }}>
          <button
            onClick={() => setFlight("A")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: flight === "A" ? "#111" : "#e5e7eb",
              color: flight === "A" ? "white" : "#333",
              fontWeight: "600"
            }}
          >
            Flight A
          </button>

          <button
            onClick={() => setFlight("B")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: flight === "B" ? "#111" : "#e5e7eb",
              color: flight === "B" ? "white" : "#333",
              fontWeight: "600"
            }}
          >
            Flight B
          </button>
        </div>

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

                {events.map(event => {
                  const scoreObj = player.scores.find(s => s.event === event)
                  const isWinner = eventWinners[event] === player.id

                  return (
                    <td key={event} style={tdCenter}>
                      {scoreObj ? (
                        <div>
                          <div style={{ fontWeight: "600" }}>
                            {scoreObj.points} {isWinner && "🏆"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#999" }}>
                            ({scoreObj.strokes ?? "-"})
                          </div>
                        </div>
                      ) : "-"}
                    </td>
                  )
                })}

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