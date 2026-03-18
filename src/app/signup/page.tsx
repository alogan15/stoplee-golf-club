"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function SignupPageg(){

const router = useRouter()

const [name, setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const buttonStyle = {
  width: "50%",
  padding: "15px",
  borderRadius: "100px",
  border: "none",
  background: "#1d4ed8",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"
}

async function handleLogin(e:any){
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,        
        })

        if(error){
        setError(error.message)
        return
        }

        router.push("/")
}

async function handleSignup() {
  const { error } = await supabase.auth.signUp({
    email,
    password,
      options: {
    data: {
      name: name
    }
  }
  })

  if (error) {
    setError(error.message)
    return
  }

  alert("Account created! You can now log in.")
  router.push("/login")
}


return(

<div style={{
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  background: "#f5f5f5"
}}>
  <div style={{
    width: "100%",
    maxWidth: "400px",
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center"
  }}>

    {/* 🔥 YOUR IMAGE */}
    <img
      src="/logo.png" // <-- put your image in /public folder
      alt="Stoplee Golfer"
      style={{
        width: "100%",
        maxWidth: "200px",
        marginBottom: "20px"
      }}
    />

    {/* TITLE */}
    <h1 style={{
      fontSize: "22px",
      fontWeight: "bold",
       color: "black",
      marginBottom: "8px"
    }}>
      Become a Member of Stoplee Golf Club
    </h1>


    <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd"
    }}
    />


    {/* INPUTS */}
    <input
      type="email"
      placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}
    />

    <input
      type="password"
      placeholder="Password"
       value={password}
        onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}
    />

        {error && (
          <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

    {/* BUTTON */}
    <button 
    onClick={handleSignup}
    style={{
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "none",
      background: "#1d4ed8",
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer"
    }}>
      Submit
    </button>



    <p style={{
    fontSize: "12px",
    color: "#888",
    marginTop: "12px"
    }}>
    “Play like a champion.”
    </p>

  </div>
</div>

)

}