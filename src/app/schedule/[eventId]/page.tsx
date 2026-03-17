"use client"

import { useEffect, useState, use } from "react"
import { supabase } from "../../../lib/supabase"
import { calculateRoundPoints } from "../../../lib/scoring"

export default function EventPage({ params }: { params: Promise<{ eventId: string }> }) {

const { eventId } = use(params)
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

    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      .eq("event_id", String(eventId))

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
        { event: "*", schema: "public", table: "rounds" },
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

  const leaderboard:any = {}

rounds.forEach(round => {

  round.players.forEach((player:string,i:number)=>{

    const scores = round.scores[i]
    const pars = round.pars

    const total = calculateRoundPoints(scores, pars)

    if(!leaderboard[player]){
      leaderboard[player] = {
        points:0,
        hole:0
      }
    }

    leaderboard[player].points += total
    leaderboard[player].hole = getPlayerHole(scores)

  })

})

        const sortedLeaderboard = Object.entries(leaderboard)
        .sort((a:any,b:any)=>b[1].points-a[1].points)

  return (

    <div>

      <h1>Live Event Leaderboard 🔴</h1>

            <div style={{overflowX: "auto"}}>
            <div style={{marginBottom:"15px"}}>
            <h2 style={{margin:0}}>Broad Run Golf Course</h2>
            <p style={{margin:5}}>April 18, 2026</p>
            </div>

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

          {sortedLeaderboard.map(([player,data]:any,i:number)=>(

          <tr key={player} style={{borderBottom:"1px solid #ccc"}}>
          <td style={{textAlign:"center"}}>{i + 1}</td>
          <td style={{textAlign:"left"}}>{player}</td>
          <td style={{textAlign:"center"}}>{data.points}</td>
          <td style={{textAlign:"center"}}>{data.hole}</td>
          </tr>

          ))}

          </tbody>

          </table>

    </div>
</div>
  )

} 
