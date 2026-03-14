"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"

export default function EventPage({ params }: any) {

  const eventId = params.eventId

  const [rounds,setRounds] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  async function loadRounds(){

    const { data, error } = await supabase
    .from("rounds")
    .select("*")
    .eq("event_id",eventId)

    if(error){
      console.error(error)
    }else{
      setRounds(data)
    }

    setLoading(false)
  }

  useEffect(()=>{

    loadRounds()

    const channel = supabase
    .channel("live-event")
    .on(
      "postgres_changes",
      { event:"*", schema:"public", table:"rounds" },
      () => loadRounds()
    )
    .subscribe()

    return ()=>{
      supabase.removeChannel(channel)
    }

  },[])

  if(loading){
    return <div>Loading event...</div>
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

      if(score === 1){
        total += 20
      }
      else if(diff >= 2){
        total += 14
      }
      else if(diff === 1){
        total += 5
      }
      else if(diff === 0){
        total += 3
      }
      else if(diff === -1){
        total += 1
      }

    })

    if(!leaderboard[player]){
      leaderboard[player] = 0
    }

    leaderboard[player] += total

  })

})

const sortedLeaderboard = Object.entries(leaderboard)
.sort((a:any,b:any)=>b[1]-a[1])

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

{sortedLeaderboard.map(([player,points]:any,i:number)=>(
<tr key={i}>
<td>{i+1}</td>
<td>{player}</td>
<td>{points}</td>
</tr>
))}

</tbody>

</table>

</div>
)
}