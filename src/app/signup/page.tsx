"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function SignupPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [name,setName] = useState("")
const [error,setError] = useState("")

async function handleSignup(e:any){
e.preventDefault()

const { error } = await supabase.auth.signUp({
email,
password,
options:{
data:{
name:name
}
}
})

if(error){
setError(error.message)
return
}

router.push("/dashboard")
}

return(

<div style={{maxWidth:"400px",margin:"40px auto"}}>

<h1>Members Only</h1>

<form onSubmit={handleSignup}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{display:"block",marginBottom:"10px",width:"100%"}}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{display:"block",marginBottom:"10px",width:"100%"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{display:"block",marginBottom:"10px",width:"100%"}}
/>

<button type="submit">Create Account</button>

</form>

{error && <p style={{color:"red"}}>{error}</p>}

</div>

)

}