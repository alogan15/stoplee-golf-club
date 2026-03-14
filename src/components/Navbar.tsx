import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid gray" }}>
      <h2>Stoplee Golf Club</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link href="/home">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/rounds">Rounds</Link>
      </div>
    </nav>
  )
}