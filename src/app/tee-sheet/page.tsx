"use client"

import BackButton from "@/src/components/BackButton"

export default function TeeSheetPage() {

  const teeSheet = {
    event: "Mercer Oaks West Course",
    date: "June 20, 2026",
    price: "TBD",
    weather: "TBD",

    groups: [
      {
        time: "11:00",
        players: ["Andre", "Walt", "Keivon", "Rickey"]
      },
      {
        time: "11:10",
        players: ["Julian", "Jamar", "Eric B", "Short"]
      },
      {
        time: "11:20",
        players: ["Anthony", "Tyrin", "Steph", "LJ"]
      },
      {
        time: "11:30",
        players: ["Greg", "Isaiah", "Danny", "Jay"]
      },
      {
        time: "11:40",
        players: ["James", "Jay Simms", "Spurg", "Erik L"]
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
        🏌🏽 Juneteenth Classic
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