"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "../../../lib/supabase"
import { calculateRoundPoints } from "../../../lib/scoring"


export default function RoundsPage() {

  const players = 4

  const [course,setCourse] = useState("")
  const [newCourseName, setNewCourseName] = useState("")
  const [currentHole, setCurrentHole] = useState(0)
  const [showCourseModal, setShowCourseModal] = useState(false)
    type Course = {
      name: string
      pars: number[]
    }

    const [courses, setCourses] = useState<Course[]>([])  
    const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
)
  const [pars, setPars] = useState(Array(18).fill(4))
  const params = useParams()
  const eventId = String(params?.eventId || "")

type Round = {
  id: string
  player_id: string
  player_name: string
  scores: number[]
  pars: number[]
  created_at?: string
}

const [liveRounds, setLiveRounds] = useState<Round[]>([])

function updatePar(index: number, value: string) {
  const newPars = [...pars]
  newPars[index] = Number(value)
  setPars(newPars)
}

function resetRound() {
  localStorage.removeItem("roundData")
  location.reload()
}

async function loadLiveRounds() {
  const { data, error } = await supabase
    .from("rounds")
    .select("*")
    .eq("event_id", eventId)

  if (error) {
    console.error(error)
  } else {
    setLiveRounds(data || [])
  }
}

useEffect(() => {
  if (!eventId) return

  loadLiveRounds()

  const channel = supabase
    .channel("live-rounds")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "rounds",
        filter: `event_id=eq.${eventId}`
      },
      () => {
        loadLiveRounds()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [eventId])

const leaderboard: any = {}

liveRounds.forEach((round) => {
  const playerId = `${round.player_id}-${(round as any).id}`
  const playerName = round.player_name

  if (!playerId) return

  const scores = (round.scores || []).map((s) => Number(s) || 0)
  const parsArr = (round.pars || []).map((p) => Number(p) || 0)

  const total = calculateRoundPoints(scores, parsArr)
  const strokeTotal = scores.reduce((sum: number, s: number) => sum + s, 0)

  // ✅ ensure player exists
  if (!leaderboard[playerId]) {
    leaderboard[playerId] = {
      player_id: playerId, // ✅ USE ROUND DATA
      player_name: playerName,
      points: 0,
      strokes: 0,
      scores: []
    }
  }

  // ✅ accumulate (THIS is what you were missing)
  leaderboard[playerId].points += total
  leaderboard[playerId].strokes = strokeTotal
  leaderboard[playerId].scores = scores
})

const sorted = Object.values(leaderboard)
  .sort((a: any, b: any) => b.points - a.points)

async function saveCourse() {
  if (!newCourseName.trim()) {
    alert("Enter a course name")
    return
  }


  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        name: newCourseName,
        pars
      }
    ])
    .select()


  if (error) {
    console.error("SUPABASE ERROR:", error)
    alert(error.message)
    return
  }

  if (!data || data.length === 0) {
    alert("No data returned")
    return
  }

  const newCourse = data[0]

  // ✅ update dropdown
  setCourses(prev => [...prev, newCourse])

  // ✅ auto select
  setCourse(newCourse.name)

  // ✅ clear input
  setNewCourseName("")

  // ✅ close modal
  setShowCourseModal(false)
}


useEffect(() => {
  async function loadSavedRound() {
    if (!eventId) return

    const { data } = await supabase
      .from("rounds")
      .select("*")
      .eq("event_id", eventId)

    if (!data || data.length === 0) return

    // 🧠 restore players + scores
    const names = data.map(r => r.player_name)
    const scoresArr = data.map(r => r.scores)

    setPlayerNames(names)
    setScores(scoresArr)

    // OPTIONAL (if you want course restored too)
    if (data[0]?.course) {
      setCourse(data[0].course)
    }
  }

  loadSavedRound()
}, [eventId])

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
  player_id: `${eventId}-${userData.user.id}-${i}`,
  player_name: playerName || `Player ${i + 1}`,
  scores: (scores[i] || []).map((s: any) => Number(s) || 0),
  pars
}))


const { error } = await supabase.from("rounds")
.upsert(rows, {onConflict: "event_id, player_id"})


