"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"
import { calculateRoundPoints } from "../../../lib/scoring"
import { useParams } from "next/navigation"
import Link from "next/link"


export default function EventPage() {

const params = useParams()
const eventId = String(params?.eventId || "")

const [rounds,setRounds] = useState<any[]>([])
const [loading,setLoading] = useState(true)



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

  return (
    <div style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto"
      }}>

    <div>




            <div style={{overflowX: "auto"}}>
            <div style={{marginBottom:"15px"}}>
            <h2 style={{margin:0, fontSize: "18px", fontWeight: "600", marginBottom: "10px"}}>Queenstown Harbor Golf Course</h2>
            <p style={{margin:5, fontSize: "14px"}}>March 22, 2026</p>
            </div>

      <div style={{ overflowX: "auto", paddingBottom: "8px" }}>

            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>View Live Leaderboard 🔴</h1>



            <table
              style={{
              borderCollapse:"collapse",
              width:"420px",
              fontFamily:"Arial",
              tableLayout:"fixed"
              }}
            >
            <thead>

            <tr style={{borderBottom:"2px solid black"}}>
            <th style={{width:"50px", textAlign:"center"}}>POS</th>
            <th style={{width:"150px", textAlign:"left"}}>PLAYER</th>
            <th style={{width:"80px", textAlign:"center"}}>PTS</th>
            <th style={{width:"80px", textAlign:"center"}}>THRU</th>
            </tr>
            </thead>
          

          <tbody>

          {sortedLeaderboard.map((player: any, i: number) => (
            <tr key={player.name}>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td style={{ textAlign: "left" }}>{player.name}</td>
              <td style={{ textAlign: "center" }}>{player.points}</td>
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
