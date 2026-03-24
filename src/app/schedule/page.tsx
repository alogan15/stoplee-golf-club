"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"
import BackButton from "@/src/components/BackButton"


export default function Events(){

  const [schedule,setSchedule] = useState<any[]>([])

  const [loading,setLoading] = useState(true)
  const [winners, setWinners] = useState<any>({})

    useEffect(()=>{
    loadEvents()
  },[])


  async function loadEvents(){

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date",{ascending:true})


    if(error){
      console.error(error)
    } else {
      setSchedule(data)
    }

    setLoading(false)
  }



  if(loading){
    return <div>Loading events...</div>
  }

  function formatDate(date:string){
  return new Date(date + "T00:00:00").toLocaleDateString()
  }

  function isToday(date:string){

    const today = new Date().toDateString()
    const eventDate = new Date(date).toDateString()

    return today === eventDate
}

function formatThru(scores:number[]){

  const holesPlayed = scores.filter(score => score && score > 0).length

  if(holesPlayed === 18){
    return "F"
  }

  return `THRU ${holesPlayed}`
}


  const cardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  marginBottom: "16px",
  overflow: "hidden"
}

  return (
    <div style={{
      padding: "16px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>

      <BackButton />

    <div>

      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>League Schedule</h1>

      {schedule.map(event=>(
              <div 
        key={event.id} 
        style={cardStyle}
>

     <h4>{event.course}</h4>
      <p style={{ fontSize: "14px" }}>Location: {event.location}</p>
      <p style={{ fontSize: "14px" }}>{event.length} yards</p>
      <p style={{ fontSize: "14px" }}>{event.rating} Rating / {event.slope} Slope</p>
      {event.winner ? (
        <div style={{ marginTop: "8px", fontWeight: "bold" }}>
          🏆 {event.winner} — {event.winning_score}
        </div>
      ) : (
        <div style={{ marginTop: "8px", color: "gray" }}>
          No results yet
        </div>
      )}

        <p style={{ fontSize: "14px" }}>
        {formatDate(event.event_date)}
        </p>

        {isToday(event.event_date) && (
          <span style={{
            color:"white",
            background:"red",
            padding:"3px 6px",
            borderRadius:"4px",
            fontSize:"12px"
          }}>
          LIVE
          </span>
        )}

        <Link href={`/leaderboard/${event.id}`}>
          Live Leaderboard
        </Link>

        <br />

        <Link href={`/gameday/${event.id}`}>
          Enter Scores
        </Link>

        </div>
      ))}

    </div>
    </div>

  )

}