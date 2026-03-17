"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
import { calculateRoundPoints } from "../../lib/scoring"


export default function Leaderboard() {

  const [rounds,setRounds] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  const router = useRouter()

    useEffect(()=>{

    async function checkUser(){

    const { data } = await supabase.auth.getUser()

    if (!data.user) {
    router.push("/login")
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
    const total = calculateRoundPoints(scores, pars)

    if(!leaderboard[player]){
      leaderboard[player] = {
        points:0,
        hole:0,
        scores:[]
      }
    }

    leaderboard[player].points += total
    leaderboard[player].hole = getPlayerHole(scores)
    leaderboard[player].scores = scores

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

       <div style={{ overflowX: "auto"}}>

      <table style={{borderCollapse:"collapse", width:"420px"}}>

      <thead>
      <tr>
      <th style={{textAlign:"left"}}>Rank</th>
      <th style={{textAlign:"left"}}>Player</th>
      <th style={{textAlign:"left"}}>Points</th>
      </tr>
      </thead>

      <tbody>

      {sortedLeaderboard.map(([player,data]:any,i:number)=>(
      <tr key={i}>
      <td style={{padding:"6px"}}>{i+1}</td>
      <td style={{padding:"6px"}}>{player}</td>
      <td style={{padding:"6px"}}>{data.points}</td>
      </tr>
      ))}

      </tbody>

      </table>
      </div>

    </div>

  )
}