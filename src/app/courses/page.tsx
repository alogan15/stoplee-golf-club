"use client"
import { useRouter } from "next/navigation"

export default function CoursesPage() {
    const router = useRouter()

    

  const courses = [
        { 
            id: "queenstown-harbor",
      name: "Queenstown Harbor", 
      location: "MD",
      image:"courses/queens.jpg",
      link: "https://qhgolf.com/"
    },
    { 
        id: "broad-run",
      name: "Broad Run", 
      image:"courses/broadrun.jpg",
      location: "PA",
      link: "https://www.broadrungc.com/golf/tee-times"
    },
    { 
        id:"rock-manor",
      name: "Rock Manor", 
      image:"courses/therock.jpg",
      location: "DE",
      link: "https://www.rockmanorgolf.com/book-a-tee-time/"
    },
    { 
        id:"moccasin-run",
      name: "Moccasin Run", 
      image:"courses/moccasin.jpg",
      location: "PA",
      link: "https://www.moccasinrun.com/golf/tee-times"
    },
      { 
        id:"mercer-oaks",
      name: "Mercer Oaks", 
      image:"courses/mercer.jpg",
      location: "NJ",
      link: "https://foreupsoftware.com/index.php/booking/20965/6318?_gl=1*av9pvr*_gcl_au*MTQ3NTQxMzIwNy4xNzc0MDE0MzEx*_ga*NDc1MDcyMzM2LjE3NzQwMTQzMTE.*_ga_HQM4YYQE0J*czE3NzQwMTQzMTAkbzEkZzAkdDE3NzQwMTQzMTAkajYwJGwwJGgw&_ga=2.33499389.298083775.1774014311-475072336.1774014311#teetimes"
    },
      { 
        id:"the-architects",
      name: "The Architects", 
      image:"courses/architects.jpg",
      location: "NJ",
      link: "https://architectsgolf.totaleintegrated.com/"
    },
      { 
        id:"town-country",
      name: "Town & Country", 
      image:"courses/town.jpg",
      location: "NJ",
      link: "https://foreupsoftware.com/index.php/booking/20899/6135#/teetimes"
    }
  ]

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>

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
      <h1 style={{ marginBottom: "20px" }}>🏌🏽 Courses</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
        }}>

      {courses.map((course) => (
        <div
          key={course.id}
          onClick={() => router.push(`/courses/${course.id}`)}
          style={{
            background: "white",
            borderRadius: "16px",
            marginBottom: "20px",
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
          }}
        >
          {/* IMAGE */}
          <img
            src={course.image}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover"
            }}
          />

          {/* CONTENT */}
          <div style={{ padding: "15px" }}>
            <h3 style={{ marginBottom: "5px" }}>{course.name}</h3>
            <p style={{ color: "#666" }}>{course.location}</p>

            <div style={{ marginTop: "10px" }}>
              <span style={{
                fontSize: "12px",
                color: "#2d6cdf",
                fontWeight: "bold"
              }}>
                View Details →
              </span>
            </div>
          </div>
          
        </div>
      ))}
      </div>
    </div>
  )
}