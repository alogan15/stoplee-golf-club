import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", borderBottom: "1px solid gray" }}>
      <h2>Stoplee Golf Club</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/gameday">Game Day</Link>
        <Link href="/around-the-league">Around The League</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/events">Schedule</Link>
      </div>
    </nav>
  )
}