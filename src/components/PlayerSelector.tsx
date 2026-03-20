"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function PlayerSelector() {
  const router = useRouter()
  const [selected, setSelected] = useState("")

  // ✅ STEP 1 LIVES RIGHT HERE
  const players = [
    { id: "andre", name: "Andre", avatar: "/players/andre.jpg"},
    { id: "jamar", name: "Jamar" },
    { id: "malcolm", name: "Malcolm" },
    { id: "erik", name: "Erik" },
    {id: "jay", name: "Jay"},
    {id: "keivon", name: "Keivon"},
    {id: "larry", name: "Larry"},
    {id: "james", name: "James"},
    {id: "spurg", name: "Spurg"},
    {id: "britt", name: "Britt"},
    {id: "greeco", name: "Greeco"},
    {id: "walt", name: "Walt"},
    {id: "steph", name: "Steph"},
    {id: "danny", name: "Danny"},
    {id: "julian", name: "Julian"},
    {id: "lj", name: "LJ"},
    {id: "greg", name: "Greg"},
    {id: "rickey", name: "Rickey"},
    {id: "short", name: "Short"},
    {id: "tyrin", name: "Tyrin"},
    {id: "ant", name: "Ant"}
  ]

  return (
    <div>
<div style={{ textAlign: "center", marginBottom: "30px" }}>
  
  
        <div style={{ marginBottom: "20px" }}>

            {selected && (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "10px"
            }}>
                <img
                src={players.find(p => p.id === selected)?.avatar}
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover"
                }}
                />
                <span style={{ fontWeight: "600" }}>
                {players.find(p => p.id === selected)?.name}
                </span>
            </div>
            )}

            <select
                value={selected}
                onChange={(e) => {
                const value = e.target.value
                setSelected(value)

                if (value) {
                    router.push(`/players/${value}`)
                }
                }}
                style={{
                width: "100%",
                maxWidth: "300px",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "white",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                cursor: "pointer"
                }}
            >
                <option value="">🏌🏽 Select Player</option>

                {players.map((player) => (
                <option key={player.id} value={player.id}>
                    {player.name}
                </option>
                ))}
            </select>
        </div>

</div>
    </div>
  )
}