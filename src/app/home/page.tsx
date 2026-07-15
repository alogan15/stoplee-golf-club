"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"
import { posts } from "@/src/data/posts"

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


