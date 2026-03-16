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

    <h1>🏆 Champions Chamber </h1>

    {champions.map((c,i)=>(
      <div key={c.id} style={{
        display:"flex",
        alignItems:"center",
        gap:"20px",
        border:"1px solid #ddd",
        padding:"12px",
        marginBottom:"12px",
        borderRadius:"6px"
      }}>

        <img
          src={c.image_url}
          alt={c.winner}
          style={{
            width:"300px",
            height:"300px",
            objectFit:"cover",
            borderRadius:"6px"
          }}
        />

        <div>
          <h3>{c.season} Champion</h3>
          <strong>{c.winner}</strong>
          <div>{c.points}</div>
        </div>

      </div>
    ))}

  </div>
)

}