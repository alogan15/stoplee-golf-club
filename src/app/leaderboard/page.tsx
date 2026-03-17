"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "../../lib/supabase"
import { calculateRoundPoints } from "../../lib/scoring"


export default function Leaderboard() {

  const [rounds,setRounds] = useState<any[]>([])
  const [loading,setLoading] = useState(true)
  const searchParams = useSearchParams()
  const eventId = searchParams.get("eventId")



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
  .eq("event_id", eventId)
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


const leaderboard: any = {}

rounds.forEach((round) => {
  const playerId = round.player_id
  const playerName = round.player_name || playerId

  if (!playerId) return

const scores = (round.scores || []).map((s: any) => Number(s) || 0)
const pars = (round.pars || []).map((p: any) => Number(p) || 0)

  const total = calculateRoundPoints(scores, pars)

  if (!leaderboard[playerId]) {
    leaderboard[playerId] = {
      player_id: playerId,
      player_name: playerName,
      points: 0,
      hole: 0,
      scores: []
    }
  }

  leaderboard[playerId].points += total
  leaderboard[playerId].hole = getPlayerHole(scores)
  leaderboard[playerId].scores = scores
})


const sortedLeaderboard = Object.values(leaderboard)
  .sort((a: any, b: any) => b.points - a.points)

if(loading){
  return <div>Loading leaderboard...</div>
}

return (

  <div style={{
      padding: "16px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>

    <div>

      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>League Leaderboard</h1>

       <div style={{ overflowX: "auto", paddingBottom: "8px"}}>

      <table style={{borderCollapse:"collapse", minWidth: "300px", width:"100px"}}>

      <thead>
      <tr>
      <th style={{textAlign:"left", padding:"10px"}}>Rank</th>
      <th style={{textAlign:"left", padding:"10px"}}>Player</th>
      <th style={{textAlign:"left", padding:"10px"}}>Points</th>
      </tr>
      </thead>

      <tbody>

    {sortedLeaderboard.map((player: any, i: number) => (
      <tr key={player.player_id}>
        <td style={{ padding: "15px" }}>{i + 1}</td>
        <td style={{ padding:"10px" }}>{player.player_name || player.player_id}</td>
        <td style={{ padding: "10px" }}>{player.points}</td>
      </tr>
    ))}

      </tbody>

      </table>
      </div>

    </div>
    </div>

  )
}