"use client"

import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()
  
  return (



    <div style={{
      padding: "16px",
      maxWidth: "700px",
      margin: "0 auto"
    }}>


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
          src="blog/Logo.png"
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
    <div
      key={post.slug}
      onClick={() => router.push(`/news/${post.slug}`)}
      style={{
        background: "",
        padding: "16px",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={post.image}
        alt={post.title}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {post.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#555",
          marginTop: "6px",
          lineHeight: "1.5",
        }}
      >
        {post.description}
      </p>
    </div>
  ))}
</div>
      </div>
      

   
  )
}


const posts = [
  {
    slug: "season-recap-2025",
    title: "2025 Season Recap",
    image: "blog/group.png",
    description: "Last year wasn’t a season... it was a proving ground. In 2025, this tour became...",
    date: "Jan 22, 2026",
    readTime: "4 min read"
  },
  {
    slug: "rivalries-2026",
    title: "2026 Rivalry",
    image: "blog/rivalry.png",
    description: "Jamar vs. Andre Control vs. Pressure. Jay vs. Erik Consistency vs. Opportunity. Malcolm vs. Everyone Ceiling vs. Control",
    date: "Jan 22, 2026",
    readTime: "5 min read"
  },
  {
    slug: "jamar-threepeat",
    title: "Watch The Throne",
    image: "blog/Jamar2025.png",
    description: "The two-time champ isn’t chasing anymore — he’s the one being hunted.",
    date: "Jan 22, 2026",
    readTime: "4 min read"
  },
    {
    slug: "rookies-2025",
    title: "Rookie Class of 2025",
    image: "blog/rookies.png",
    description: "Rookie of the Year: Malcolm Total Points: 67 | Avg: 13 per round",
    date: "Jan 22, 2026",
    readTime: "3 min read"
  },
]