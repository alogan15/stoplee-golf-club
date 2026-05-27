"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"

export default function HomePage() {

  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState("All Posts")

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


const archiveOptions = [
  "All Posts",
  ...new Set(
    posts.map((post) => {
      const date = new Date(post.date)

      return date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    })
  ),
]

const filteredPosts =
  selectedMonth === "All Posts"
    ? posts
    : posts.filter((post) => {
        const date = new Date(post.date)

        const formatted = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })

        return formatted === selectedMonth
      })

  
  return (



    <div style={{
      padding: "16px",
      maxWidth: "700px",
      margin: "0 auto"
    }}>

      <BackButton />


      {/* HERO */}
{/* HERO */}
<div style={{ textAlign: "center", marginBottom: "24px" }}>
  
  <h1
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
    }}
  >
    League News
  </h1>

  <p
    style={{
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.5",
      marginBottom: "20px",
    }}
  >
    Stay updated with the latest league news, matchups, and stories.
  </p>

  {/* DROPDOWN ROW */}
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      style={{
        padding: "10px 16px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        background: "#fff",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        minWidth: "180px",
      }}
    >
      {archiveOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
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

  {filteredPosts.map((post) => (
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
    slug: "pregame-mercer",
    title: "Mercer Oaks West: Where Flights Will Be Decided",
    image: "/blog/mercerwest.jpg",
    date: "2026-05-27",
    description: "The Juneteenth Classic heads to Mercer Oaks Golf Course...",
    readMore: "Read More..."
  },
    {
    id: 2,
    slug: "legacy",
    title: "Legacy Built at The Rock",
    image: "/blog/RockGroup.JPEG",
    date: "2026-05-21",
    description: "New faces. People coming to honor you. Non-league guests stepping into...",
    readMore: "Read More..."
  },
  {
    id: 2,
    slug: "baltimore-pressure",
    title: "Birthday, Battles and Baltimore Pressure",
    image: "/blog/Eric.JPEG",
    date: "2026-05-19",
    description: "Round 2 of the Stoplee Golf Club is officially in the books...",
    readMore: "Read More..."
  },
  {
    id: 4,
    slug: "power-rankings-in-motion",
    title: "Power Rankings In Motion",
    image: "/blog/Tyrin.png",
    date: "2026-04-20",
    description: "Newcomer Tyrin didn’t waste any time making his presence felt...",
    readMore: "Read More..."
  },
  {
    id: 5,
    slug: "twp-opener-recap",
    title: "Twp-Opener: Built From Loss. Driven By Brotherhood",
    image: "/blog/twp-opener.jpg",
    date: "2026-04-19",
    description: "That day wasn’t just golf; it was legacy. Stop, we think of you. And we’ll keep building—year after year.",
    readMore: "Read More..."
  },
  {
    id: 6,
    slug:"twp-opener",
    title:"2026 Twp Opener",
    image:"/blog/broadrun.jpg",
    date: "2026-04-01",
    description:"The StopLee Golf Club season kicks off April 18th at Broad Run Golfer’s Club...",
    readMore:"Read More..."
  },
  {
    id: 7,
    slug: "season-recap-2025",
    title: "2025 Season Recap",
    image: "/blog/group.png",
    date: "2025-09-27",
    description: "Last year wasn’t a season... it was a proving ground. In 2025, this tour became...",
    readMore:"Read More..."
  },
  {
    id: 8,
    slug: "rivalries-2026",
    title: "2026 Rivalry",
    image: "/blog/rivalry.png",
    date: "2025-09-30",
    description: "Jamar vs. Andre Control vs. Pressure. Jay vs. Erik Consistency vs. Opportunity. Malcolm vs. Everyone Ceiling vs. Control",
    readMore:"Read More..."

  },
  {
    id: 9,
    slug: "jamar-threepeat",
    title: "Watch The Throne",
    image: "/blog/Jamar2025.png",
    date: "2025-10-07",
    description: "The two-time champ isn’t chasing anymore — he’s the one being hunted.",
    readMore:"Read More..."

  },
    {
    id: 10,
    slug: "rookies-2025",
    title: "Rookie Class of 2025",
    image: "/blog/rookies.png",
    date: "2025-10-16",
    description: "Rookie of the Year: Malcolm Total Points: 67 | Avg: 13 per round",
    readMore:"Read More..."

  },
]