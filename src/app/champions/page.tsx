"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Champions(){

const [events,setEvents] = useState<any[]>([])
const [loading,setLoading] = useState(true)
    

  async function loadTournaments(){

    const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date",{ascending:true})

    if(error){
    console.error(error)
    }else{
    setEvents(data)
    }

    setLoading(false)

}

        useEffect(()=>{
        loadTournaments()
        },[])




  if(loading){
    return <div>Loading events...</div>
}

return(
            <div>

            {events.map((tournament:any) => (

            <div key={tournament.id} className="tournamentCard">

            <p>Tournament Name</p>
            <h3>{tournament.tournament_name}</h3>

            <p>Course Name</p>
            <h4>{tournament.course}</h4>

            <p>Location</p>
            <h4>{tournament.location}</h4>

            <p>Length</p>
            <h4>{tournament.length}</h4>

            <p>Rating/Slope</p>
            <h4>{tournament.rating} / {tournament.slope}</h4>

            <p>Date</p>
            <h4>{tournament.event_date}</h4>

            <p>Winner</p>
            <h4>{tournament.winner || "-"}</h4>

            <p>Points</p>
            <h4>{tournament.points}</h4>

            </div>

            ))}

            </div>
            )

}