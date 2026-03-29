"use client"

export default function PlayersComingSoon() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      background: "#0f172a",
      color: "white"
    }}>

      <h1 style={{
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "12px"
      }}>
        🏌🏽 Players
      </h1>
      

      <p style={{
        fontSize: "18px",
        opacity: 0.7,
        marginBottom: "20px"
      }}>
        Coming Soon...
      </p>

      <div style={{
        fontSize: "14px",
        opacity: 0.5
      }}>
        Player profiles, stats, and rankings are on the way.
      </div>

    </div>
  )
}