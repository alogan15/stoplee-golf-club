"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import BackButton from "@/src/components/BackButton"

export default function SponsorsPage() {
  const [form, setForm] = useState({
  business: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  tier: ""
})

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: any) {

  e.preventDefault()

  const { error } = await supabase
    .from("sponsors")
    .insert([form])

  if (error) {
    console.error(error)
    alert("Something went wrong")
    return
  }

  alert("Request submitted! We’ll be in touch.")

  setForm({
    business: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    tier: ""
  })
}


  const cardStyle = (borderColor: string) => ({
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
  border: `2px solid ${borderColor}`
})

const listStyle = {
  marginTop: "10px",
  paddingLeft: "18px",
  color: "#cbd5f5",
  lineHeight: "1.6"
}

  return (
    <div style={{ background: "#0f172a", 
                  minHeight: "100vh", 
                  color: "white",       
                  padding: "16px",
                  maxWidth: "600px",
                  margin: "0 auto" 
                  }}>

      <BackButton />
      
      {/* HERO */}
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
          Sponsor the Stoplee Golf Club ⛳
        </h1>

        <p style={{ marginTop: "15px", color: "#cbd5f5", fontSize: "16px" }}>
          Connect with local golfers, grow your brand, and drive real customers 
          to your business every week.
        </p>

        <button
          onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            marginTop: "25px",
            padding: "14px 28px",
            background: "#22c55e",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Become a Sponsor
        </button>
      </div>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        {["20+ Players", "Monthly Events", "Local Audience"].map((stat, i) => (
          <div key={i} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{stat}</h2>
          </div>
        ))}
      </div>

      {/* BENEFITS */}
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>Why Sponsor?</h2>

        <div style={{ display: "grid", gap: "12px" }}>
          {[
            "Featured inside the app",
            "Seen on leaderboard & scorecards",
            "Promote deals to golfers",
            "Reach real local customers"
          ].map((item, i) => (
            <div key={i} style={{
              background: "#1e293b",
              padding: "14px",
              borderRadius: "10px"
            }}>
              ✔ {item}
            </div>
          ))}
        </div>
      </div>

      {/* TIERS */}
            <div style={{
            maxWidth: "900px",
            margin: "40px auto",
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px"
            }}>
            
            {/* GOLD */}
            <div style={cardStyle("#facc15")}>
                <h3 style={{ fontSize: "22px" }}>🥇 Gold</h3>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
                $100/mo
                </p>
                <ul style={listStyle}>
                <li>Top app placement</li>
                <li>Leaderboard visibility</li>
                <li>Weekly promotion</li>
                <li>Hole sponsorship</li>
                </ul>
            </div>

            {/* SILVER */}
            <div style={cardStyle("#94a3b8")}>
                <h3 style={{ fontSize: "22px" }}>🥈 Silver</h3>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
                $50/mo
                </p>
                <ul style={listStyle}>
                <li>Business listing</li>
                <li>Clickable profile</li>
                <li>App visibility</li>
                </ul>
            </div>

            {/* BRONZE */}
            <div style={cardStyle("#b45309")}>
                <h3 style={{ fontSize: "22px" }}>🥉 Bronze</h3>
                <p style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>
                $25/mo
                </p>
                <ul style={listStyle}>
                <li>Logo placement</li>
                <li>Basic exposure</li>
                </ul>
            </div>

            </div>

      {/* FORM */}
      <div id="form" style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Become a Sponsor</h2>

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          
          <input name="business" placeholder="Business Name" onChange={handleChange} required style={inputStyle}/>
          <input name="name" placeholder="Your Name" onChange={handleChange} required style={inputStyle}/>
          <input name="email" placeholder="Email" onChange={handleChange} required style={inputStyle}/>
          <input name="phone" placeholder="Phone" onChange={handleChange} style={inputStyle}/>

          <select
            name="tier"
            onChange={handleChange}
            style={inputStyle}
            >
            <option value="">Select Sponsorship Tier</option>
            <option value="Gold">$100/mo - Gold</option>
            <option value="Silver">$50/mo - Silver</option>
            <option value="Bronze">$25/mo - Bronze</option>
        </select>
          
          <textarea name="message" placeholder="Tell us about your business" onChange={handleChange} style={inputStyle}/>

          <button type="submit" style={{
            padding: "14px",
            background: "#22c55e",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            Submit Request
          </button>
        </form>
      </div>

    </div>
  )
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#1e293b",
  color: "white"
}