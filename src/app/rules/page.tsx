"use client"

import BackButton from "@/src/components/BackButton"

export default function RulesPage() {
  return (
    <div style={{ padding: "16px", maxWidth: "700px", margin: "0 auto" }}>

        <BackButton />
      
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", color:"green", textAlign:"center" }}>
        SLGC Rules
      </h1>

      <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
        
        <ol style={{ paddingLeft: "20px" }}>
          <li><strong>$125 per player</strong> Paid out to the winner's at end of tour. Does not include green fees.</li>
          <li>Must play with at least one other league member to record scores.</li>
          <li>One stroke penalty if ball goes OB. Must drop.</li>
          <li><strong>Gimme rule:</strong> Shaft length of putter away from the hole (must be approved by group/partner).</li>
          <p>You must putt out if its for par or better.</p>
          <li>One mulligan on the front, one on the back (tee shots only).</li>
          <li>Max score per hole is <strong>double par</strong>.</li>
          <p>par 3, max is 6</p>
          <p>par 4, max is 8</p>
          <p>par 5, max is 10</p>
          <li>Must record scores in the Stoplee Golf App and they will be confirmed with 18 Birdies app.</li>
          <li style={{ color: "red", fontWeight: "bold" }}>
            You are responsible for your cartmate’s score. Confirm every shot before each hit. No counting shots after the hole is finished.
          </li>
          <li>Must mark your ball.</li>
          <li>Play from white tees.</li>
          <li>
            Compete monthly for a small trophy (PGA Tour style, stroke play). 
            Must play in group outing to qualify.
          </li>
        </ol>

        <p style={{ marginTop: "12px", fontStyle: "italic" }}>
          Tiebreakers: playoff hole match play or lowest stroke count on handicap 1 hole.
        </p>

        <p style={{ marginTop: "12px", fontWeight: "bold" }}>
          Most importantly, have fun. No one cares what you shoot.
        </p>

        <p style={{ marginTop: "4px" }}>
          Groups split after round 3 (July).
        </p>

      </div>

      {/* SCORING SECTION */}
      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>
          Scoring
        </h2>

        <div style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          {[
            { label: "Bogey", points: 1 },
            { label: "Par", points: 3 },
            { label: "Birdie", points: 5 },
            { label: "Eagle", points: 7 },
            { label: "Hole in One", points: 9 },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: i % 2 === 0 ? "#f9f9f9" : "#ffffff"
            }}>
              <span>{row.label}</span>
              <span style={{ fontWeight: "bold" }}>{row.points} pts</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}