"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"
import { calculateRoundPoints } from "../../../lib/scoring"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function EventPage() {

const params = useParams()
const eventId = String(params?.eventId || "")

const [rounds,setRounds] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const router = useRouter()



function getPlayerHole(scores:number[] | undefined){
 if(!scores) return 0

 let hole = 0

 scores.forEach(score=>{
  if(score && score > 0){
   hole++
  }
 })

 return hole
}
  async function loadRounds(){

    console.log("EVENT ID:", eventId)

    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      .eq("event_id", eventId)
console.log("LEADERBOARD DATA:", data)
console.log("FILTER CHECK:", data?.map(r => r.event_id))

    if(error){
      console.error(error)

    } else {
      setRounds(data)
    }

    setLoading(false)
  }

  useEffect(()=>{
    loadRounds()
      const channel = supabase
        .channel("event-live")
        .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rounds", filter: `event_id=eq.${eventId}` },
        payload => {
            loadRounds()
        }
        )
        .subscribe()

return ()=>{
  supabase.removeChannel(channel)
}
  },[])



  if(loading){
    return <div>Loading leaderboard...</div>
  }

const leaderboard: Record<string, any> = {}

rounds?.forEach((round) => {
  const playerId = round.player_id
  const name = round.player_name || playerId

  if (!round || !playerId) return

  const scores = (round.scores || []).map((s: any) => Number(s) || 0)
  const pars = (round.pars || []).map((p: any) => Number(p) || 0)

  const total = calculateRoundPoints(scores, pars)
  const hole = getPlayerHole(scores)

  if (!leaderboard[playerId]) {
    leaderboard[playerId] = {
      name,
      points: 0,
      hole: 0
    }
  }

  leaderboard[playerId].points += total
  leaderboard[playerId].hole = hole
})



    const sortedLeaderboard = Object.values(leaderboard)
      .sort((a: any, b: any) => b.points - a.points)

      const eventInfo = rounds?.[0]

  return (
    <div style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto"
      }}>

    <div>

      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "16px",
          padding: "8px 16px",
          borderRadius: "8px",
          background: "#f1f5f9",
          border: "none",
          cursor: "pointer"
        }}
      >
        ← Back to Scorecard
      </button>


             <div style={{overflowX: "auto"}}>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
                    {rounds.length === 0
                      ? "No course selected yet"
                      : eventInfo?.course}                  
                  </h2>

                  <p style={{ margin: 5, fontSize: "16px" }}>
                    {eventInfo?.date
                      ? new Date(eventInfo.date).toLocaleDateString()
                      : ""}
                  </p>

            <h1
              style={{
                fontSize: "26px",
                fontWeight: "700",
                marginBottom: "16px",
                textAlign: "center"
              }}
            >
              🔴 Live Leaderboard 
            </h1>
           
        <div
          style={{
            padding: "16px",
            maxWidth: "500px",
            margin: "0 auto",
            fontFamily: "Arial, sans-serif"
          }}
        >


          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <thead>

            <tr style={{borderBottom:"2px solid black", backgroundColor:"#f4f4f4"}}>
            <th style={{width:"50px", padding:"10px", textAlign:"center"}}>POS</th>
            <th style={{width:"150px", padding:"10px",textAlign:"left"}}>PLAYER</th>
            <th style={{width:"80px", padding:"10px", textAlign:"center"}}>PTS</th>
            <th style={{width:"80px", padding:"10px", textAlign:"center"}}>THRU</th>
            </tr>
            </thead>
          

          <tbody>

          {sortedLeaderboard.map((player: any, i: number) => (
            <tr key={player.name}
                style={{
                  backgroundColor:
                  i === 0 ? "#d4edda" : i % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  fontWeight: i === 0 ? "bold" : "normal"
                }}
            >
              <td style={{ textAlign: "center", padding: "10px" }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
              </td>
              <td style={{ textAlign: "left", padding:"10px" }}>{player.name}</td>
              <td style={{ textAlign: "center", padding:"10px" }}>{player.points}</td>
              <td style={{ textAlign: "center" }}>
                {player.hole === 18 ? "F" : `THRU ${player.hole}`}
              </td>
            </tr>
          ))}

          </tbody>

          </table>
        </div>

    </div>
</div>
</div>
  )

}
