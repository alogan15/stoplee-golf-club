"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Leaderboard() {

  const [rounds,setRounds] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  function getPlayerHole(scores:any[]){
  let hole = 0

  scores.forEach((score,i)=>{
    if(score !== "" && score !== null){
      hole = i + 1
    }
  })

  return hole
}

    function getCurrentHole(scores){
  let hole = 0

  scores.forEach(player=>{
    player.forEach((score,i)=>{
      if(score !== "" && i > hole){
        hole = i
      }
    })
  })

  return hole + 1
}

  async function loadRounds(){

    const { data, error } = await supabase
      .from("rounds")
      .select("*")
      .order("created_at",{ascending:false})

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
  .channel("rounds-live")
  .on(
    "postgres_changes",
    { event:"*", schema:"public", table:"rounds" },
    () => {
      loadRounds()
    }
  )
  .subscribe()

  return ()=>{
    supabase.removeChannel(channel)
  }

},[])

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
.sort((a:any,b:any)=>b[1].points - a[1].points)

if(loading){
  return <div>Loading leaderboard...</div>
}

return (

    <div>

      <h1>League Leaderboard</h1>

      <table border="10">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
            <th>Hole</th>
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