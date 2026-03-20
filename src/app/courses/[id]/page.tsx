"use client"

import { useParams, useRouter } from "next/navigation"

export default function CourseDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const courses: any = {
    "queenstown-harbor": {
      name: "Queenstown Harbor",
      location: "MD",
      image: "/queens.jpg",
      link: "https://qgolf.com/"
    },
    "broad-run": {
      name: "Broad Run",
      location: "PA",
      image: "/broadrun.jpg",
      link: "https://www.broadrungc.com/golf/tee-times"
    },
    "rock-manor": {
      name: "Rock Manor",
      location: "DE",
      image: "/therock.jpg",
      link: "https://www.rockmanorgolf.com/book-a-tee-time"
    },
    "moccasin-run": {
      name: "Moccasin Run",
      location: "PA",
      image: "/moccasin.jpg",
      link: "https://www.moccasinrun.com/golf/tee-times"
    },
    "mercer-oaks": {
      name: "Mercer Oaks",
      location: "NJ",
      image: "/mercer.jpg",
      link: "https://foreupsoftware.com/index.php/booking/20965/63187"
    },
    "architects": {
      name: "The Architects",
      location: "NJ",
      image: "/architects.jpg",
      link: "https://architectsgolf.totalintegrated.com/"
    }
  }

  const course = courses[id as string]

  if (!course) {
    return <div style={{ padding: "20px" }}>Course not found</div>
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          background: "#eee",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      {/* 🖼 IMAGE */}
      <img
        src={course.image}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />

      {/* 📍 INFO */}
      <h1 style={{ marginTop: "15px" }}>{course.name}</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        {course.location}
      </p>

      {/* ⛳ CTA BUTTON */}
      <a
        href={course.link}
        target="_blank"
        style={{
          display: "block",
          padding: "16px",
          background: "#2d6cdf",
          color: "white",
          textAlign: "center",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        ⛳ Book Tee Time
      </a>

    </div>
  )
}