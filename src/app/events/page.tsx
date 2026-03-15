"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function Events(){

  const [events,setEvents] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  async function loadEvents(){

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date",{ascending:true})

    if(error){
      console.error(error)
    } else {
      setEvents(data)
    }

    setLoading(false)
  }

  useEffect(()=>{
    loadEvents()
  },[])

  if(loading){
    return <div>Loading events...</div>
  }

    function formatDate(date:string){

    const d = new Date(date)

    return d.toLocaleDateString("en-US",{
      weekday:"long",
      month:"short",
      day:"numeric"
    })

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

  return (

    <div>

      <h1>League Schedule</h1>

      {events.map(event=>(
              <div 
        key={event.id} 
        style={{
          border:"1px solid #ddd",
          borderRadius:"8px",
          padding:"15px",
          marginBottom:"15px",
          width:"350px"
        }}
>

        <h3>{event.course}</h3>

        <p>
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

          <Link href={`/events/${event.id}`}>
          View Event →
          </Link>

        </div>
      ))}

    </div>

  )

}