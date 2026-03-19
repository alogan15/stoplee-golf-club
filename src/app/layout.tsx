import Navbar from "../components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<body>

<div style={{
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "10px",
  borderBottom: "1px solid #ccc"
}}>

<img
  src="/Logo.png"
  alt="Stoplee Golf Club"
  style={{height:"40px"}}
/>

<h1 style={{margin:0, color: "darkgreen"}}>SLGC</h1>

<div style={{
  marginLeft:"20px",
  padding:"6px 12px",
  background:"#f9f9f9",
  border:"1px solid #ddd",
  borderRadius:"4px",
  fontStyle:"italic",
  color:"darkgreen"
}}>
In Memory of Eric “StopLee” Logan
</div>

</div>

<Navbar />

{children}

</body>
    </html>
  )
}