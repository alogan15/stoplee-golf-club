"use client"
import { useRouter } from "next/navigation"
import { title } from "process"

export default function CoursesPage() {
    const router = useRouter()

    

  const courses = [

    { 
      id: "broad-run",
      name: "Broad Run Golf Course", 
      image:"/courses/broadrun.jpg",
      title:"Twp Opener",
      location: "West Chester, PA",
    },
    { 
      id:"rock-manor",
      name: "Rock Manor Golf Course", 
      image:"/courses/therock.jpg",
      title:"Stoplee Classic",
      location: "Wilmington, DE",
    },
    { 
      id:"moccasin-run",
      name: "Moccasin Run Golf Club", 
      image:"/courses/moccasin.jpg",
      title: "La Fiesta",
      location: "Atglen, PA",
    },
      { 
      id:"mercer-oaks",
      name: "Mercer Oaks Golf Course", 
      image:"/courses/mercer.jpg",
      title:"Juneteenth Classic",
      location: "West Windsor Twp, NJ",
    },
      { 
      id:"the-architects",
      name: "The Architects Golf Club", 
      image:"/courses/architects.jpg",
      title:"Augusta in Augusta",
      location: "Stewartsville, NJ",
    },
      { 
      id:"town-country",
      name: "Town & Country Golf Links", 
      image:"/courses/town.jpg",
      title:"Tour Championship",
      location: "Woodstown, NJ",
    }
  ]

  return (
    
  <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
    
    {/* BACK BUTTON */}
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

    <h1 style={{ marginBottom: "20px", textAlign:"center" }}>🏌🏾 Schedule</h1>

    {courses.map((course) => (
      <div
        key={course.id}
        style={{
          marginBottom: "24px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          background: "#fff",
          cursor: "pointer"
        }}
        onClick={() => router.push(`/courses/${course.id}`)}
      >
        {/* IMAGE */}
        <div style={{ position: "relative" }}>
          <img
            src={course.image}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover"
            }}
          />

          {/* OVERLAY TITLE */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "12px",
              background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {course.name}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>{course.title}</h3>
          <p style={{ color: "#666" }}>{course.location}</p>

          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                color: "#1d4ed8",
                fontWeight: "600",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateX(4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateX(0)")
              }
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    ))}

  </div>
)
}