"use client"

import { useRouter } from "next/navigation"

export default function ResumeRound() {
  const router = useRouter()

  function handleResumeRound() {
    const saved = localStorage.getItem("roundData")

    if (!saved) {
      alert("No active round found")
      return
    }

    try {
      const data = JSON.parse(saved)

      if (!data?.eventId) {
        alert("Invalid round data")
        return
      }

      router.push(`/gameday/${data.eventId}`)
    } catch {
      alert("Error loading round")
    }
  }

  return (
    <button
      onClick={handleResumeRound}
      style={{
        width: "100%",
        padding: "14px",
        marginTop: "16px",
        background: "#1d4ed8",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      ⛳ Resume Round
    </button>
  )
}