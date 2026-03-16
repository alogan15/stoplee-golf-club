"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Champions(){

const [champions,setChampions] = useState<any[]>([])
const [loading,setLoading] = useState(true)
    

  async function loadTournaments(){

    const { data, error } = await supabase
    .from("champions")
    .select("*")
    .order("season",{ascending:false})

    if(error){
    console.error(error)
    }else{
    setChampions(data)
    }

    setLoading(false)

}

        useEffect(()=>{
        loadTournaments()
        },[])




  if(loading){
    return <div>Loading champions...</div>
}

return(
            <div>

            {champions.map((champ:any) => (

            <div key={champ.id} className="tournamentCard">

            <h3>{champ.season} Champion</h3>

            
            <h4>{champ.winner}</h4>

            <p>Total Points</p>
            <h4>{champ.points}</h4>

            </div>

            ))}

            </div>
            )

}