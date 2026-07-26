"use client"

import BackButton from "@/src/components/BackButton"
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
    is_winner: boolean
  }[]
}

// 🧠 HARD CODE YOUR DATA HERE
const players: Player[] = [
  {
    id: "1",
    name: "Andre",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 17, strokes: 102, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 14, strokes: 100, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 16, strokes: 105, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 14, strokes: 103, isOfficial: true, is_winner: false }]
    },
  {
    id: "2",
    name: "Malcolm",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 14, strokes: 100, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "3",
    name: "Aaron",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  20, strokes: 95, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 19, strokes: 93, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
    {
    id: "4",
    name: "Julian",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  5, strokes: 120, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 12, strokes: 102, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 6, strokes: 120, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 11, strokes: 108, isOfficial: true, is_winner: false }]
  },
  {
    id: "5",
    name: "Greg",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 1, strokes: 127, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 10, strokes: 115, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false},
      { event: "Moccasin Run", points: 7, strokes: 121, isOfficial: true, is_winner: false }]
    },
  {
    id: "6",
    name: "LJ",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  11, strokes: 113, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 11, strokes: 98, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 9, strokes: 107, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 12, strokes: 108, isOfficial: true, is_winner: false }]
  },
    {
    id: "7",
    name: "Steph",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 9, strokes: 112, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 8, strokes: 108, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 9, strokes: 115, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 2, strokes: 119, isOfficial: true, is_winner: false }]
  },
  {
    id: "8",
    name: "Walt",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 4, strokes: 108, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 2, strokes: 113, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 6, strokes: 112, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "9",
    name: "James",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  6, strokes: 115, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 8, strokes: 107, isOfficial: false, is_winner: false },
      { event: "Mercer Oaks(West)", points: 9, strokes: 110, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 8, strokes: 106, isOfficial: true, is_winner: false },
    ]
  },
    {
    id: "10",
    name: "Jamar",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 23, strokes: 95, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 17, strokes: 98, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 25, strokes: 97, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 14, strokes: 100, isOfficial: true, is_winner: false }]
  },
  {
    id: "11",
    name: "Larry",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 13, strokes: 104, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 9, strokes: 104, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 8, strokes: 106, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 14, strokes: 103, isOfficial: true, is_winner: false }]
  },
  {
    id: "12",
    name: "Greeco",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  10, strokes: 119, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 11, strokes: 109, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 6, strokes: 111, isOfficial: true, is_winner: false},
      { event: "Moccasin Run", points: 10, strokes: 115, isOfficial: true, is_winner: false }]
  },
  {
    id: "13",
    name: "Danny",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 4 , strokes: 122, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 6, strokes: 115, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "14",
    name: "Erik L",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 14, strokes: 106, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 11, strokes: 99, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 12, strokes: 105, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "15",
    name: "Isaiah",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  3, strokes: 119, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 5, strokes: 123, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 5, strokes: 119, isOfficial: true, is_winner: false},
      { event: "Moccasin Run", points: 8, strokes: 120, isOfficial: true, is_winner: false }]
  },
  {
    id: "16",
    name: "Tyrin",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 21, strokes: 93, isOfficial: true, is_winner: true },
      { event: "Rock Manor", points: 20, strokes: 95, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 27, strokes: 91, isOfficial: true, is_winner: true },
      { event: "Moccasin Run", points: 34, strokes: 85, isOfficial: true, is_winner: false }]
  },
  {
    id: "17",
    name: "Short", 
    flight: "A",
    scores: [
      { event: "Broad Run", points: 9, strokes: 110, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 10, strokes: 104, isOfficial: true, is_winner: false },
      { event: "Mercer Oaks(West)", points: 20, strokes: 99, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 12, strokes: 104, isOfficial: true, is_winner: false }]
  },
  {
    id: "18",
    name: "Spurg",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  13, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 15, strokes: 99, isOfficial: true, is_winner: false }, 
      { event: "Mercer Oaks(West)", points: 17, strokes: 94, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 14, strokes: 103, isOfficial: true, is_winner: false }]
  },
  {
    id: "19",
    name: "Cuffy",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Rock Manor", points: 0, strokes: 0, isOfficial: true, is_winner: false },   
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "20",
    name: "Jay",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 6, strokes: 122, isOfficial: false, is_winner: false },
      { event: "Rock Manor", points: 14, strokes: 99, isOfficial: false, is_winner: false },  
      { event: "Mercer Oaks(West)", points: 4, strokes: 109, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 33, strokes: 84, isOfficial: true, is_winner: true },
    ]
  },
  {
    id: "21",
    name: "Keivon",
    flight: "A",
    scores: [
      { event: "Broad Run", points:  16, strokes: 106, isOfficial: false, is_winner: false },
      { event: "Rock Manor", points: 15, strokes: 105, isOfficial: false, is_winner: false }, 
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
    {
    id: "22",
    name: "Anthony",
    flight: "B",
    scores: [
      { event: "Broad Run", points:  9, strokes: 111, isOfficial: false, is_winner: false  },
      { event: "Rock Manor", points: 7, strokes: 107, isOfficial: false, is_winner: false },  
      { event: "Mercer Oaks(West)", points: 5, strokes: 120, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
  {
    id: "23",
    name: "Eric B",
    flight: "A",
    scores: [
      { event: "Broad Run", points: 8, strokes: 105, isOfficial: false, is_winner: false  },
      { event: "Rock Manor", points: 16, strokes: 95, isOfficial: true, is_winner: true },  
      { event: "Mercer Oaks(West)", points: 16, strokes: 101, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 0, strokes: 0, isOfficial: true, is_winner: false }]
  },
    {
    id: "24",
    name: "Rickey",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 5, strokes: 0, isOfficial: true, is_winner: false  },
      { event: "Rock Manor", points: 3, strokes: 118, isOfficial: true, is_winner: false }, 
      { event: "Mercer Oaks(West)", points: 0, strokes: 0, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 6, strokes: 120, isOfficial: true, is_winner: false }]
  },
    {
    id: "24",
    name: "Justin",
    flight: "B",
    scores: [
      { event: "Broad Run", points: 7, strokes: 118, isOfficial: false, is_winner: false  },
      { event: "Rock Manor", points: 5, strokes: 117, isOfficial: false, is_winner: false },
      { event: "Mercer Oaks(West)", points: 4, strokes: 117, isOfficial: true, is_winner: false },
      { event: "Moccasin Run", points: 20, strokes: 95, isOfficial: true, is_winner: false }]
  },
]

// 🏌️ EVENTS (ORDER MATTERS)
const events = [
  "Broad Run",
  "Rock Manor",
  "Mercer Oaks(West)",
  "Moccasin Run",
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


const eventWinners: Record<string, string> = {}

events.forEach(event => {
  players.forEach(player => {
    const scoreObj = player.scores.find(s => s.event === event)

    if (!scoreObj || !scoreObj.isOfficial) return

    if ((scoreObj as any).is_winner) {
      eventWinners[event] = player.id
    }
  })
})


  return (
    <div style={{
      padding: "20px",
      maxWidth: "1100px",
      margin: "0 auto"
    }}>

      <BackButton />

      <h1 style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🏆 League Leaderboard
      </h1>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <button
    onClick={() => setFlight("A")}
    style={{
      padding: "10px 20px",
      borderRadius: "999px",
      border: "none",
      cursor: "pointer",
      background: flight === "A" ? "#166534" : "#e5e7eb",
      color: flight === "A" ? "white" : "#374151",
      fontWeight: 700,
      transition: "0.2s",
    }}
  >
    Flight A
  </button>

  <button
    onClick={() => setFlight("B")}
    style={{
      padding: "10px 20px",
      borderRadius: "999px",
      border: "none",
      cursor: "pointer",
      background: flight === "B" ? "#166534" : "#e5e7eb",
      color: flight === "B" ? "white" : "#374151",
      fontWeight: 700,
      transition: "0.2s",
    }}
  >
    Flight B
  </button>
</div>

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
              <th style=  {{...thStyle,
            position: "sticky",
            left: 0,
            background: "#f9fafb",
            zIndex: 3
            }}>Rank</th>


        <th
          style={{
            ...thStyle,
            position: "sticky",
            left: "94px",
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
                <tr key={`${player.id}-${i}`} style={{
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
       <td
              style={{
                ...tdCenter,
                position: "sticky",
                left: 0,
                minWidth: "70px",
                width: "70px",
                maxWidth: "70px",
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
                zIndex: 3,
              }}
            >
              {player.rank}
            </td>
                <td   style={{
                  ...tdLeft,
                  position: "sticky",
                  left: "94px",
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
{(() => {
  const eventPlayed = scoreObj && scoreObj.isOfficial
  const hasScore =
    scoreObj &&
    (scoreObj.strokes > 0 || scoreObj.points > 0)

  const isDNP =
    scoreObj &&
    scoreObj.isOfficial &&
    scoreObj.strokes === 0 &&
    scoreObj.points === 0

  // ✅ Player has a score
  if (hasScore) {
    return (
      <div>
        <div style={{ fontWeight: "600" }}>
          {scoreObj.points} {isWinner && "🏆"}
        </div>

        <div style={{ fontSize: "12px", color: "#999" }}>
          ({scoreObj.strokes})
        </div>
      </div>
    )
  }

  // ✅ Official event but player did not play
  if (isDNP) {
    return (
      <div style={{ color: "#999", fontWeight: "500" }}>
        DNP
      </div>
    )
  }

  // ✅ Future event / unofficial / no score yet
  return "-"
})()}
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