"use client"

import { useParams, useRouter } from "next/navigation"

export default function CourseDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const courses: any = [

    {
      id: "broad-run",
      name: "Broad Run Golf Course",
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public course that rewards smart decision-making and punishes careless swings.",
      price: "$129",
      yards: "6080",
      rating: "70.3",
      slope: "132",
      location: "West Chester, PA",
      image: "/courses/broadrun.jpg",
      description:"A Rees Jones Masterpiece best of chester county Broad Run Golfer's Club is located amidst the Amish Pennsylvania countryside. With an enormous 372 acre canvas, world-renowned golf course designer Rees Jones carefully sculpted this stunning masterpiece. Broad Run Golfer's Club offers premier playing conditions, tranquil beauty, and unsurpassed customer service. Stretching 6,751 yards with a par 72, the majestic layout takes full advantage of dramatic elevation changes and skillful design features, presenting a worthy challenge to golfers of all levels. As well as a beautifully maintained course, Broad Run also offers a full practice area, expert instructors for both group and individual lessons, and a clubhouse available year-round for private events. Open to the public, but offering membership plans & extensive benefits.",
      link: "https://www.broadrungc.com/golf/tee-times"
    },
    {
      id: "rock-manor",
      name: "Rock Manor Golf Course",
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public course built for competition with a layout that rewards accuracy and smart play.",
      price:"$98",
      yards: "5980",
      rating: "68.7",
      slope: "131",
      location: "Wilmington, DE",
      image: "/courses/therock.jpg",
      description: "Located in Wilmington, Delaware, our 18-hole redesigned and lengthened golf course, designed by renowned golf course architect Lester George, is considered a ‘must play’ in the greater Philadelphia area. Completely redesigned, Rock Manor has been lengthened from 5,779 yards to an 18-hole 6,405-yard championship design by renowned golf course architect Lester George. Additionally, the course boasts new tee boxes, greens, bunkers and fairways. A state-of-the-art irrigation system makes for top playing conditions all season long. Come play the voted “Best Public Course in Delaware” by Delaware Today. ",
      link: "https://www.rockmanorgolf.com/book-a-tee-time"
    },
    {
      id: "moccasin-run",
      name: "Moccasin Run Golf Club",
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public course with a precision-driven layout where every shot demands focus.",
      price:"$89",
      yards: "5876",
      rating: "67.8",
      slope: "119",
      location: "Atglen, PA",
      image: "/courses/moccasin.jpg",
      description: "Moccasin Run Golf Club, located in Atglen, PA is a peaceful escape into the countryside, providing the perfect retreat for a day of golf. This Chester County course is open to the public, known for pristine playing conditions, and named for the Shawnee and Nanticoke Indians who once occupied the area. Visit our million-dollar renovated clubhouse for dining, drinks, live entertainment, and a delicious menu of American-fare cuisine. We're your home away from home. Family-owned by Curt and Grace King, the 100-acre property is championship rated and treasured by lifelong players and visitors alike. Onsite, you'll find the King family working on the greens, advising golfers, and organizing activities in the clubhouse. Golf Pro Rodney King gives encouragement and guidance to improve your game. Reasonable prices, refreshments, and a challenging course will make this an experience you'll remember and crave often.",
      link: "https://www.moccasinrun.com/golf/tee-times"
    },
    {
      id: "mercer-oaks",
      name: "Mercer Oaks Golf Course",
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public course with tight fairways and strategic greens that test total control",
      price: "$75",
      yards: "5334",
      rating: "68.9",
      slope: "128",
      location: "West Windsor Twp, NJ",
      image: "/courses/mercer.jpg",
      description: "Mercer Oaks offers two championship courses at the West Windsor location both open year round (weather permitting). This site provides visitors with amenities second to none for a daily fee facility. Mercer Oaks West is an 18-hole championship golf course which was opened to the public in 1991. The course was built in a traditional style with tree lined fairways, ample bunkers, and challenging greens. The course is a part of the landscape of Mercer County Park and Lake Mercer. It has large greens and bunkers. Through strategic design and careful placement of bunkers and other hazards, the course provides a good test of golf. From the championship tees, the course measures over 7,000 yards with a par of 72. Although part of Mercer Oaks, the links-style East and traditional-style West offer two completely different course challenges for players of all levels. Mercer Oaks Golf Courses require that all golf carts be returned to the clubhouse by sunset each day.",
      link: "https://golfmercercounty.com/mercer-oaks/"
    },
     {
      id: "the-architects",
      name: "The Architects Golf Club",
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public but balanced course that challenges both power and accuracy.",
      price: "$140",
      yards: "5625",
      rating: "66.7",
      slope: "122",
      location: "Stewartsville, NJ",
      image: "/courses/architects.jpg",
      description: "Explore each of our course’s 18 holes and the legendary architects they pay homage to. Each hole reflects the philosophy, style, and influence of golf’s greatest designers — blending classic strategy with modern playability. From bold risk-reward layouts to subtle strategic nuances, every hole offers a unique challenge rooted in the traditions of the game.",
      link: "https://www.thearchitectsclub.com/"
    },
    { 
      id:"wyncote",
      name: "Wyncote Golf Club", 
      holes: 18,
      type: "Public Course",
      vibe: "18-hole public course designed to separate consistent players from the rest of the field.",
      price: "$123",
      yards: "6132",
      rating: "70.5",
      slope: "126",
      image:"/courses/wyncote.jpeg",
      description: "Prepare yourself for an unparalleled golfing experience. Our course is a pleasure for golfers of any skill Wyncote Golf Club offers a traditional links-style front nine featuring generous fairways and wide greens, and a more challenging back nine favoring accuracy and geared towards shot makers. All 18 holes are rye grass fairways and bent grass greens lined with deep rough and tall fescue. The links-style layout also invites the elements – wind, water and sand – to present occasional obstacles. Seven ponds and numerous bunkers are strategically placed throughout the course, providing both scenic splendor and considerable challenges.",
      location: "Oxford, Pa",
      link: "https://golfback.com/?utm_source=wyncote&utm_medium=website&utm_campaign=tee-times#/course/e2e234c1-6df5-4b65-9124-9efbc83dc145/date/2026-08-24"
    }
  ]

const course = courses.find((c: any) => c.id === id)

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
      <h1 style={{ marginTop: "15px", textAlign: "center"}}>{course.name}</h1>



        <div style={{
            display: "flex",
            gap: "16px",
            margin: "12px 0",
            fontSize: "14px",
            color: "#555"
          }}>
          </div>

          <p style={{ color: "#666", fontStyle: "italic" }}>
            {course.vibe}
          </p>

        <div style={{
          display: "flex",
          gap: "40px",
          margin: "12px 0",
          fontSize: "15px",
          color: "#555"
        }}>
          <span><strong>{course.price}</strong></span>
          <span><strong>{course.yards}</strong> yds</span>
          <span><strong>{course.rating}</strong> rtg</span>
          <span><strong>{course.slope}</strong> slp</span>
        </div>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        {course.location}
      </p>

      <p style={{ color: "black", marginBottom: "20px" }}>
        {course.description}
      </p>



      <h3 style={{ marginTop: "20px" }}>Why Play Here</h3>
        <ul style={{ paddingLeft: "16px", lineHeight: "1.6" }}>
          <li>Beautiful waterfront holes with strategic bunkering</li>
          <li>Perfect balance of challenge and playability</li>
          <li>Great for league play and competitive rounds</li>
        </ul>

      {/* ⛳ CTA BUTTON */}
      <a
        href={course.link}
        target="_blank"
        style={{
          display: "block",
          padding: "16px",
          background: "darkgreen",
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