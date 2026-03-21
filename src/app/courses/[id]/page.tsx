"use client"

import { useParams, useRouter } from "next/navigation"

export default function CourseDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const courses: any = [
    {
      id: "queenstown-harbor",
      name: "Queenstown Harbor",
      location: "MD",
      image: "queens.jpg",
      link: "https://qgolf.com/"
    },
    {
      id: "broad-run",
      name: "Broad Run",
      location: "PA",
      image: "courses/broadrun.jpg",
      link: "https://www.broadrungc.com/golf/tee-times"
    },
    {
      id: "rock-manor",
      name: "Rock Manor",
      location: "DE",
      image: "courses/therock.jpg",
      link: "https://www.rockmanorgolf.com/book-a-tee-time"
    },
    {
      id: "moccasin-run",
      name: "Moccasin Run",
      location: "PA",
      image: "courses/moccasin.jpg",
      link: "https://www.moccasinrun.com/golf/tee-times"
    },
    {
      id: "mercer-oaks",
      name: "Mercer Oaks",
      location: "NJ",
      image: "courses/mercer.jpg",
      link: "https://foreupsoftware.com/index.php/booking/20965/63187"
    },
     {
      id: "architects",
      name: "The Architects",
      location: "NJ",
      image: "courses/architects.jpg",
      link: "https://architectsgolf.totalintegrated.com/"
    }
  ]

const course = courses.find(c => c.id === id)

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