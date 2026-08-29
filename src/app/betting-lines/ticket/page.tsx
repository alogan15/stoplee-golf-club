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
  totalWagered?: number;
  balanceAfterBets?: number;

  // Support alternate balance name
  remainingBalance?: number;

  status?: string;

  event?: {
    course?: string;
    round?: number;
    location?: string;
  };

  createdAt?: string;
};

const TICKETS_KEY = "stoplee_betting_tickets";

export default function BettingTicketPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);

  /*
   * -----------------------------------------
   * LOAD ALL SAVED TICKETS
   * -----------------------------------------
   */

  useEffect(() => {
    try {
      const savedTickets =
        localStorage.getItem(TICKETS_KEY);

      if (!savedTickets) {
        setTickets([]);
        return;
      }

      const parsed = JSON.parse(savedTickets);

      /*
       * New format:
       * [
       *   { ...ticket },
       *   { ...ticket }
       * ]
       */
      if (Array.isArray(parsed)) {
        setTickets(parsed);
        return;
      }

      /*
       * Backward compatibility:
       *
       * If an older single-ticket object
       * is still in localStorage, show it.
       */
      if (
        parsed &&
        typeof parsed === "object"
      ) {
        setTickets([parsed]);
        return;
      }

      setTickets([]);
    } catch (error) {
      console.error(
        "Unable to load saved bet tickets:",
        error
      );

      setTickets([]);
    }
  }, []);

  /*
   * -----------------------------------------
   * PAGE
   * -----------------------------------------
   */

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >

        {/* -------------------------------- */}
        {/* BACK BUTTON */}
        {/* -------------------------------- */}

        <button
          onClick={() =>
            router.push("/betting-lines")
          }
          style={{
            border: "none",
            background: "#ffffff",
            color: "#166534",
            fontWeight: "700",
            fontSize: "16px",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
            marginBottom: "30px",
          }}
        >
          ← Back to Prediction Center
        </button>

        {/* -------------------------------- */}
        {/* PAGE TITLE */}
        {/* -------------------------------- */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              letterSpacing: "1px",
              color: "#6b7280",
            }}
          >
            STOPLEE GOLF CLUB
          </div>

          <h1
            style={{
              margin: "6px 0",
              fontSize: "28px",
              fontWeight: "900",
            }}
          >
            🎟️ My Bet Slips
          </h1>

          <div
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            {tickets.length}{" "}
            {tickets.length === 1
              ? "bet slip"
              : "bet slips"}
          </div>
        </div>

        {/* -------------------------------- */}
        {/* NO TICKETS */}
        {/* -------------------------------- */}

        {tickets.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border: "2px solid #111827",
              borderRadius: "20px",
              padding: "35px 20px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.10)",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "12px",
              }}
            >
              🎟️
            </div>

            <div
              style={{
                fontWeight: "800",
                fontSize: "18px",
                marginBottom: "6px",
              }}
            >
              No bet slips yet
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Place a bet to generate
              your first bet slip.
            </div>
          </div>
        ) : (

          /* -------------------------------- */
          /* ALL BET SLIPS */
          /* -------------------------------- */

          tickets
            .slice()
            .reverse()
            .map((ticket, index) => {

              const bets =
                ticket.bets ?? [];

              /*
               * --------------------------------
               * TOTAL WAGER
               * --------------------------------
               */

              const totalWager =
                typeof ticket.totalWagered ===
                "number"
                  ? ticket.totalWagered
                  : bets.reduce(
                      (total, bet) =>
                        total +
                        (Number(
                          bet.wager
                        ) || 0),
                      0
                    );

              /*
               * --------------------------------
               * BALANCE AFTER BET
               * --------------------------------
               */

              const balanceAfterBets =
                typeof ticket.balanceAfterBets ===
                "number"
                  ? ticket.balanceAfterBets
                  : typeof ticket.remainingBalance ===
                    "number"
                  ? ticket.remainingBalance
                  : 0;

              /*
               * --------------------------------
               * EVENT INFO
               * --------------------------------
               */

              const course =
                ticket.event?.course ??
                "Wyncote Golf Club";

              const round =
                ticket.event?.round ??
                5;

              const location =
                ticket.event?.location ??
                "Stewartsville, NJ";

              /*
               * --------------------------------
               * STATUS
               * --------------------------------
               */

              const status =
                ticket.status ??
                "LOCKED";

              return (
                <div
                  key={
                    ticket.createdAt ??
                    `ticket-${index}`
                  }
                  style={{
                    background: "#ffffff",
                    border:
                      "2px solid #111827",
                    borderRadius: "20px",
                    padding: "24px",
                    marginBottom: "25px",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.10)",
                  }}
                >

                  {/* ========================== */}
                  {/* TICKET HEADER */}
                  {/* ========================== */}

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

                    <h2
                      style={{
                        margin: "0 0 6px",
                        fontSize: "24px",
                        fontWeight: "900",
                      }}
                    >
                      🎟️ Official Bet Slip
                    </h2>

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

                    {/* STATUS BADGE */}

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
                        fontWeight: "900",
                      }}
                    >
                      🔒 {status}
                    </div>

                    {/* DATE */}

                    {ticket.createdAt && (
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "12px",
                          color: "#9ca3af",
                        }}
                      >
                        Placed{" "}
                        {new Date(
                          ticket.createdAt
                        ).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* ========================== */}
                  {/* BETS */}
                  {/* ========================== */}

                  {bets.length === 0 ? (
                    <div
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px",
                        color:
                          "#6b7280",
                      }}
                    >
                      No bets found.
                    </div>
                  ) : (
                    <div>
                      {bets.map(
                        (
                          bet,
                          betIndex
                        ) => (
                          <div
                            key={`${bet.player}-${bet.pick}-${betIndex}`}
                            style={{
                              padding:
                                "16px 0",
                              borderBottom:
                                "1px solid #e5e7eb",
                            }}
                          >

                            {/* PLAYER + WAGER */}

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

                            {/* PICK + LINE */}

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
                                {
                                  bet.pick
                                }{" "}
                                {
                                  bet.overUnder
                                }
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
                  )}

                  {/* ========================== */}
                  {/* TOTALS */}
                  {/* ========================== */}

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

                    {/* REMAINING BALANCE */}

                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
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
                          balanceAfterBets
                        ).toFixed(
                          2
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* ========================== */}
                  {/* RESULTS */}
                  {/* ========================== */}

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

                </div>
              );
            })
        )}

      </div>
    </main>
  );
}