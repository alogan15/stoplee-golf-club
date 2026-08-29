"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"
import { bettingLines } from "@/src/data/bettingLines"

type Player = {
  player: string
  projected: number
  overUnder: number
  pick: string
  line: string
  confidence: number
  note: string
}

type BetSelection = {
  player: string
  projected: number
  overUnder: number
  pick: "OVER" | "UNDER"
  line: string
  confidence: number
  note: string
  wager: number
}

type SavedTicket = {
  round: number
  flight: "A" | "B"
  bets: BetSelection[]
  totalWagered: number
  balanceAfterBets: number
  createdAt: string
  locked: boolean
}

const BALANCE_KEY = "stoplee_balance"
const TICKETS_KEY = "stoplee_betting_tickets"

const ROUND = 6

function StatCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: "14px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "800",
          color: "#166534",
        }}
      >
        {value}
      </div>
    </div>
  )
}

export default function BettingLinesClient() {
  const router = useRouter()

  const [flight, setFlight] =
    useState<"A" | "B">("A")

  const [balance, setBalance] =
    useState<number>(50)

  const [selections, setSelections] =
    useState<
      Record<string, "OVER" | "UNDER">
    >({})

  const [wagers, setWagers] =
    useState<Record<string, number>>({})

  const [isLoaded, setIsLoaded] =
    useState(false)

  const [lastPlacedTicket, setLastPlacedTicket] =
    useState<SavedTicket | null>(null)

  const [wagerErrors, setWagerErrors] =
    useState<Record<string, string>>({})

  const players: Player[] =
    flight === "A"
      ? bettingLines.flightA
      : bettingLines.flightB

  /*
   * -----------------------------------------
   * LOAD BALANCE
   * -----------------------------------------
   *
   * We DO NOT load an old ticket here.
   *
   * A confirmed ticket is locked forever,
   * but the user must still be able to create
   * another ticket.
   */

  useEffect(() => {
    try {
      const savedBalance =
        localStorage.getItem(
          BALANCE_KEY
        )

      if (savedBalance !== null) {
        const parsedBalance =
          Number(savedBalance)

        if (
          Number.isFinite(
            parsedBalance
          ) &&
          parsedBalance >= 0
        ) {
          setBalance(
            parsedBalance
          )
        }
      }
    } catch (error) {
      console.error(
        "Unable to load betting balance:",
        error
      )
    } finally {
      setIsLoaded(true)
    }
  }, [])

  /*
   * -----------------------------------------
   * CURRENT SELECTIONS
   * -----------------------------------------
   */

  const selectedPlayers: BetSelection[] =
    players
      .filter(
        (player) =>
          selections[
            player.player
          ] &&
          Number(
            wagers[player.player]
          ) > 0
      )
      .map((player) => ({
        player:
          player.player,

        projected:
          player.projected,

        overUnder:
          player.overUnder,

        pick:
          selections[
            player.player
          ],

        line:
          player.line,

        confidence:
          player.confidence,

        note:
          player.note,

        wager:
          Number(
            wagers[
              player.player
            ]
          ),
      }))

  /*
   * -----------------------------------------
   * TOTAL CURRENT WAGER
   * -----------------------------------------
   */

  const totalWagered =
    selectedPlayers.reduce(
      (total, bet) =>
        total + bet.wager,
      0
    )

  /*
   * -----------------------------------------
   * BALANCE AFTER CURRENT BET
   * -----------------------------------------
   */

  const balanceAfterBets =
    Math.max(
      0,
      balance - totalWagered
    )

  /*
   * -----------------------------------------
   * BALANCE VALIDATION
   * -----------------------------------------
   */

  const hasEnoughBalance =
    totalWagered <= balance

  /*
   * -----------------------------------------
   * CHANGE OVER / UNDER
   * -----------------------------------------
   */

  const handlePickChange = (
    player: string,
    pick: "OVER" | "UNDER"
  ) => {
    setSelections(
      (previous) => ({
        ...previous,
        [player]: pick,
      })
    )

    /*
     * If the user changes a selection
     * after seeing a previous error,
     * clear that error.
     */

    setWagerErrors(
      (previous) => ({
        ...previous,
        [player]: "",
      })
    )
  }

  /*
   * -----------------------------------------
   * CHANGE WAGER
   * -----------------------------------------
   */

  const handleWagerChange = (
    player: string,
    value: string
  ) => {
    const numericValue =
      value === ""
        ? 0
        : Number(value)

    if (
      !Number.isFinite(
        numericValue
      ) ||
      numericValue < 0
    ) {
      setWagers(
        (previous) => ({
          ...previous,
          [player]: 0,
        })
      )

      return
    }

    /*
     * Maximum wager is the user's
     * current available balance.
     */

    if (
      numericValue > balance
    ) {
      setWagerErrors(
        (previous) => ({
          ...previous,
          [player]:
            `You cannot wager more than your $${balance.toFixed(
              2
            )} balance.`,
        })
      )

      setWagers(
        (previous) => ({
          ...previous,
          [player]: numericValue,
        })
      )

      return
    }

    setWagerErrors(
      (previous) => ({
        ...previous,
        [player]: "",
      })
    )

    setWagers(
      (previous) => ({
        ...previous,
        [player]:
          numericValue,
      })
    )
  }

  /*
   * -----------------------------------------
   * CONFIRM BET SLIP
   * -----------------------------------------
   *
   * This is the new logic.
   *
   * Every confirmed ticket gets APPENDED
   * to the ticket history.
   *
   * Nothing gets overwritten.
   */

  const handlePlaceBet = () => {
    if (
      selectedPlayers.length === 0
    ) {
      alert(
        "Please select at least one bet."
      )

      return
    }

    if (!hasEnoughBalance) {
      alert(
        "Your selections exceed your available balance."
      )

      return
    }

    /*
     * Create the new locked ticket.
     */

    const newBalance =
      Math.max(
        0,
        balance - totalWagered
      )

    const newTicket: SavedTicket = {
      round: ROUND,

      flight,

      bets:
        selectedPlayers,

      totalWagered,

      balanceAfterBets:
        newBalance,

      createdAt:
        new Date().toISOString(),

      locked: true,
    }

    /*
     * ---------------------------------------
     * LOAD EXISTING TICKETS
     * ---------------------------------------
     */

    let existingTickets:
      SavedTicket[] = []

    try {
      const savedTickets =
        localStorage.getItem(
          TICKETS_KEY
        )

      if (savedTickets) {
        const parsed =
          JSON.parse(
            savedTickets
          )

        if (
          Array.isArray(
            parsed
          )
        ) {
          existingTickets =
            parsed
        } else if (
          parsed &&
          typeof parsed ===
            "object"
        ) {
          /*
           * Backward compatibility with
           * the old single-ticket format.
           */

          existingTickets =
            [parsed]
        }
      }
    } catch (error) {
      console.error(
        "Unable to load existing tickets:",
        error
      )
    }

    /*
     * ---------------------------------------
     * APPEND NEW TICKET
     * ---------------------------------------
     */

    const updatedTickets = [
      ...existingTickets,
      newTicket,
    ]

    localStorage.setItem(
      TICKETS_KEY,
      JSON.stringify(
        updatedTickets
      )
    )

    /*
     * ---------------------------------------
     * SAVE BALANCE
     * ---------------------------------------
     */

    localStorage.setItem(
      BALANCE_KEY,
      String(newBalance)
    )

    /*
     * ---------------------------------------
     * UPDATE UI
     * ---------------------------------------
     */

    setBalance(
      newBalance
    )

    setLastPlacedTicket(
      newTicket
    )

    /*
     * ---------------------------------------
     * CLEAR CURRENT BET SLIP
     * ---------------------------------------
     *
     * This is what allows the user to
     * immediately make another bet.
     */

    setSelections({})
    setWagers({})
    setWagerErrors({})

    /*
     * We intentionally do NOT lock the
     * Prediction Center.
     *
     * The ticket itself is locked in storage.
     */

    alert(
      "Bet slip confirmed!"
    )
  }

  /*
   * -----------------------------------------
   * LOADING
   * -----------------------------------------
   */

  if (!isLoaded) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "20px",
          fontFamily:
            "Inter, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "80px",
            color: "#6b7280",
          }}
        >
          Loading Prediction Center...
        </div>
      </main>
    )
  }

  /*
   * -----------------------------------------
   * PAGE
   * -----------------------------------------
   */

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily:
          "Inter, sans-serif",
        color: "#111827",
      }}
    >
      <BackButton />

            {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
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
          Wyncote Golf Club
        </p>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Round 6 • Oxford, Pa
        </p>
      </div>

      {/* ===================================== */}
      {/* BALANCE CARD */}
      {/* ===================================== */}

      <div
        style={{
          background: "#166534",
          color: "white",
          borderRadius: "20px",
          padding: "22px",
          marginBottom: "28px",
          boxShadow:
            "0 8px 24px rgba(0,0,0,.12)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
            opacity: 0.85,
            marginBottom: "5px",
          }}
        >
          SPORTSBOOK BALANCE
        </div>

        <div
          style={{
            fontSize: "38px",
            fontWeight: "900",
            marginBottom: "4px",
          }}
        >
          $
          {balance.toFixed(2)}
        </div>

        <div
          style={{
            fontSize: "13px",
            opacity: 0.85,
          }}
        >
          Available to bet
        </div>
      </div>

      {/* ===================================== */}
      {/* FLIGHT TOGGLE */}
      {/* ===================================== */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "12px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() =>
            setFlight("A")
          }
          style={{
            padding:
              "10px 22px",
            borderRadius:
              "999px",
            border: "none",
            cursor:
              "pointer",
            fontWeight:
              "700",
            background:
              flight === "A"
                ? "#166534"
                : "#e5e7eb",
            color:
              flight === "A"
                ? "white"
                : "#374151",
          }}
        >
          Flight A
        </button>

        <button
          onClick={() =>
            setFlight("B")
          }
          style={{
            padding:
              "10px 22px",
            borderRadius:
              "999px",
            border: "none",
            cursor:
              "pointer",
            fontWeight:
              "700",
            background:
              flight === "B"
                ? "#166534"
                : "#e5e7eb",
            color:
              flight === "B"
                ? "white"
                : "#374151",
          }}
        >
          Flight B
        </button>
      </div>

      {/* ===================================== */}
      {/* FLIGHT TITLE */}
      {/* ===================================== */}

      {/* <h2
        style={{
          fontSize: "24px",
          fontWeight: "800",
          color: "#166534",
          marginBottom: "18px",
        }}
      >
        Flight {flight}
      </h2> */}

      {/* ===================================== */}
      {/* PLAYER CARDS */}
      {/* ===================================== */}

      {players.map(
        (player) => {
          const selectedPick =
            selections[
              player.player
            ]

          const wager =
            wagers[
              player.player
            ] ?? 0

          const error =
            wagerErrors[
              player.player
            ]

          const playerHasSelection =
            Boolean(
              selectedPick
            )

          const playerHasWager =
            Number(wager) > 0

          return (
            <div
              key={
                player.player
              }
              style={{
                background:
                  "white",
                borderRadius:
                  "20px",
                padding:
                  "20px",
                marginBottom:
                  "24px",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,.08)",
                border:
                  "1px solid #e5e7eb",
              }}
            >

              {/* PLAYER HEADER */}

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  marginBottom:
                    "18px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize:
                        "24px",
                      fontWeight:
                        "800",
                    }}
                  >
                    {
                      player.player
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#6b7280",
                      fontSize:
                        "14px",
                    }}
                  >
                    Flight{" "}
                    {flight}
                  </div>
                </div>

                {/* RECOMMENDATION */}

                <div
                  style={{
                    background:
                      "#166534",
                    color:
                      "white",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "999px",
                    fontWeight:
                      "700",
                  }}
                >
                  {
                    player.pick
                  }
                </div>
              </div>

              {/* ================================= */}
              {/* STATS */}
              {/* ================================= */}

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap:
                    "16px",
                  marginBottom:
                    "20px",
                }}
              >
                <StatCard
                  title="Projected"
                  value={
                    player.projected
                  }
                />

                <StatCard
                  title="O / U"
                  value={
                    player.overUnder
                  }
                />

                <StatCard
                  title="Line"
                  value={
                    player.line
                  }
                />

                <StatCard
                  title="Confidence"
                  value={
                    `${player.confidence}/5`
                  }
                />
              </div>

              {/* ================================= */}
              {/* CONFIDENCE STARS */}
              {/* ================================= */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                <div
                  style={{
                    fontWeight:
                      "700",
                    marginBottom:
                      "6px",
                  }}
                >
                  Confidence
                </div>

                <div
                  style={{
                    fontSize:
                      "22px",
                  }}
                >
                  {"⭐".repeat(
                    player.confidence
                  )}
                </div>
              </div>

              {/* ================================= */}
              {/* OVER / UNDER */}
              {/* ================================= */}

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap:
                    "12px",
                  marginBottom:
                    "18px",
                }}
              >
                <button
                  onClick={() =>
                    handlePickChange(
                      player.player,
                      "OVER"
                    )
                  }
                  style={{
                    padding:
                      "14px",
                    borderRadius:
                      "12px",
                    border:
                      selectedPick ===
                      "OVER"
                        ? "2px solid #166534"
                        : "1px solid #d1d5db",
                    background:
                      selectedPick ===
                      "OVER"
                        ? "#dcfce7"
                        : "white",
                    color:
                      "#166534",
                    fontWeight:
                      "800",
                    fontSize:
                      "15px",
                    cursor:
                      "pointer",
                  }}
                >
                  OVER{" "}
                  {
                    player.overUnder
                  }
                </button>

                <button
                  onClick={() =>
                    handlePickChange(
                      player.player,
                      "UNDER"
                    )
                  }
                  style={{
                    padding:
                      "14px",
                    borderRadius:
                      "12px",
                    border:
                      selectedPick ===
                      "UNDER"
                        ? "2px solid #166534"
                        : "1px solid #d1d5db",
                    background:
                      selectedPick ===
                      "UNDER"
                        ? "#dcfce7"
                        : "white",
                    color:
                      "#166534",
                    fontWeight:
                      "800",
                    fontSize:
                      "15px",
                    cursor:
                      "pointer",
                  }}
                >
                  UNDER{" "}
                  {
                    player.overUnder
                  }
                </button>
              </div>

              {/* ================================= */}
              {/* WAGER */}
              {/* ================================= */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >
                <label
                  style={{
                    display:
                      "block",
                    fontWeight:
                      "700",
                    marginBottom:
                      "8px",
                  }}
                >
                  Wager Amount
                </label>

                <div
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <span
                    style={{
                      position:
                        "absolute",
                      left:
                        "14px",
                      top:
                        "50%",
                      transform:
                        "translateY(-50%)",
                      fontSize:
                        "16px",
                      fontWeight:
                        "700",
                      color:
                        "#6b7280",
                    }}
                  >
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      wager ===
                      0
                        ? ""
                        : wager
                    }
                    onChange={(
                      event
                    ) =>
                      handleWagerChange(
                        player.player,
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="0.00"
                    style={{
                      width:
                        "100%",
                      boxSizing:
                        "border-box",
                      padding:
                        "14px 14px 14px 30px",
                      borderRadius:
                        "12px",
                      border:
                        error
                          ? "2px solid #dc2626"
                          : "1px solid #d1d5db",
                      fontSize:
                        "16px",
                      fontWeight:
                        "700",
                      outline:
                        "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop:
                      "6px",
                    fontSize:
                      "12px",
                    color:
                      "#9ca3af",
                  }}
                >
                  Maximum wager: $
                  {balance.toFixed(
                    2
                  )}
                </div>

                {error && (
                  <div
                    style={{
                      marginTop:
                        "6px",
                      color:
                        "#dc2626",
                      fontSize:
                        "13px",
                      fontWeight:
                        "700",
                    }}
                  >
                    {error}
                  </div>
                )}
              </div>

              {/* ================================= */}
              {/* CURRENT SELECTION INDICATOR */}
              {/* ================================= */}

              {playerHasSelection &&
                playerHasWager && (
                  <div
                    style={{
                      background:
                        "#f0fdf4",
                      color:
                        "#166534",
                      borderRadius:
                        "12px",
                      padding:
                        "12px",
                      marginBottom:
                        "14px",
                      textAlign:
                        "center",
                      fontSize:
                        "14px",
                      fontWeight:
                        "800",
                    }}
                  >
                    {selectedPick}{" "}
                    • $
                    {Number(
                      wager
                    ).toFixed(
                      2
                    )}
                  </div>
                )}

              {/* ================================= */}
              {/* ANALYSIS */}
              {/* ================================= */}

              <div
                style={{
                  background:
                    "#f0fdf4",
                  borderRadius:
                    "12px",
                  padding:
                    "14px",
                  fontSize:
                    "14px",
                  lineHeight:
                    "1.5",
                  color:
                    "#374151",
                }}
              >
                <strong>
                  Analysis:
                </strong>{" "}
                {
                  player.note
                }
              </div>
            </div>
          )
        }
      )}

      {/* ===================================== */}
      {/* CURRENT BET SLIP */}
      {/* ===================================== */}

      {selectedPlayers.length >
        0 && (
        <div
          style={{
            background:
              "white",
            border:
              "2px solid #166534",
            borderRadius:
              "20px",
            padding:
              "20px",
            marginBottom:
              "20px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,.08)",
          }}
        >
          <h3
            style={{
              margin:
                "0 0 16px",
              fontSize:
                "22px",
              fontWeight:
                "800",
              color:
                "#166534",
            }}
          >
            Current Bet Slip
          </h3>

          {selectedPlayers.map(
            (bet) => (
              <div
                key={
                  bet.player
                }
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  padding:
                    "12px 0",
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight:
                        "800",
                    }}
                  >
                    {
                      bet.player
                    }
                  </div>

                  <div
                    style={{
                      color:
                        bet.pick ===
                        "OVER"
                          ? "#991b1b"
                          : "#166534",
                      fontWeight:
                        "800",
                      marginTop:
                        "3px",
                    }}
                  >
                    {
                      bet.pick
                    }{" "}
                    {
                      bet.overUnder
                    }
                  </div>
                </div>

                <div
                  style={{
                    fontSize:
                      "20px",
                    fontWeight:
                      "800",
                  }}
                >
                  $
                  {bet.wager.toFixed(
                    2
                  )}
                </div>
              </div>
            )
          )}

          {/* TOTAL */}

          <div
            style={{
              marginTop:
                "20px",
              paddingTop:
                "16px",
              borderTop:
                "3px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                fontSize:
                  "20px",
                marginBottom:
                  "10px",
              }}
            >
              <span>
                Total Wagered
              </span>

              <strong>
                $
                {totalWagered.toFixed(
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
                fontSize:
                  "20px",
              }}
            >
              <span>
                Balance After Bets
              </span>

              <strong
                style={{
                  color:
                    hasEnoughBalance
                      ? "#166534"
                      : "#991b1b",
                }}
              >
                $
                {balanceAfterBets.toFixed(
                  2
                )}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* INSUFFICIENT BALANCE */}
      {/* ===================================== */}

      {selectedPlayers.length >
        0 &&
        !hasEnoughBalance && (
          <div
            style={{
              background:
                "#fee2e2",
              color:
                "#991b1b",
              padding:
                "15px",
              borderRadius:
                "14px",
              marginBottom:
                "20px",
              fontWeight:
                "800",
              textAlign:
                "center",
            }}
          >
            Your selections
            exceed your
            available
            balance.
          </div>
        )}

      {/* ===================================== */}
      {/* CONFIRM BET SLIP */}
      {/* ===================================== */}

      <button
        onClick={
          handlePlaceBet
        }
        disabled={
          selectedPlayers.length ===
            0 ||
          !hasEnoughBalance
        }
        style={{
          width:
            "100%",
          marginTop:
            "5px",
          padding:
            "18px",
          borderRadius:
            "16px",
          border:
            "none",
          background:
            selectedPlayers.length >
              0 &&
            hasEnoughBalance
              ? "#166534"
              : "#d1d5db",
          color:
            "#ffffff",
          fontSize:
            "20px",
          fontWeight:
            "900",
          cursor:
            selectedPlayers.length >
              0 &&
            hasEnoughBalance
              ? "pointer"
              : "not-allowed",
        }}
      >
        ✓ CONFIRM BET SLIP
      </button>

      {/* ===================================== */}
      {/* LAST PLACED CONFIRMATION */}
      {/* ===================================== */}

      {lastPlacedTicket && (
        <div
          style={{
            background:
              "#dcfce7",
            color:
              "#166534",
            padding:
              "18px",
            borderRadius:
              "16px",
            marginTop:
              "18px",
            textAlign:
              "center",
            fontWeight:
              "800",
          }}
        >
          <div
            style={{
              fontSize:
                "21px",
              marginBottom:
                "6px",
            }}
          >
            ✓ BET SLIP CONFIRMED
          </div>

          <div
            style={{
              fontSize:
                "14px",
              fontWeight:
                "600",
            }}
          >
            Ticket locked and
            saved.
          </div>

          <div
            style={{
              marginTop:
                "8px",
              fontSize:
                "14px",
            }}
          >
            $
            {lastPlacedTicket.totalWagered.toFixed(
              2
            )}{" "}
            wagered • $
            {lastPlacedTicket.balanceAfterBets.toFixed(
              2
            )}{" "}
            remaining
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* VIEW BET SLIPS */}
      {/* ===================================== */}

      <button
        onClick={() =>
          router.push(
            "/betting-lines/ticket"
          )
        }
        style={{
          width:
            "100%",
          marginTop:
            "14px",
          padding:
            "15px",
          borderRadius:
            "14px",
          border:
            "2px solid #166534",
          background:
            "white",
          color:
            "#166534",
          fontSize:
            "16px",
          fontWeight:
            "800",
          cursor:
            "pointer",
        }}
      >
        🎟️ VIEW MY BET SLIPS
      </button>

      <SocialFooter />
    </div>
  )
}