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

  return (

    <div>

      <h1>League Schedule</h1>

      {events.map(event=>(
        <div key={event.id} style={{marginBottom:"20px"}}>

          <h3>{event.course}</h3>
          <p>{event.event_date}</p>

          <Link href={`/events/${event.id}`}>
            View Live Leaderboard
          </Link>

        </div>
      ))}

    </div>

  )

}