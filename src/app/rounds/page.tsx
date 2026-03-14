"use client"

import { useState } from "react"

export default function RoundsPage() {

  const [scores, setScores] = useState(Array(18).fill(""))
  const [pars] = useState([
    4,4,3,5,4,4,3,4,5,
    4,3,4,4,5,3,4,4,5
  ])

  const handleScoreChange = (index:number, value:string) => {
    const newScores = [...scores]
    newScores[index] = value
    setScores(newScores)
  }

  const frontNine = scores.slice(0,9).reduce((a,b)=>a + Number(b||0),0)
  const backNine = scores.slice(9).reduce((a,b)=>a + Number(b||0),0)
  const total = frontNine + backNine

  const stableford = scores.map((score,index)=>{
    const s = Number(score)
    const par = pars[index]

    if(!s) return 0

    const diff = par - s

    if(diff === 0) return 3
    if(diff === 1) return 5
    if(diff === 2) return 14
    if(diff >= 3) return 20
    if(diff === -1) return 1

    return 0
  })

  const stablefordTotal = stableford.reduce((a,b)=>a+b,0)

  return (
    <div style={{padding:"20px"}}>

      <h1>Round Scorecard</h1>

      <table border={1} cellPadding={8}>

        <thead>
          <tr>
            <th>Hole</th>

            {Array.from({length:18},(_,i)=>(
              <th key={i}>{i+1}</th>
            ))}

            <th>OUT</th>
            <th>IN</th>
            <th>TOTAL</th>
          </tr>
        </thead>

        <tbody>

          {/* PAR ROW */}

          <tr>
            <td>Par</td>

            {pars.map((p,i)=>(
              <td key={i}>{p}</td>
            ))}

            <td></td>
            <td></td>
            <td></td>
          </tr>

          {/* SCORE ROW */}

          <tr>
            <td>Score</td>

            {scores.map((score,index)=>(
              <td key={index}>
                <input
                  type="number"
                  value={score}
                  style={{width:"40px"}}
                  onChange={(e)=>handleScoreChange(index,e.target.value)}
                />
              </td>
            ))}

            <td>{frontNine}</td>
            <td>{backNine}</td>
            <td>{total}</td>
          </tr>

          {/* STABLEFORD ROW */}

          <tr>
            <td>Stableford</td>

            {stableford.map((points,i)=>(
              <td key={i}>{points}</td>
            ))}

            <td></td>
            <td></td>
            <td>{stablefordTotal}</td>
          </tr>

        </tbody>

      </table>

    </div>
  )
}