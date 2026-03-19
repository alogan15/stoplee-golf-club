"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LiveRound(){

const [players,setPlayers] = useState(["Andre","Mike","Chris"])
const [pars] = useState([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4])

const [scores,setScores] = useState(
players.map(()=>Array(18).fill(""))
)

const buttonStyle = {
  width: "50%",
  padding: "15px",
  marginTop: "16px",
  borderRadius: "100px",
  border: "none",
  background: "#1d4ed8",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
}

function updateScore(player:number,hole:number,value:number){

const newScores = [...scores]

newScores[player][hole] = value

setScores(newScores)

}

async function saveLive(){

await supabase
.from("rounds")
.insert([{
course:"Live Round",
date:new Date(),
players,
scores,
pars
}])

}

return (

<div style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto"
        }}>


<div>

            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Live Round 🔴</h2>

            <div style={{ overflowX: "auto" }}>
            <table style={{minWidth: "500px", width: "100%"}} border={10}>

            <thead>
                <tr>
                <th>Player</th>
                {Array.from({length:18}).map((_,i)=>(
                <th key={i}>{i+1}</th>
                ))}
                </tr>
            </thead>

            <tbody>

                    {players.map((player,pIndex)=>(
                    <tr key={pIndex}>

                    <td>{player}</td>

                    {scores[pIndex].map((score,hole)=>(
                    <td key={hole}>

                    <input
                    type="number"
                    value={score}
                    onChange={(e)=>updateScore(pIndex,hole,Number(e.target.value))}
                    />

                    </td>
                    ))}

                    </tr>
            ))}

            </tbody>

            </table>
            </div>


                  <div style={{ position:"sticky",
                                bottom: 0,
                                background: "white",
                                paddingTop: "12px",
                                marginTop: "20px" }}>
                    <button style={buttonStyle} onClick={saveLive}>
                    Save Live Round 
                    </button>
                </div>

            </div>
            </div>

)
}