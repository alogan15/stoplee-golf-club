"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage(){

const router = useRouter()

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

async function handleLogin() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    setError("Invalid email or password")
    return
  }

  router.push("/welcome")
}

async function handleResetPassword() {
  if (!email) {
    alert("Enter your email first")
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/update-password"
  })

  if (error) {
    alert(error.message)
  } else {
    alert("Check your email for reset link")
  }
}

return(

<div style={{
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  background:"linear-gradient(180deg,#f8faf7,#eef7ef)"
}}>
  <div style={{
    width: "100%",
    maxWidth: "400px",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    textAlign: "center"
  }}>

    {/* 🔥 YOUR IMAGE */}
    <img
      src="Logo.png" // <-- put your image in /public folder
      alt="Stoplee Golfer"
      style={{
        width: "100%",
        maxWidth: "240px",
        marginBottom: "20px"
      }}
    />

    {/* TITLE */}
    <h1 style={{
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "8px"
    }}>
      Members Only
    </h1>

    {/* SUBTEXT */}
    <p style={{
      fontSize: "13px",
      color: "#666",
      marginBottom: "20px"
    }}>
      Welcome to Stoplee Golf Club
    </p>

    {/* INPUTS */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     style={{
        width: "90%",
        padding: "16px",
        fontSize: "16px",
        borderRadius: "12px",
        border: "1px solid #d9d9d9",
        outline: "none",
        marginBottom: "16px",
        color: "#222",
      }}
    />

    <input
      type="password"
      placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
     style={{
        width: "90%",
        padding: "16px",
        fontSize: "16px",
        borderRadius: "12px",
        border: "1px solid #d9d9d9",
        outline: "none",
        marginBottom: "16px",
        color: "#222",
      }}
    />

    <p 
        onClick={handleResetPassword}
        style={{
        fontSize: "12px",
        color: "#1d4ed8",
        textAlign: "right",
        marginBottom: "16px",
        cursor: "pointer"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
        Forgot password?
    </p>

        {error && (
      <p style={{ color: "red", marginBottom: "12px" }}>
        {error}
      </p>
    )}

    {/* BUTTON */}
    <button 
        onClick={handleLogin}
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
      Enter Clubhouse →
    </button>

    <p 
        onClick={() => router.push("/signup")}
        style={{
        fontSize: "13px",
        marginTop: "16px"
        }}>
        Don’t have an account?{" "}
        <span style={{ color: "#1d4ed8", cursor: "pointer", fontWeight: "600" 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
            Sign up
        </span>
    </p>

    <p style={{
    fontSize: "12px",
    color: "#888",
    marginTop: "12px"
    }}>
    Compete.
    Honor.
    Build Legacy.
    </p>

  </div>
</div>

)

}