"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import { calculateRoundPoints } from "../../../lib/scoring"


export default function RoundsPage() {

  const players = 4

  const [course,setCourse] = useState("")
  const [courses,setCourses] = useState<any[]>([])
  const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
)
  const [pars, setPars] = useState(Array(18).fill(4))
  const params = useParams()
  const eventId = String(params?.eventId || "")

async function saveRound() {
  if (!eventId) {
    alert("No event selected")
    return
    
  }

const { data: userData } = await supabase.auth.getUser()

    if (!userData?.user) {
      alert("Not logged in")
      return
    }

    const name =
      userData.user.user_metadata?.name ||
      userData.user.email ||
      "Player"


  const rows = playerNames.map((playerName, i) => ({
      event_id: eventId,
      course,
      date,
      player_id: playerName || `player-${i}`, // temp ID
      player_name: playerName || `Player ${i + 1}`,
      scores: (scores[i] || []).map((s: any) => Number(s) || 0),      
      pars
}))
console.log("SCORES STATE:", scores)
console.log("ROWS BEING SAVED:", rows)

const { error } = await supabase.from("rounds")
.upsert(rows, {onConflict: "event_id, player_id"})

if (error) {
  console.error("SAVE ERROR:", error)
  alert(error.message)
} else {
  alert("Round saved")
}}

  const buttonStyle = {
  width: "50%",
  padding: "15px",
  borderRadius: "100px",
  marginTop: "16px",
  border: "none",
  background: "#1d4ed8",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
}


const router = useRouter()

useEffect(()=>{

async function checkUser(){

const { data } = await supabase.auth.getUser()

if (!data.user && eventId) {
router.push(`/leaderboard/${eventId}`)}

}

checkUser()

},[])



    useEffect(()=>{

    async function loadCourses(){

    const { data } = await supabase
      .from("courses")
      .select("*")
      setCourses(data || [])

      }

      loadCourses()

      },[])

      
    useEffect(()=>{

      if(!course) return

    async function loadCourse(){

    const { data } = await supabase
      .from("courses")
      .select("pars")
      .eq("name",course)
      .single()

      setPars(data?.pars || Array(18).fill(4))

      }

      loadCourse()

      },[course])

  const [playerNames,setPlayerNames] = useState(
    Array(players).fill("")
  )

  const [scores,setScores] = useState(
    Array(players).fill(null).map(()=>Array(18).fill(""))
  )


    function sum(arr:number[]){
        return arr.reduce((a,b)=>a+b,0)
    }


  return (

    <div style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto"
      }}>

    <div>

      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Stoplee League Scorecard</h1>

      <div style={{ overflowX: "auto"}}>

      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px"
        }}>
        <select
        value={course}
        onChange={(e)=>setCourse(e.target.value)}
        >

        <option value="">Select Course</option>

        {courses.map((c)=>(
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}

        </select>

        <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        style={{
        display: "flex",
        gap: "10px"
        }}
        />
      </div>
      </div>

        <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
            <table style={{ width: "100%" }} border={1}>

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

                const playerScores = (scores[playerIndex] || []).map(s => Number(s) || 0)
                const front = sum(playerScores.slice(0,9))
                const back = sum(playerScores.slice(9))
                const total = sum(playerScores)
                const stableTotal = calculateRoundPoints(playerScores, pars)

        return (
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
                      value={scores[playerIndex][i] ?? ""}
                      onChange={(e)=>{
                      const s = [...scores]
                      s[playerIndex] = [...s[playerIndex]]
                      s[playerIndex][i] = e.target.value === "" ? "" : Number(e.target.value)
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
                      value={scores[playerIndex][i+9] ?? ""}
                      onChange={(e)=>{
                        const s=[...scores]
                        s[playerIndex] = [...s[playerIndex]]
                        s[playerIndex][i+9]=e.target.value === "" ? "" : Number(e.target.value)
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
      </div>

        <div style={{ position:"sticky",
                                bottom: 0,
                                background: "white",
                                paddingTop: "12px",
                                marginTop: "20px" }}>
        <button style={buttonStyle} onClick={saveRound}>
          Save Round
        </button>
      </div>

    </div>
    </div>

  )

}
