"use client"

import BackButton from "@/src/components/BackButton"

export default function TeeSheetPage() {

  const teeSheet = {
    event: "Rock Manor Golf Course",
    date: "May 16, 2026",
    price: "$98",
    weather: "TBD",

    groups: [
      {
        time: "9:00 AM",
        players: ["Spurg", "Isaiah", "Ant", "Jamar"]
      },
      {
        time: "9:10 AM",
        players: ["Erik L", "Walt", "Danny", "Julian"]
      },
      {
        time: "9:20 AM",
        players: ["Andre", "Grecco", "Eric B", "Short"]
      },
      {
        time: "9:30 AM",
        players: ["Rickey", "Jay", "Tyrin", "Stephon"]
      },
      {
        time: "9:40 AM",
        players: ["LJ", "Mike P", "Cuffy", "Greg"]
      }
    ]
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>

      <BackButton />

      {/* HEADER */}
      <h1 style={{
        fontSize: "28px",
        fontWeight: "800",
        marginBottom: "10px",
        textAlign: "center"
      }}>
        🏌🏽 Stoplee Classic
      </h1>

      {/* EVENT CARD */}
      <div style={{
        background: "#1e293b",
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}>

        <div style={{ fontSize: "20px", fontWeight: "700" }}>
          {teeSheet.event}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "10px",
          fontSize: "14px",
          opacity: 0.8
        }}>
          <div>📅 {teeSheet.date}</div>
          <div>💵 {teeSheet.price}</div>
          <div>🌤️ {teeSheet.weather}</div>
          <div>⛳ Tee Times</div>
        </div>

      </div>

      {/* GROUPS */}
      <div style={{ display: "grid", gap: "12px" }}>
        {teeSheet.groups.map((group, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "14px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)"
          }}>

            <div style={{
              fontWeight: "700",
              marginBottom: "6px",
              fontSize: "16px"
            }}>
              ⏰ {group.time}
            </div>

            {group.players.map((player, idx) => (
              <div key={idx} style={{
                fontSize: "14px",
                padding: "2px 0",
                opacity: 0.9
              }}>
                {player}
              </div>
            ))}

          </div>
        ))}
      </div>

    </div>
  )
}