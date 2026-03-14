"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function LiveRound(){

const [players,setPlayers] = useState(["Andre","Mike","Chris"])
const [pars] = useState([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4])

const [scores,setScores] = useState(
players.map(()=>Array(18).fill(""))
)

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

<div>

<h2>Live Round</h2>

<table border="10">

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

<button onClick={saveLive}>
Save Live Round
</button>

</div>

)
}