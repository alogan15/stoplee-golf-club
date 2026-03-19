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
              style={{
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid #ddd",
                fontSize: "14px",
                fontWeight: "500",
                background: "#f1f5f9"
              }}
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
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid #ddd",
              fontSize: "14px",
              fontWeight: "500",
              background: "#f1f5f9"
            }}
          />
      </div>
      </div>

        <div 
        style={{
          overflowX: "auto",
          paddingBottom: "16px"
        }}>
          <div 
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
          }}>
          <table
            style={{
              width: "max-content",
              borderCollapse: "collapse",
              fontFamily: "Arial"
            }}
          >

        <thead>

          <tr style={{
            backgroundColor: "#f1f5f9",
            borderBottom: "2px solid #e5e7eb"
          }}>            
          <th style={{
            padding: "6px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#555"
          }}>Hole</th>

            {[...Array(9)].map((_,i)=>(
              <th key={i}>{i+1}</th>
            ))}

            <th style={{ borderRight: "2px solid #ccc" }}>OUT</th>

            {[...Array(9)].map((_,i)=>(
              <th key={i}>{i+10}</th>
            ))}

            <th style={{ minWidth: "60px" }}>IN</th>
            <th style={{ minWidth: "70px" }}>TOTAL</th>
            <th style={{ minWidth: "90px" }}>STABLEFORD</th>
          </tr>

          <tr>

            <td style={{ 
              padding:"4px", 
              fontSize: "20px",
              fontWeight: "600",
              textAlign:"center",
              color: "black"
            }}
              >Par</td>

            {pars.slice(0,9).map((par,i)=>(
              <td style={{ padding:"4px"}} 
              key={i}>
                <input
                  type="number"
                  value={par}
                  onChange={(e)=>{
                    const p=[...pars]
                    p[i]=Number(e.target.value)
                    setPars(p)
                  }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              textAlign: "center",
              fontSize: "16px",
              background: "#fafafa"
            }}
                />
              </td>
            ))}

            <td style={{ padding:"4px"}} >{sum(pars.slice(0,9))}</td>

            {pars.slice(9).map((par,i)=>(
              <td style={{ padding:"4px"}}  
              key={i}>
                <input
                  type="number"
                  value={par}
                  onChange={(e)=>{
                    const p=[...pars]
                    p[i+9]=Number(e.target.value)
                    setPars(p)
                  }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              textAlign: "center",
              fontSize: "16px",
              background: "#fafafa"
            }}
                />
              </td>
            ))}

            

            <td style={{ padding:"4px"}} >{sum(pars.slice(9))}</td>
            <td style={{ padding:"4px"}} >{sum(pars)}</td>
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
                <tr
                    key={playerIndex}
                    style={{
                      backgroundColor:
                        playerIndex % 2 === 0 ? "#ffffff" : "#f9f9f9"
                    }}
                  >

                <td style={{ padding:"4px"}} >
                  <input
                    placeholder="Player Name"
                    style={{
                    width: "120px",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontWeight: "500"
                    }}
                    value={name}
                    onChange={(e)=>{
                      const n=[...playerNames]
                      n[playerIndex]=e.target.value
                      setPlayerNames(n)
                    }}
                  />
                </td>

                {playerScores.slice(0,9).map((score,i)=>(
                  <td style={{ padding:"4px"}}  
                  key={i}>
                    <input
                      type="number"
                      value={scores[playerIndex][i] ?? ""}
                      onChange={(e)=>{
                      const s = [...scores]
                      s[playerIndex] = [...s[playerIndex]]
                      s[playerIndex][i] = e.target.value === "" ? "" : Number(e.target.value)
                      setScores(s)
                      }}
                      style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          fontSize: "16px",
                          background: "#fafafa"
                      }}                    />
                  </td>
                ))}

                  <td style={{
                    borderRight: "3px solid #ccc",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    textAlign: "center",
                    fontWeight: "600",
                    background: "#f8fafc"
                  }}>
                    {front}
                  </td>
                {playerScores.slice(9).map((score,i)=>(
                  <td style={{ padding:"4px"}}  
                  key={i}>
                    <input
                      type="number"
                      value={scores[playerIndex][i+9] ?? ""}
                      onChange={(e)=>{
                        const s=[...scores]
                        s[playerIndex] = [...s[playerIndex]]
                        s[playerIndex][i+9]=e.target.value === "" ? "" : Number(e.target.value)
                        setScores(s)
                      }}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          fontSize: "16px",
                          background: "#fafafa"
                        }}                    />
                  </td>
                ))}

<td style={{
  minWidth: "60px",
  textAlign: "center",
  fontSize: "16px"
}}>
  {back}
</td>
                    
<td style={{
  minWidth: "70px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16px"
}}>
  {total}
</td>

<td style={{
  minWidth: "90px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16px"
}}>
  {stableTotal}
</td>

              </tr>

            )

          })}

        </tbody>

      </table>
      </div>
      </div>

        <div style={{ 
              position: "sticky",
              bottom: 0,
              background: "#fff",
              padding: "12px",
              borderTop: "1px solid #eee" 
              }}>
            <button
              onClick={saveRound}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#1e7e34",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Save Round
            </button>

            <button
              onClick={() => window.location.href = `/leaderboard/${eventId}`}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                fontSize:"16px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "10px"
              }}
            >
              🔴 View Live Leaderboard
            </button>
      </div>

    </div>
    </div>

  )

}
