"use client"
import { useRouter } from "next/navigation"

export default function CoursesPage() {
    const router = useRouter()

    

  const courses = [
        { 
      id: "queenstown-harbor",
      name: "Queenstown Harbor Golf Course", 
      location: "Queenstown, MD",
      image:"/courses/queens.jpg",
      link: "https://qhgolf.com/"
    },
    { 
      id: "broad-run",
      name: "Broad Run Golf Course", 
      image:"/courses/broadrun.jpg",
      location: "West Chester, PA",
      link: "https://www.broadrungc.com/golf/tee-times"
    },
    { 
      id:"rock-manor",
      name: "Rock Manor Golf Course", 
      image:"/courses/therock.jpg",
      location: "Wilmington, DE",
      link: "https://www.rockmanorgolf.com/book-a-tee-time/"
    },
    { 
      id:"moccasin-run",
      name: "Moccasin Run Golf Club", 
      image:"/courses/moccasin.jpg",
      location: "Atglen, PA",
      link: "https://www.moccasinrun.com/golf/tee-times"
    },
      { 
      id:"mercer-oaks",
      name: "Mercer Oaks Golf Course", 
      image:"/courses/mercer.jpg",
      location: "West Windsor Twp, NJ",
      link: "https://foreupsoftware.com/index.php/booking/20965/6318?_gl=1*av9pvr*_gcl_au*MTQ3NTQxMzIwNy4xNzc0MDE0MzEx*_ga*NDc1MDcyMzM2LjE3NzQwMTQzMTE.*_ga_HQM4YYQE0J*czE3NzQwMTQzMTAkbzEkZzAkdDE3NzQwMTQzMTAkajYwJGwwJGgw&_ga=2.33499389.298083775.1774014311-475072336.1774014311#teetimes"
    },
      { 
      id:"the-architects",
      name: "The Architects Golf Club", 
      image:"/courses/architects.jpg",
      location: "Stewartsville, NJ",
      link: "https://architectsgolf.totaleintegrated.com/"
    },
      { 
      id:"town-country",
      name: "Town & Country Golf Links", 
      image:"/courses/town.jpg",
      location: "Woodstown, NJ",
      link: "https://foreupsoftware.com/index.php/booking/20899/6135#/teetimes"
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

    <h1 style={{ marginBottom: "20px" }}>🏌🏾 Courses</h1>

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
          {/* <h3 style={{ marginBottom: "5px" }}>{course.name}</h3> */}
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