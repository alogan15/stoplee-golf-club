"use client"

import { useState } from "react"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"
import { allRecords } from "@/src/data/recordsData"

export default function RecordsPage() {

const [view, setView] = useState("2026 Season")

const courses = ["2026 Season", "Broad Run", "Rock Manor", "Mercer Oaks", "Moccasin Run", "The Architects", "Town & Country"]


  const records =
  view === "Season"
    ? allRecords
    : allRecords.filter(r => r.course === view)

  return (

    
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    }}>
      <BackButton />

      <select
        value={view}
        onChange={(e) => setView(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          fontSize: "15px",
          borderRadius: "100px",
          background: "#1e293b",
          color: "white",
          border: "none"
        }}
      >
        {courses.map(course => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>

      {/* Header */}
      <h1 style={{
        fontSize: "32px",
        fontWeight: "800",
        marginBottom: "8px",
        textAlign: "center"
      }}>
        🏆 SLGC 2026 Leaders
      </h1>



      <p style={{ opacity: 0.7, marginBottom: "24px", textAlign:"center"
      }}>
        {view === "Season"
          ? "Best performances across all courses"
          : `${view} Course Records`}
      </p>

      {/* Records Grid */}
      <div style={{
        display: "grid",
        gap: "12px"
      }}>
        {records.map((record, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "16px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}>

            <div>
              <div style={{ fontWeight: "600" }}>{record.label}</div>
              <div style={{ fontSize: "12px", opacity: 0.6 }}>
                {record.player}
              </div>
            </div>




            <div style={{
              fontSize: "20px",
              fontWeight: "700"
            }}>
              {record.value}
            </div>
          </div>
        ))}
      </div>
        <SocialFooter />
    </div>
  )
}