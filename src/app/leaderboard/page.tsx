"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../lib/supabase"
import { calculateRoundPoints } from "../../lib/scoring"
import BackButton from "@/src/components/BackButton"

export const dynamic = "force-dynamic"


export default function Leaderboard() {
  const [rounds,setRounds] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  const params = useParams()
  const eventId = params?.eventId

  const router = useRouter()
    useEffect(()=>{
    async function checkUser(){
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
    router.push(`/leaderboard/${eventId}`)
    }

}

checkUser()
},[])

    function getPlayerHole(scores:number[]){
      let hole = 0
      scores.forEach((score,i)=>{
        if(score && score > 0){
          hole = i + 1
        }
      })

      return hole
      
    }

      function formatThru(scores:number[]){
        const holesPlayed = scores.filter(score => score > 0).length
        if(holesPlayed === 18){
          return "F"
        }
        return `THRU ${holesPlayed}`
      }

  async function loadRounds(){

    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      // .eq("event_id", eventId)
      .order("created_at", { ascending: false })

        if(error){
          console.error(error)
        } else {
          setRounds(data)
        }

        setLoading(false)
        console.log("ROUNDS:", data)
      }



    useEffect(()=>{
      loadRounds()
      const channel = supabase
      .channel("event-live")
      .on(
        "postgres_changes",
        { event:"*", schema:"public", table:"rounds", filter: `event_id=eq.${eventId}` },
        () => {
          loadRounds()
        }
      )
      .subscribe()

      return ()=>{
        supabase.removeChannel(channel)
      }

    },[])


const leaderboard: any = {}

rounds?.forEach((round) => {
  const playerId = round.player_id || round.player_id
  const playerName = round.player_name || playerId

  if (!playerId) return

const scores = (round.scores || []).map((s: any) => Number(s) || 0)
const pars = (round.pars || []).map((p: any) => Number(p) || 0)

const total = calculateRoundPoints(scores, pars)
const strokeTotal = scores.reduce((sum: number, s: number) => sum + s, 0)
const event = round.course


// ✅ STEP 1 — make sure player exists FIRST
if (!leaderboard[playerId]) {
  leaderboard[playerId] = {
    player_id: playerId,
    player_name: playerName,
    points: 0,
    events: {},
    strokes: {},
    hole: 0,
    scores: []
  }
}

// ✅ STEP 2 — now it's safe to use events
if (!leaderboard[playerId].events[event]) {
  leaderboard[playerId].events[event] = 0
}

// ✅ STEP 3 — add points
if (!leaderboard[playerId].events[event]) {
  leaderboard[playerId].events[event] = 0
}

if (!leaderboard[playerId].strokes[event]) {
  leaderboard[playerId].strokes[event] = 0
}

if (!leaderboard[playerId].events[event]) {
  leaderboard[playerId].events[event] = 0
}

leaderboard[playerId].events[event] += total
if (!leaderboard[playerId].strokes[event]) {
  leaderboard[playerId].strokes[event] = 0
}

leaderboard[playerId].strokes[event] = strokeTotal

// existing logic
leaderboard[playerId].points += total
leaderboard[playerId].hole = getPlayerHole(scores)
leaderboard[playerId].scores = scores
})


const sortedLeaderboard = Object.values(leaderboard)
  .sort((a: any, b: any) => b.points - a.points)

const leaderboardWithAvg = sortedLeaderboard.map((player: any) => {
const roundsPlayed = (Object.values(player.events || {}) as number[])
  .filter((pts) => pts > 0).length

  const avg =
    roundsPlayed > 0
      ? (player.points / roundsPlayed).toFixed(1)
      : "-"

  return {
    ...player,
    avg
  }
})


if(loading){
  return 
  <div>Loading leaderboard...</div>
}




const seasonOrder = [
  "Queenstown Harbor(preseason)",
  "Broad Run",
  "Rock Manor",
  "Moccasin Run",
  "Mercer Oaks(West)",
  "The Architects",
  "Town & Country"
]

const events = seasonOrder

const thStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "13px",
  textTransform: "uppercase",
  color: "#666",
  letterSpacing: "0.5px",
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

const eventWinners: any = {}

events.forEach(event => {
  let lowest = Infinity
  let winner = null

  sortedLeaderboard.forEach((player: any ) => {
    const strokes = player.strokes?.[event]
    if (strokes && strokes < lowest) {
      lowest = strokes
      winner = player.player_id
    }
  })

  eventWinners[event] = winner
})

console.log(Array.from(new Set(rounds.map(r => r.course))))


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
      marginBottom: "20px"
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

        {/* ✅ HEADER ONLY */}
        <thead style={{
          position: "sticky",
          top: 0,
          background: "#f9fafb",
          zIndex: 1
        }}>
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

            {events.map((event) => (
              <th key={event} style={thStyle}>
                {event}
              </th>
            ))}

            <th style={thStyle}>Total</th>
            <th style={thStyle}>AVG</th>
          </tr>
        </thead>

        <tbody>
          {leaderboardWithAvg.map((player, i) => (
            <tr
              key={player.player_id}
              style={{
                background:
                  i === 0
                    ? "linear-gradient(90deg, #fff8e1, #ffffff)"
                    : i === 1
                    ? "#f1f5f9"
                    : i === 2
                    ? "#fef2f2"
                    : i % 2 === 0
                    ? "#fafafa"
                    : "white",
                fontWeight: i === 0 ? "700" : "normal",
                borderLeft: i === 0 ? "4px solid gold" : "none",
                transition: "0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#eef2ff"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  i % 2 === 0 ? "#fafafa" : "white"
              }}
            >

              {/* Rank */}
              <td style={tdCenter}>{i + 1}</td>

              {/* Player */}
              <td   style={{
                  ...tdLeft,
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 2
                }}>
                {i === 0 && "🥇 "}
                {i === 1 && "🥈 "}
                {i === 2 && "🥉 "}
                {player.player_name ?? "Player"}
              </td>

              {/* Events */}
              {events.map((event) => (
                <td
                  key={event}
                  style={{
                    ...tdCenter,
                    backgroundColor:
                      eventWinners[event] === player.player_id
                        ? "#dcfce7"   // 🟢 winner highlight
                        : "transparent"
                  }}
                >
                  {player.events?.[event] ? (
                  <div>
                    <div style={{ fontWeight: "600" }}>
                      {player.events[event]}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      ({player.strokes?.[event]})
                    </div>
                  </div>
                ) : "-"}
                </td>
              ))}

              {/* Total */}
              <td style={{
                ...tdCenter,
                fontWeight: "700",
                fontSize: "15px"
              }}>
                {player.points}
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