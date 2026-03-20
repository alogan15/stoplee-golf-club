"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/dashboard")}
      style={{
        marginBottom: "20px",
        padding: "10px 16px",
        borderRadius: "10px",
        border: "none",
        background: "#f1f1f1",
        cursor: "pointer",
        fontWeight: "500",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      ← Back
    </button>
  )
}