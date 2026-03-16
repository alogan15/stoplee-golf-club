export default function DashboardPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Stoplee Golf Club Dashboard</h1>

      <h2>Player Stats</h2>

      <div>
        <p>Rounds Played: 12</p>
        <p>Average Score: 88</p>
        <p>Handicap: 14</p>
      </div>

      <h2>Recent Rounds</h2>

      <ul>
        <li>West Course — 90</li>
        <li>River Club — 85</li>
        <li>East Course — 89</li>
      </ul>
    </div>
  )
}