"use client"

import { useEffect, useState, use } from "react"
import { supabase } from "../../../lib/supabase"

export default function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
const { eventId } = use( params )

const [rounds,setRounds] = useState<any[]>([])
const [loading,setLoading] = useState(true)

function getPlayerHole(scores:number[]){
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
      .eq("event_id",eventId)

    if(error){
      console.error("Supabase error:", error)
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

  rounds.forEach(round=>{

    round.players.forEach((player:string,i:number)=>{

      const scores = round.scores[i]
      const pars = round.pars

      let total = 0

      scores.forEach((score:number,hole:number)=>{

        const par = pars[hole]
        const diff = par - score

        if(score === 1) total += 20
        else if(diff >= 2) total += 14
        else if(diff === 1) total += 5
        else if(diff === 0) total += 3
        else if(diff === -1) total += 1

      })

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

      <h1>Live Event Leaderboard</h1>

      <table border="1">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>

            {sortedLeaderboard.map(([player,data]:any,i:number)=>(
            <tr key={i}>
            <td>{i+1}</td>
            <td>{player}</td>
            <td>{data.points}</td>
            <td>{data.hole}</td>
            </tr>
            ))}

        </tbody>

      </table>

    </div>

  )

}