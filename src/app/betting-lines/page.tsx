"use client";

import { useState } from "react";
import { bettingLines } from "@/src/data/bettingLines";
import { insights as bettingInsights } from "@/src/data/insights";
import BackButton from "@/src/components/BackButton";
import SocialFooter from "@/src/components/Socials";

export default function BettingLinesPage() {
  const [flight, setFlight] = useState<"A" | "B">("A");

  const players =
    flight === "A"
      ? bettingLines.flightA
      : bettingLines.flightB;

const selectedInsights =
  flight === "A"
    ? bettingInsights.A
    : bettingInsights.B; 

return (
  <div
    style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Inter, sans-serif",
      textAlign: "center",
    }}
  >

<div
  style={{
    textAlign: "left",
    marginBottom: "20px",
  }}
>
  <BackButton />
</div>


    {/* Header */}
    <div style={{ marginBottom: "30px" }}>
        
      <h1
        style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "#166534",
          marginBottom: "8px",
        }}
      >
        📈 Prediction Center
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "6px",
        }}
      >
        Architects Golf Club
      </p>

      <p
        style={{
          color: "#9ca3af",
          fontSize: "14px",
        }}
      >
        Round 5 • Stewartsville, NJ
      </p>
    </div>

    {/* Flight Toggle */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "30px",
      }}
    >
      <button
        onClick={() => setFlight("A")}
        style={{
          padding: "10px 22px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: "700",
          background: flight === "A" ? "#166534" : "#e5e7eb",
          color: flight === "A" ? "white" : "#374151",
        }}
      >
        Flight A
      </button>

      <button
        onClick={() => setFlight("B")}
        style={{
          padding: "10px 22px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: "700",
          background: flight === "B" ? "#166534" : "#e5e7eb",
          color: flight === "B" ? "white" : "#374151",
        }}
      >
        Flight B
      </button>
    </div>

    {/* League Insights */}
    <div style={{ textAlign: "left" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#166534",
          fontSize: "22px",
          fontWeight: "800",
          marginBottom: "16px",
        }}
      >
        📊 League Insights
      </h2>

      <div
        style={{
          display: "grid",
          gap: "14px",
        }}
      >
        {selectedInsights.map((insight) => (
          <div
            key={`${insight.title}-${insight.player}`}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "18px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 6px 18px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "24px" }}>
                {insight.icon}
              </span>

              <span
                style={{
                  fontWeight: "800",
                  fontSize: "17px",
                }}
              >
                {insight.title}
              </span>
            </div>

            <div
              style={{
                color: "#166534",
                fontWeight: "800",
                fontSize: "20px",
                marginBottom: "6px",
              }}
            >
              {insight.player}
            </div>

            <div
              style={{
                color: "#6b7280",
                lineHeight: "22px",
              }}
            >
              {insight.description}
            </div>
          </div>
        ))}
      </div>
    </div>
        {/* Player Cards */}
    <div
      style={{
        marginTop: "30px",
        textAlign: "left",
      }}
    >
      {players.map((player) => (
        <div
          key={player.player}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Player Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                }}
              >
                {player.player}
              </div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {flight === "A" ? "Flight A" : "Flight B"}
              </div>
            </div>

            {/* Pick */}
            <div
              style={{
                background:
                  player.pick === "OVER"
                    ? "#dc2626"
                    : "#166534",
                color: "white",
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: "700",
              }}
            >
              {player.pick}
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "6px",
                }}
              >
                Projected
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#166534",
                }}
              >
                {player.projected}
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "6px",
                }}
              >
                O / U
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#166534",
                }}
              >
                {player.overUnder}
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "6px",
                }}
              >
                Line
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#166534",
                }}
              >
                {player.line}
              </div>
            </div>
          </div>

          {/* Confidence */}
          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              Confidence
            </div>

            <div
              style={{
                fontSize: "22px",
              }}
            >
              {"⭐".repeat(player.confidence)}
            </div>
          </div>

          {/* Analysis */}
          <div
            style={{
              color: "#6b7280",
              lineHeight: "24px",
            }}
          >
            {player.note}
          </div>
        </div>
      ))}
    </div>
    <SocialFooter/>
  </div>
);
}