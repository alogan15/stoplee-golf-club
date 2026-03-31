"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
import PlayerSelector from "@/src/components/PlayerSelector"
import ResumeRound from "@/src/components/ResumeRound"



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
            <h1 style={{ fontSize: "28px", fontWeight: "extra bold", marginBottom: "16px", letterSpacing: "-0.5px" }}> Clubhouse</h1>



            <div style={{marginTop:"20px"}}>

                <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "30px"
                }}>

                <ActionCard title="🏌🏽 Start Round" onClick={() => router.push("/gameday")} />
                <ActionCard title="🏆 Leaderboard" onClick={() => router.push("/leaderboard")} />
                <ActionCard title="📊 All-Time Leaders" onClick={() => router.push("/records")} />
                <ActionCard title="📍 Schedule" onClick={() => router.push("/courses")} />
                <ActionCard title="🎲 Odds" onClick={() => router.push("/odds")} />
                <ActionCard title="🔥 Power-Rankings" onClick={() => router.push("/power-rankings")} />
                <ActionCard title="🤝 Sponsorship" onClick={() => router.push("/sponsors")} />

                

                </div>
                

    </div>

    </div>
     <ResumeRound />
    </div>

)

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

}