if (error) {
  console.error("SAVE ERROR:", error)
  alert(error.message)
} else {
  alert("Round saved")

  // ✅ SAVE ACTIVE ROUND
localStorage.setItem("roundData", JSON.stringify({
  eventId,
  course,
  pars,
  scores,
  playerNames
}))
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

      
useEffect(() => {
  if (!course) return

  const saved = localStorage.getItem("roundData")

  if (saved) {
    const data = JSON.parse(saved)

    // 🛑 STOP if we already have pars for this event
    if (data?.eventId === eventId && data?.pars) return
  }

  async function loadCourse(){
    const { data } = await supabase
      .from("courses")
      .select("pars")
      .eq("name", course)
      .single()

    setPars(data?.pars || Array(18).fill(4))
  }

  loadCourse()
}, [course, eventId])

  const [playerNames,setPlayerNames] = useState(
    Array(players).fill("")
  )

  const [scores,setScores] = useState(
    Array(players).fill(null).map(()=>Array(18).fill(""))
  )

useEffect(() => {
  if (!eventId) return

  // 🛑 DON'T SAVE EMPTY / DEFAULT STATE
  const isEmptyScores = scores.every(player =>
    player.every(score => score === "" || score === null)
  )

  const isDefaultPars = pars.every(p => p === 4)

  if (isEmptyScores && isDefaultPars) return

  const data = {
    eventId,
    course,
    pars,
    scores,
    playerNames
  }

  localStorage.setItem("roundData", JSON.stringify(data))
}, [eventId, course, pars, scores, playerNames])



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
                onChange={(e) => {
                  const value = e.target.value

                  if (value === "__new__") {
                    setShowCourseModal(true)
                    return
                  }

                  setCourse(value)
                }}             
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
          <option value="__new__">+ Add New Course</option>

                {courses.map((c)=>(
                <option key={c.name} value={c.name}>
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
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gap: "8px",
    marginBottom: "16px"
  }}
>

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
              position: "sticky",
              left: 0,
              zIndex: 3,
              background: "#f1f5f9",
              padding: "6px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#555"
            }}>
              Hole
            </th>

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
              position: "sticky",
              left: 0,
              zIndex: 2,
              background: "#fff",
              padding: "4px",
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
              color: "black"
            }}>
              Par
            </td>

            {pars.slice(0,9).map((par,i)=>(
              <td style={{  padding: "4px",
                            background: currentHole === i ? "#e6f4ea" : undefined
                          }} 
              key={i}>
                <input
                  type="number"
                  value={par}
                  onFocus={() => setCurrentHole(i)}
                  onChange={(e) => {
                    const p = [...pars]
                    p[i] = Number(e.target.value)
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
              <td style={{ padding: "4px",
                          background: currentHole === i + 9 ? "#e6f4ea" : undefined
                        }}  
              key={i}>
                <input
                  type="number"
                  value={par}
                  onFocus={() => setCurrentHole(i + 9)}
                  onChange={(e) => {
                    const p = [...pars]
                    p[i] = Number(e.target.value)
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
                      background:
                        playerIndex % 2 === 0 ? "#ffffff" : "#f9f9f9"
                    }}
                  >

              <td style={{
                position: "sticky",
                left: 0,
                zIndex: 0,
                background: playerIndex % 2 === 0 ? "#ffffff" : "#f9f9f9",
                padding: "4px",
                boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
                width: "140px",        
                minWidth: "140px"      
              }}>
                <input
                  placeholder="Player Name"
                    style={{
                    width: "70%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "3px 0 8px rgba(0,0,0,0.08)"
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
                  <td style={{ padding:"4px" ,
                              background: currentHole === i ? "#e6f4ea" : undefined
                  }}  
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
                  <td style={{ padding:"4px",
                                background: currentHole === i ? "#e6f4ea" : undefined
                  }}  
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
              borderTop: "1px solid #eee",
              zIndex: 10, // ✅ ADD THIS
              boxShadow: "0 -4px 10px rgba(0,0,0,0.08)" // optional 🔥
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

            {showCourseModal && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      width: "90%",
      maxWidth: "400px"
    }}>
      <h3 style={{ marginBottom: "12px" }}>Add New Course</h3>

      <input
        type="text"
        placeholder="Course name"
        value={newCourseName}
        onChange={(e) => setNewCourseName(e.target.value)}
        style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
            marginBottom: "16px",
            boxSizing: "border-box" // ✅ THIS IS THE KEY FIX
        }}
      />

      <div style={{ padding: "0 16px" }}>
        <button
          onClick={saveCourse}
          style={{
            width: "100%",
            padding: "14px",
            background: "#1d8e43",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Save Course
        </button>
      </div>

      <button
        onClick={() => setShowCourseModal(false)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          background: "transparent",
          border: "none",
          color: "#666"
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}

            <button
              onClick={() => {
                if (confirm("Reset round? This will erase all scores.")) {
                  localStorage.removeItem("roundData")
                  location.reload()
                }
              }}
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "8px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Reset Round
            </button>
      </div>

    </div>
    </div>
    

  )

}
