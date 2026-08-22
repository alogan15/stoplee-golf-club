"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Bet = {
  player: string;
  pick: "OVER" | "UNDER";
  overUnder: number;
  line?: number;
  wager: number;
  result?: string;
};

type Ticket = {
  bets?: Bet[];

  totalWager?: number;
  balanceRemaining?: number;

  // Support alternate names that may exist
  // in the saved ticket.
  remainingBalance?: number;
  balanceAfterBets?: number;

  status?: string;

  event?: {
    course?: string;
    round?: number;
    location?: string;
  };

  createdAt?: string;
};

export default function BettingTicketPage() {
  const router = useRouter();

  const [ticket, setTicket] =
    useState<Ticket | null>(null);

  useEffect(() => {
    const savedTicket =
      localStorage.getItem(
        "stoplee_betting_ticket"
      );

    if (!savedTicket) {
      return;
    }

    try {
      const parsedTicket =
        JSON.parse(savedTicket);

      setTicket(parsedTicket);
    } catch (error) {
      console.error(
        "Unable to load betting ticket:",
        error
      );

      setTicket(null);
    }
  }, []);

  /*
   * -----------------------------------------
   * SAFE TICKET VALUES
   * -----------------------------------------
   */

  const bets = ticket?.bets ?? [];

  const totalWager =
    typeof ticket?.totalWager ===
    "number"
      ? ticket.totalWager
      : bets.reduce(
          (total, bet) =>
            total +
            (Number(bet.wager) || 0),
          0
        );

  const balanceRemaining =
    typeof ticket?.balanceRemaining ===
    "number"
      ? ticket.balanceRemaining
      : typeof ticket?.remainingBalance ===
        "number"
      ? ticket.remainingBalance
      : typeof ticket?.balanceAfterBets ===
        "number"
      ? ticket.balanceAfterBets
      : 0;

  const course =
    ticket?.event?.course ??
    "Architects Golf Club";

  const round =
    ticket?.event?.round ??
    5;

  const location =
    ticket?.event?.location ??
    "Stewartsville, NJ";

  const status =
    ticket?.status ??
    "LOCKED";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px",
        fontFamily:
          "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >
        {/* BACK BUTTON */}
        <button
          onClick={() =>
            router.push(
              "/betting-lines"
            )
          }
          style={{
            border: "none",
            background: "#ffffff",
            color: "#166534",
            fontWeight: "700",
            fontSize: "16px",
            padding:
              "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
            marginBottom: "30px",
          }}
        >
          ← Back to Prediction Center
        </button>

        {/* BET SLIP */}
        <div
          style={{
            background: "#ffffff",
            border:
              "2px solid #111827",
            borderRadius: "20px",
            padding: "24px",
            marginTop: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.10)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              textAlign: "center",
              paddingBottom: "18px",
              borderBottom:
                "2px dashed #d1d5db",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "1px",
                color: "#6b7280",
                marginBottom: "6px",
              }}
            >
              STOPLEE GOLF CLUB
            </div>

            <h1
              style={{
                margin:
                  "0 0 6px",
                fontSize: "28px",
                fontWeight: "900",
              }}
            >
              🎟️ Official Bet Slip
            </h1>

            <div
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {course}
              <br />

              Round {round} •{" "}
              {location}
            </div>

            <div
              style={{
                display:
                  "inline-block",
                marginTop: "12px",
                padding:
                  "7px 12px",
                borderRadius:
                  "999px",
                background:
                  "#dcfce7",
                color:
                  "#166534",
                fontSize: "12px",
                fontWeight:
                  "900",
              }}
            >
              🔒 {status} / FINAL
            </div>
          </div>

          {/* NO TICKET */}
          {!ticket ? (
            <div
              style={{
                textAlign:
                  "center",
                padding:
                  "30px 15px",
                color:
                  "#6b7280",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom:
                    "12px",
                }}
              >
                🎟️
              </div>

              <div
                style={{
                  fontWeight:
                    "800",
                  fontSize:
                    "18px",
                  marginBottom:
                    "6px",
                }}
              >
                No bet slip found
              </div>

              <div
                style={{
                  fontSize:
                    "14px",
                }}
              >
                Place your bets
                first to generate
                your bet slip.
              </div>
            </div>
          ) : bets.length === 0 ? (
            /* EMPTY BETS */
            <div
              style={{
                textAlign:
                  "center",
                padding:
                  "30px 15px",
                color:
                  "#6b7280",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom:
                    "12px",
                }}
              >
                🎟️
              </div>

              <div
                style={{
                  fontWeight:
                    "800",
                  fontSize:
                    "18px",
                  marginBottom:
                    "6px",
                }}
              >
                No bets found
              </div>

              <div
                style={{
                  fontSize:
                    "14px",
                }}
              >
                Place your bets
                first to generate
                your bet slip.
              </div>
            </div>
          ) : (
            <>
              {/* BETS */}
              <div>
                {bets.map(
                  (
                    bet,
                    index
                  ) => (
                    <div
                      key={`${bet.player}-${bet.pick}-${index}`}
                      style={{
                        padding:
                          "16px 0",
                        borderBottom:
                          "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          marginBottom:
                            "8px",
                        }}
                      >
                        <strong
                          style={{
                            fontSize:
                              "17px",
                          }}
                        >
                          {
                            bet.player
                          }
                        </strong>

                        <strong
                          style={{
                            fontSize:
                              "17px",
                          }}
                        >
                          $
                          {(
                            Number(
                              bet.wager
                            ) || 0
                          ).toFixed(
                            2
                          )}
                        </strong>
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          fontSize:
                            "14px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              bet.pick ===
                              "OVER"
                                ? "#991b1b"
                                : "#166534",
                            fontWeight:
                              "800",
                          }}
                        >
                        {bet.pick}{" "}
                        {bet.overUnder}
                        </span>

                        <span
                          style={{
                            color:
                              "#9ca3af",
                            fontWeight:
                              "700",
                          }}
                        >
                          Result:{" "}
                          {bet.result ??
                            "PENDING"}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* TOTALS */}
              <div
                style={{
                  marginTop:
                    "20px",
                  paddingTop:
                    "18px",
                  borderTop:
                    "2px solid #111827",
                }}
              >
                {/* TOTAL WAGERED */}
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "10px",
                  }}
                >
                  <span>
                    Total Wagered
                  </span>

                  <strong>
                    $
                    {totalWager.toFixed(
                      2
                    )}
                  </strong>
                </div>

                {/* BALANCE REMAINING */}
                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      "10px",
                  }}
                >
                  <span>
                    Balance Remaining
                  </span>

                  <strong
                    style={{
                      color:
                        "#166534",
                    }}
                  >
                    $
                    {Math.max(
                      0,
                      balanceRemaining
                    ).toFixed(
                      2
                    )}
                  </strong>
                </div>
              </div>

              {/* RESULTS */}
              <div
                style={{
                  background:
                    "#f3f4f6",
                  borderRadius:
                    "12px",
                  padding:
                    "13px",
                  marginTop:
                    "16px",
                  textAlign:
                    "center",
                  color:
                    "#6b7280",
                  fontSize:
                    "13px",
                  fontWeight:
                    "700",
                  lineHeight:
                    "1.5",
                }}
              >
                Results will appear
                here after Game Day
                is resolved.
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}