"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
import PlayerSelector from "@/src/components/PlayerSelector"
import ResumeRound from "@/src/components/ResumeRound"
import SocialFooter from "@/src/components/Socials"
import { posts } from "@/src/data/posts"
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});



export default function Dashboard(){

const router = useRouter()

const [user, setUser] = useState<any | null>(null)
const [rounds,setRounds] = useState<any[]>([])
const [loading,setLoading] = useState(true)



    useEffect(()=>{

        async function loadDashboard(){

        const { data: userData } = await supabase.auth.getUser()

        if(!userData.user){
        router.push("/login")
        return
        }

        setUser(userData.user)

        const { data: roundsData } = await supabase
        .from("rounds")
        .select("*")
        .eq("player_id", userData.user.id)

        setRounds(roundsData || [])

        setLoading(false)

        }

        loadDashboard()

        },[])



                const roundsPlayed = rounds.length

                const totalPoints = rounds.reduce((sum,r)=> sum + (r.points || 0),0)

                const averageScore = roundsPlayed
                ? Math.round(rounds.reduce((sum,r)=> sum + (r.score || 0),0) / roundsPlayed)
                : 0

                const lastRound = rounds.length ? rounds[rounds.length - 1].score : "-"


                let birdies = 0
                let pars = 0
                let bogeys = 0

                rounds.forEach((round)=>{

                if(!round.scores) return

                round.scores.forEach((score:number,i:number)=>{

                const par = round.pars?.[i] || 4
                const diff = score - par

                if(diff === -1) birdies++
                if(diff === 0) pars++
                if(diff === 1) bogeys++

})

})

const latestPosts = posts.slice(0, 3)


    if(loading){
    return <div>Loading dashboard...</div>
    }

    return(

        <div style={{
            padding: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            fontFamily: "Inter, sans-serif"
            }}>
               

                {/* <PlayerSelector /> */}

            <div style={{padding:"20px"}}>

            {/* <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Player Profile</h1> */}
            {/* <h1 style={{ fontSize: "28px", fontWeight: "extra bold", marginBottom: "16px", letterSpacing: "-0.5px" }}> {user?.user_metadata?.name}'s Clubhouse</h1> */}
            {/* <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: "extra bold", marginBottom: "16px", letterSpacing: "-0.5px" }}> The Clubhouse</h1> */}




<div
  style={{
    textAlign: "center",
    marginBottom: "28px",
  }}
>
  <h1
    style={{
      fontSize: "40px",
      fontWeight: "800",
      marginBottom: "8px",
      padding: "10px",
      borderRadius: "24px",
      color: "#1f8f45",
      letterSpacing: "-1px",
    }}
  >
    The Clubhouse
  </h1>

  <p
    style={{
      color: "#6b7280",
      fontSize: "16px",
      margin: 0,
    }}
  >
    Your league. Your competition.
  </p>
  <div
  style={{
    background: "#f5f8f4",
    borderRadius: "20px",
    padding: "18px",
    marginTop: "28px",
    marginBottom: "22px",
    boxShadow: "0 12px 24px rgba(0,0,0,.08)",
    border: "1px solid #ecf0ec",
  }}
>
  <div
    style={{
      color: "#166534",
      fontWeight: "700",
      fontSize: "14px",
      marginBottom: "10px",
    }}
  >
    Upcoming Round
  </div>

<h2
  className={dancingScript.className}
  style={{
    margin: 0,
    fontSize: "32px",
    fontWeight: 400,
  }}
>
  🏆 Tour Championship 🏆
</h2>

  <p
    style={{
      margin: "8px 0",
      color: "#555",
    }}
  >
    📅 9/19/26
  </p>


  <p
    style={{
      marginBottom: "18px",
      color: "#555",
      fontWeight: "800",
    }}
  >
    📍Wyncote Golf Club
  </p>
      <p
    style={{
      margin: "8px 0",
      color: "#555",
    }}
  >
    👥 0 players confirmed
  </p>

  <button
    onClick={() => router.push("/tee-sheet")}
    style={{
      background: "#166534",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "999px",
      fontWeight: "700",
      cursor: "pointer",
    }}
  >
    View Tee Sheet →
  </button>
</div>
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    background: "linear-gradient(135deg,#166534,#22c55e)",
    padding: "12px",
    borderRadius: "20px",
    marginBottom: "30px",
  }}
>
                <ActionCard title="📣 League News" onClick={() => router.push("/home")} />
                <ActionCard title="🏆 Champions" onClick={() => router.push("/champions")} />
                <ActionCard title="🥇 Leaderboard" onClick={() => router.push("/leaderboard-simple")} />
                <ActionCard title="🔥 Power-Rankings" onClick={() => router.push("/power-rankings")} />
                {/* <ActionCard title="🏌🏽 Start Round" onClick={() => router.push("/gameday")} /> */}
                <ActionCard title="📍 Schedule" onClick={() => router.push("/courses")} />
                <ActionCard title="⛳ Tee Sheet" onClick={() => router.push("/tee-sheet")} />
                <ActionCard title="👑 Tour Winners" onClick={() => router.push("/winners")} />
                <ActionCard title="📊 2026 Stats" onClick={() => router.push("/records")} />
                <ActionCard title="👕 Merch" onClick={() => router.push("/merch")} />
                  <ActionCard title="📈 Prediction Center" onClick={() => router.push("/betting-lines")} />
                {/* <ActionCard title="📜 Rules" onClick={() => router.push("/rules")} /> */}
                {/* <ActionCard title="🤝 Sponsorship" onClick={() => router.push("/sponsors")} /> */}

</div>


</div>



    </div>
    <div
  style={{
    marginTop: "30px",
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    border: "1px solid #ecf0ec",
  }}
>
  <h2
    style={{
      color: "#166534",
      fontSize: "24px",
      fontWeight: "800",
      marginBottom: "20px",
    }}
  >
    📰 Latest News
  </h2>

  {latestPosts.map((post) => (
    <div
      key={post.id}
      onClick={() => router.push(`/news/${post.slug}`)}
      style={{
        padding: "16px 0",
        borderBottom: "1px solid #e5e7eb",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontWeight: "700",
          fontSize: "18px",
          marginBottom: "6px",
        }}
      >
        {post.title}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "14px",
          marginBottom: "6px",
        }}
      >
        {post.description}
      </div>

      <div
        style={{
          color: "#9ca3af",
          fontSize: "13px",
        }}
      >
        {post.date}
      </div>
    </div>
  ))}

  <div
    onClick={() => router.push("/home")}
    style={{
      marginTop: "18px",
      color: "#166534",
      fontWeight: "700",
      cursor: "pointer",
      textAlign: "right",
    }}
  >
    View All News →
  </div>
</div>
     <div>
     <SocialFooter />
     </div>
    </div>

)
}

function ActionCard({ title, onClick }: { title: string, onClick: () => void }) {
        return (
                <div
                onClick={onClick}
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    fontWeight: "bold"
                }}
                >
                {title}
                </div>
  )
}

function NewsItem({
  title,
  subtitle,
  time,
}: {
  title: string
  subtitle: string
  time: string
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "700",
            marginBottom: "4px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#9ca3af",
          whiteSpace: "nowrap",
          marginLeft: "12px",
        }}
      >
        {time}
      </div>
    </div>
  )
}

