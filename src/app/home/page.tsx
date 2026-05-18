"use client"

import { useRouter } from "next/navigation"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"

export default function HomePage() {

  const router = useRouter()

  const styles = {
  text: {
    fontSize: "14px",
    color: "#555",
    marginTop: "6px",
    lineHeight: "1.5",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "10px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
  },
}


  
  return (



    <div style={{
      padding: "16px",
      maxWidth: "700px",
      margin: "0 auto"
    }}>

      <BackButton />


      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "10px"
        }}>
          League News
        </h1>

        <p style={{
          fontSize: "16px",
          color: "#555",
          lineHeight: "1.5"
        }}>
          Stay updated with the latest league news, matchups, and stories.
        </p>
      </div>

      {/* FEATURED CARD */}
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "24px"
      }}>

        <img
          src="/Logo.png"
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "12px"
          }}
        />

        <span style={{
          background: "#1d4ed8",
          color: "white",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px"
        }}>
          Featured
        </span>

        <h2 style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "12px"
        }}>
          Welcome to Stoplee Golf Club
        </h2>

        <p style={{
          fontSize: "14px",
          color: "#555",
          lineHeight: "1.6",
          marginTop: "8px"
        }}>
          Passion meets competition. Follow the journey, track the rivalries,
          and stay locked in with everything happening this season.
        </p>

      </div>

      {/* POSTS */}
 

<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

  {posts.map((post) => (
  <div key={post.id} 
        onClick={() => router.push(`/news/${post.slug}`)}
        style={styles.card}>
    
    <img src={post.image} alt={post.title} style={styles.image} />

    <h3 style={styles.title}>{post.title}</h3>

    <p style={styles.text}>{post.description}</p>

    <p style={{ ...styles.text, color: "#1d4ed8", cursor: "pointer" }}>
      {post.readMore}
    </p>

  </div>
))}
</div>
<SocialFooter/>
      </div>
      
  )
}


const posts = [
  {
    id: 1,
    slug: "baltimore-pressure",
    title: "Birthday, Battles and Baltimore Pressure",
    image: "/blog/Eric.JPEG",
    description: "Round 2 of the Stoplee Golf Club is officially in the books...",
    readMore: "Read More..."
  },
  {
    id: 2,
    slug: "power-rankings-in-motion",
    title: "Power Rankings In Motion",
    image: "/blog/Tyrin.png",
    description: "Newcomer Tyrin didn’t waste any time making his presence felt...",
    readMore: "Read More..."
  },
  {
    id: 3,
    slug: "twp-opener-recap",
    title: "Twp-Opener: Built From Loss. Driven By Brotherhood",
    image: "/blog/twp-opener.jpg",
    description: "That day wasn’t just golf; it was legacy. Stop, we think of you. And we’ll keep building—year after year.",
    readMore: "Read More..."
  },
  {
    id: 4,
    slug:"twp-opener",
    title:"2026 Twp Opener",
    image:"/blog/broadrun.jpg",
    description:"The StopLee Golf Club season kicks off April 18th at Broad Run Golfer’s Club...",
    readMore:"Read More..."
  },
  {
    id: 5,
    slug: "season-recap-2025",
    title: "2025 Season Recap",
    image: "/blog/group.png",
    description: "Last year wasn’t a season... it was a proving ground. In 2025, this tour became...",
    readMore:"Read More..."
  },
  {
    id: 6,
    slug: "rivalries-2026",
    title: "2026 Rivalry",
    image: "/blog/rivalry.png",
    description: "Jamar vs. Andre Control vs. Pressure. Jay vs. Erik Consistency vs. Opportunity. Malcolm vs. Everyone Ceiling vs. Control",
    readMore:"Read More..."

  },
  {
    id: 7,
    slug: "jamar-threepeat",
    title: "Watch The Throne",
    image: "/blog/Jamar2025.png",
    description: "The two-time champ isn’t chasing anymore — he’s the one being hunted.",
    readMore:"Read More..."

  },
    {
    id: 8,
    slug: "rookies-2025",
    title: "Rookie Class of 2025",
    image: "/blog/rookies.png",
    description: "Rookie of the Year: Malcolm Total Points: 67 | Avg: 13 per round",
    readMore:"Read More..."

  },
]