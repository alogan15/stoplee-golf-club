"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { calculateRoundPoints } from "../../lib/scoring"

export default function RoundsPage() {

  const players = 4

  const [course,setCourse] = useState("")
  const [date,setDate] = useState("")

  const [pars,setPars] = useState(Array(18).fill(4))

  const [playerNames,setPlayerNames] = useState(
    Array(players).fill("")
  )

  const [scores,setScores] = useState(
    Array(players).fill(null).map(()=>Array(18).fill(""))
  )

  function sum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}



  async function saveRound(){

  const { data, error } = await supabase
    .from("rounds")
    .insert([
      {
        course,
        date,
        players: playerNames,
        scores,
        pars
      }
    ])

if(error){
  console.error(error)
  alert(error.message)
}
}



  return (

    <div>

      <h1>Stoplee League Scorecard</h1>

      <div>
        <input
          placeholder="Course"
          value={course}
          onChange={(e)=>setCourse(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />
      </div>

      <table border="1">

        <thead>

          <tr>
            <th>Hole</th>

            {[...Array(9)].map((_,i)=>(
              <th key={i}>{i+1}</th>
            ))}

            <th>OUT</th>

            {[...Array(9)].map((_,i)=>(
              <th key={i}>{i+10}</th>
            ))}

            <th>IN</th>
            <th>TOTAL</th>
            <th>STABLEFORD</th>
          </tr>

          <tr>

            <td>Par</td>

            {pars.slice(0,9).map((par,i)=>(
              <td key={i}>
                <input
                  type="number"
                  value={par}
                  onChange={(e)=>{
                    const p=[...pars]
                    p[i]=Number(e.target.value)
                    setPars(p)
                  }}
                  style={{width:"35px"}}
                />
              </td>
            ))}

            <td>{sum(pars.slice(0,9))}</td>

            {pars.slice(9).map((par,i)=>(
              <td key={i}>
                <input
                  type="number"
                  value={par}
                  onChange={(e)=>{
                    const p=[...pars]
                    p[i+9]=Number(e.target.value)
                    setPars(p)
                  }}
                  style={{width:"35px"}}
                />
              </td>
            ))}

            <td>{sum(pars.slice(9))}</td>
            <td>{sum(pars)}</td>
            <td></td>

          </tr>

        </thead>

        <tbody>

          {playerNames.map((name,playerIndex)=>{

            const playerScores = scores[playerIndex].map(s=>Number(s)||0)
            const front = sum(playerScores.slice(0,9))
            const back = sum(playerScores.slice(9))
            const total = sum(playerScores)
            const stableTotal = calculateRoundPoints(playerScores, pars)

            return(

              <tr key={playerIndex}>

                <td>
                  <input
                    placeholder="Player"
                    value={name}
                    onChange={(e)=>{
                      const n=[...playerNames]
                      n[playerIndex]=e.target.value
                      setPlayerNames(n)
                    }}
                  />
                </td>

                {playerScores.slice(0,9).map((score,i)=>(
                  <td key={i}>
                    <input
                      type="number"
                      value={scores[playerIndex][i]}
                      onChange={(e)=>{
                        const s=[...scores]
                        s[playerIndex][i]=e.target.value
                        setScores(s)
                      }}
                      style={{width:"35px"}}
                    />
                  </td>
                ))}

                <td>{front}</td>

                {playerScores.slice(9).map((score,i)=>(
                  <td key={i}>
                    <input
                      type="number"
                      value={scores[playerIndex][i+9]}
                      onChange={(e)=>{
                        const s=[...scores]
                        s[playerIndex][i+9]=e.target.value
                        setScores(s)
                      }}
                      style={{width:"35px"}}
                    />
                  </td>
                ))}

                <td>{back}</td>
                <td>{total}</td>
                <td>{stableTotal}</td>

              </tr>

            )

          })}

        </tbody>

      </table>

      <button onClick={saveRound}>Save Round</button>

    </div>

  )

}