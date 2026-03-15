"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Champions(){

  const [champions,setChampions] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  async function loadChampions(){

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
    loadChampions()
  },[])

  if(loading){
    return <div>Loading champions...</div>
  }

  return(

    <div>

      <h1>The Champions Chamber</h1>

      {champions.map(champ =>(

        <div
          key={champ.id}
          style={{
            border:"1px solid #ddd",
            borderRadius:"10px",
            padding:"20px",
            marginBottom:"20px",
            width:"350px"
          }}
        >

          <h2>{champ.name}</h2>

          <p>Season: {champ.season}</p>

          <p>{champ.points} points</p>

        </div>

      ))}

    </div>

  )

}