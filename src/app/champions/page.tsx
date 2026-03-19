"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Champions(){

const [champions,setChampions] = useState<any[]>([])
const [loading,setLoading] = useState(true)

const cardStyle = {
  background: "white",
  padding: "14px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  marginBottom: "16px",
  overflow: "hidden"
}
    

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

  <div style={{
        padding: "16px",
        maxWidth: "300px",
        margin: "0 auto"
      }}>

  <div>

    <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>🏆 Champions Chamber 🏆 </h1>

    {champions.map((c,i)=>(
      <div key={c.id} style={cardStyle}>
        
        <img
          src={c.image_url}
          alt={c.winner}
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px"
          }}
        />

        <h3 style={{ margin: "0 0 6px 0" }}>
          {c.season} Champion
        </h3>

        <strong style={{ display: "block", marginBottom: "4px" }}>
          {c.winner}
        </strong>

        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          {c.points} pts
        </p>

      </div>
    ))}

  </div>
  </div>
)

}