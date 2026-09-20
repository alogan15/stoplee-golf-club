"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import BackButton from "@/src/components/BackButton"

export default function Champions() {
  const [champions, setChampions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadTournaments() {
    const { data, error } = await supabase
      .from("champions")
      .select("*")
      .order("season", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setChampions(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    loadTournaments()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          color: "#166534",
          fontWeight: "700",
        }}
      >
        Loading champions...
      </div>
    )
  }

  const currentChampion = champions[0]
  const pastChampions = champions.slice(1)

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackButton />

      {/* ========================================= */}
      {/* CHAMPIONS CHAMBER HEADER */}
      {/* ========================================= */}

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "34px",
        }}
      >
        <div
          style={{
            fontSize: "44px",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          🏆
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(32px, 7vw, 44px)",
            fontWeight: "700",
            color: "#166534",
            letterSpacing: "1px",
          }}
        >
          Champions Chamber
        </h1>

        <p
          style={{
            margin: "10px 0 0",
            color: "#6b7280",
            fontSize: "15px",
            lineHeight: 1.5,
          }}
        >
          The names that made Stoplee Golf Club history.
        </p>

        <div
          style={{
            width: "100px",
            height: "2px",
            background: "#c9a227",
            margin: "18px auto 0",
          }}
        />
      </div>

      {/* ========================================= */}
      {/* CURRENT CHAMPION */}
      {/* ========================================= */}

      {currentChampion && (
        <section
          style={{
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#166534",
              fontWeight: "800",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            🏆 Reigning Champion
          </div>

          <div
            style={{
              background:
                "linear-gradient(145deg, #fffdf3 0%, #f7f8f4 100%)",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: "0 14px 35px rgba(0,0,0,.10)",
              border: "2px solid #c9a227",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Gold corner accents */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                fontSize: "20px",
              }}
            >
              ✦
            </div>

            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "20px",
              }}
            >
              ✦
            </div>

            <div
              style={{
                textAlign: "center",
                color: "#8a6a00",
                fontWeight: "800",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {currentChampion.season} Champion
            </div>

            <img
              src={currentChampion.image_url}
              alt={currentChampion.winner}
              style={{
                width: "100%",
                height: "auto",
                // objectFit: "cover",
                // objectPosition: "center 5%",
                borderRadius: "18px",
                display: "block",
                marginBottom: "20px",
              }}
            />

            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                🏆
              </div>

              <h2
                style={{
                  margin: "0 0 8px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(30px, 7vw, 40px)",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {currentChampion.winner}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {currentChampion.points} points
              </p>
            </div>

            <div
              style={{
                marginTop: "22px",
                paddingTop: "18px",
                borderTop: "1px solid #ded8bd",
                textAlign: "center",
                color: "#166534",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Stoplee Golf Club Champion
            </div>
          </div>
        </section>
      )}

      {/* ========================================= */}
      {/* CHAMPIONSHIP ROLL */}
      {/* ========================================= */}

      {pastChampions.length > 0 && (
        <section>
          <div
            style={{
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: "700",
                color: "#166534",
              }}
            >
              The Championship Roll
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Stoplee champions through the years
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {pastChampions.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "white",
                  borderRadius: "18px",
                  padding: "14px",
                  boxShadow: "0 5px 16px rgba(0,0,0,.07)",
                  border: "1px solid #ecf0ec",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    color: "#166534",
                    fontWeight: "800",
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  🏆 {c.season} Champion
                </div>

                <img
                  src={c.image_url}
                  alt={c.winner}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    display: "block",
                    marginBottom: "14px",
                  }}
                />

                <h3
                  style={{
                    margin: "0 0 6px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "23px",
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  {c.winner}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {c.points} points
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================= */}
      {/* LEGACY FOOTER */}
      {/* ========================================= */}

      <div
        style={{
          marginTop: "42px",
          marginBottom: "20px",
          padding: "26px 20px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #166534 0%, #1f8f45 100%)",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(22,101,52,.18)",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          🏆
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          The Stoplee Legacy
        </h3>

        <p
          style={{
            margin: "8px 0 0",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          More champions. More memories. More history to come.
        </p>
      </div>
    </div>
  )
}