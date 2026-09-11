"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type Bet = {
  player: string;
  pick: "OVER" | "UNDER";
  overUnder: number;
  line?: number;
  wager: number;
  result?: string;
};

type Ticket = {
  round: number;
  bets?: Bet[];
  totalWagered?: number;
  balanceAfterBets?: number;
  remainingBalance?: number;
  status?: string;

  event?: {
    course?: string;
    round?: number;
    location?: string;
  };

  createdAt?: string;
};

type ScoreRow = {
  round_id: string;
  player_id: string;
  player_name: string;
  score: number;
};

type RoundRow = {
  id: string;
  event_id: string | null;
  course: string | null;
  date: string | null;
};

const TICKETS_KEY = "stoplee_betting_tickets";

export default function BettingTicketPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [scores, setScores] = useState<ScoreRow[]>([]);
  const [rounds, setRounds] = useState<RoundRow[]>([]);
  const [scoresLoading, setScoresLoading] = useState(true);

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
       * Older single-ticket object
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
   * LOAD ROUNDS + SCORES FROM SUPABASE
   * -----------------------------------------
   */

  async function loadScores() {
    try {
      setScoresLoading(true);

      /*
       * Load rounds
       */

      // const {
      //   data: roundsData,
      //   error: roundsError,
      // } = await supabase
      //   .from("rounds")
      //   .select(
      //     "id, event_id, course, date"
      //   );

      // if (roundsError) {
      //   console.error(
      //     "Unable to load rounds:",
      //     roundsError
      //   );
      // } else {

      //   console.log("🔥 ROUNDS FROM SUPABASE:", roundsData);
      //   console.log("🔥 ROUNDS ERROR:", roundsError);
      //   setRounds(roundsData || []);
      // }

      /*
       * Load scores
       */

      const {
        data: scoresData,
        error: scoresError,
      } = await supabase
        .from("scores")
        .select(
          "round_id, player_id, player_name, score"
        );

      if (scoresError) {
        console.error(
          "Unable to load scores:",
          scoresError
        );

        return;
      }

      setScores(scoresData || []);
    } catch (error) {
      console.error(
        "Unable to load Supabase betting data:",
        error
      );
    } finally {
      setScoresLoading(false);
    }
  }

  /*
   * -----------------------------------------
   * LOAD DATA + LIVE SCORE UPDATES
   * -----------------------------------------
   */

  useEffect(() => {
    loadScores();

    const channel = supabase
      .channel("betting-score-results")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scores",
        },
        () => {
          loadScores();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /*
   * -----------------------------------------
   * FIND ROUND FOR TICKET
   * -----------------------------------------
   */

function getTicketRoundId(
  ticket: Ticket
): string | null {
  /*
   * The ticket stores the round directly
   * as ticket.round.
   */

  const roundNumber = ticket.round;

  console.log("ROUND DEBUG:", {
    ticketRound: roundNumber,
    rounds,
  });

  if (
    roundNumber === undefined ||
    roundNumber === null
  ) {
    console.warn(
      "Ticket has no round:",
      roundNumber
    );

    return null;
  }

  /*
   * Supabase rounds table uses event_id values
   * such as:
   *
   * round-5
   * round-6
   */

  const expectedEventId =
    `round-${roundNumber}`;

  const round = rounds.find(
    (item) =>
      item.event_id === expectedEventId
  );

  console.log("ROUND MATCH:", {
    roundNumber,
    expectedEventId,
    matchedRound: round,
  });

  if (!round) {
    console.warn(
      `No Supabase round found for ${expectedEventId}`
    );

    return null;
  }

  return round.id;
}

  /*
   * -----------------------------------------
   * FIND PLAYER SCORE
   * -----------------------------------------
   */

  function getPlayerScore(
    playerName: string,
    ticket: Ticket
  ): number | null {

    const normalizedName =
      playerName
        .trim()
        .toLowerCase();

    /*
     * Find the correct round first.
     */

    const roundId =
  getTicketRoundId(ticket);

   const roundNumber =
  ticket.round ?? ticket.event?.round;

    /*
     * If we cannot identify the round,
     * don't guess at a score.
     */

    if (!roundId) {
      return null;
    }

    /*
     * Find the player's score INSIDE
     * that specific round.
     */

    const scoreRow = scores.find(
      (score) =>
        score.round_id === roundId &&
        score.player_name
          ?.trim()
          .toLowerCase() ===
          normalizedName
    );

    if (!scoreRow) {
      return null;
    }

    return Number(scoreRow.score);
  }



  /*
   * -----------------------------------------
   * CALCULATE BET RESULT
   * -----------------------------------------
   */

  function getBetResult(
    bet: Bet,
    ticket: Ticket
  ): {
    result:
      | "WIN"
      | "LOSS"
      | "PUSH"
      | "PENDING";

    actualScore: number | null;
  } {
    const actualScore =
      getPlayerScore(
        bet.player,
        ticket
      );

    /*
     * Score hasn't been entered yet.
     */

    if (actualScore === null) {
      return {
        result: "PENDING",
        actualScore: null,
      };
    }

    /*
     * PUSH
     */

    if (
      actualScore ===
      bet.overUnder
    ) {
      return {
        result: "PUSH",
        actualScore,
      };
    }

    /*
     * OVER
     */

    if (bet.pick === "OVER") {
      return {
        result:
          actualScore >
          bet.overUnder
            ? "WIN"
            : "LOSS",

        actualScore,
      };
    }

    /*
     * UNDER
     */

    return {
      result:
        actualScore <
        bet.overUnder
          ? "WIN"
          : "LOSS",

      actualScore,
    };
  }

  /*
   * -----------------------------------------
   * TICKET SUMMARY
   * -----------------------------------------
   */

  function getTicketSummary(
    ticket: Ticket,
    bets: Bet[]
  ) {
    let wins = 0;
    let losses = 0;
    let pushes = 0;
    let pending = 0;

    bets.forEach((bet) => {
      const { result } =
        getBetResult(
          bet,
          ticket
        );

      if (result === "WIN") {
        wins++;
      }

      if (result === "LOSS") {
        losses++;
      }

      if (result === "PUSH") {
        pushes++;
      }

      if (result === "PENDING") {
        pending++;
      }
    });

    let ticketResult:
      | "WIN"
      | "LOSS"
      | "PUSH"
      | "PENDING" =
      "PENDING";

    /*
     * If anything is still pending,
     * ticket remains pending.
     */

    if (pending > 0) {
      ticketResult = "PENDING";
    }

    /*
     * One loss makes a parlay-style
     * ticket a loss.
     */

    else if (losses > 0) {
      ticketResult = "LOSS";
    }

    /*
     * Otherwise if there are wins,
     * ticket wins.
     */

    else if (wins > 0) {
      ticketResult = "WIN";
    }

    /*
     * Otherwise all resolved bets
     * were pushes.
     */

    else if (pushes > 0) {
      ticketResult = "PUSH";
    }

    return {
      wins,
      losses,
      pushes,
      pending,
      ticketResult,
    };
  }

  /*
   * -----------------------------------------
   * RESULT COLORS
   * -----------------------------------------
   */

  function resultColor(
    result: string
  ) {
    if (result === "WIN") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (result === "LOSS") {
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
    }

    if (result === "PUSH") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#6b7280",
    };
  }

  /*
   * -----------------------------------------
   * TICKET RESULT COLORS
   * -----------------------------------------
   */

  function ticketResultColor(
    result: string
  ) {
    if (result === "WIN") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (result === "LOSS") {
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
    }

    if (result === "PUSH") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#6b7280",
    };
  }

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

        {/* PAGE TITLE */}

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

        {/* NO TICKETS */}

        {tickets.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border:
                "2px solid #111827",
              borderRadius: "20px",
              padding:
                "35px 20px",
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

          /* ALL BET SLIPS */

          tickets
            .slice()
            .reverse()
            .map(
              (
                ticket,
                index
              ) => {
                const bets =
                  ticket.bets ?? [];

                /*
                 * TOTAL WAGER
                 */

                const totalWager =
                  typeof ticket.totalWagered ===
                  "number"
                    ? ticket.totalWagered
                    : bets.reduce(
                        (
                          total,
                          bet
                        ) =>
                          total +
                          (Number(
                            bet.wager
                          ) || 0),
                        0
                      );

                /*
                 * BALANCE
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
                 * EVENT
                 */

                const course =
                  ticket.event?.course ??
                  "Wyncote Golf Club";

                const round =
                  ticket.event?.round ??
                  5;

                const location =
                  ticket.event?.location ??
                  "Oxford, Pa";

                /*
                 * OLD STATUS
                 */

                const status =
                  ticket.status ??
                  "LOCKED";

                /*
                 * NEW CALCULATED STATUS
                 */

                const summary =
                  getTicketSummary(
                    ticket,
                    bets
                  );

                const ticketResult =
                  summary.ticketResult;

                const ticketResultStyles =
                  ticketResultColor(
                    ticketResult
                  );

                return (
                  <div
                    key={
                      ticket.createdAt ??
                      `ticket-${index}`
                    }
                    style={{
                      background:
                        "#ffffff",
                      border:
                        "2px solid #111827",
                      borderRadius:
                        "20px",
                      padding:
                        "24px",
                      marginBottom:
                        "25px",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.10)",
                    }}
                  >

                    {/* TICKET HEADER */}

                    <div
                      style={{
                        textAlign:
                          "center",
                        paddingBottom:
                          "18px",
                        borderBottom:
                          "2px dashed #d1d5db",
                        marginBottom:
                          "18px",
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            "13px",
                          fontWeight:
                            "800",
                          letterSpacing:
                            "1px",
                          color:
                            "#6b7280",
                          marginBottom:
                            "6px",
                        }}
                      >
                        STOPLEE GOLF CLUB
                      </div>

                      <h2
                        style={{
                          margin:
                            "0 0 6px",
                          fontSize:
                            "24px",
                          fontWeight:
                            "900",
                        }}
                      >
                        🎟️ Official Bet Slip
                      </h2>

                      <div
                        style={{
                          color:
                            "#6b7280",
                          fontSize:
                            "14px",
                          lineHeight:
                            "1.5",
                        }}
                      >
                        {course}
                        <br />

                        Round {round} •{" "}
                        {location}
                      </div>

                      {/* LOCKED */}

                      <div
                        style={{
                          display:
                            "inline-block",
                          marginTop:
                            "12px",
                          padding:
                            "7px 12px",
                          borderRadius:
                            "999px",
                          background:
                            "#dcfce7",
                          color:
                            "#166534",
                          fontSize:
                            "12px",
                          fontWeight:
                            "900",
                        }}
                      >
                        🔒 {status}
                      </div>

                      {/* RESULT */}

                      <div
                        style={{
                          display:
                            "inline-block",
                          marginTop:
                            "8px",
                          marginLeft:
                            "8px",
                          padding:
                            "7px 12px",
                          borderRadius:
                            "999px",
                          background:
                            ticketResultStyles.background,
                          color:
                            ticketResultStyles.color,
                          fontSize:
                            "12px",
                          fontWeight:
                            "900",
                        }}
                      >
                        {ticketResult ===
                          "WIN" &&
                          "🟢 WIN"}

                        {ticketResult ===
                          "LOSS" &&
                          "🔴 LOSS"}

                        {ticketResult ===
                          "PUSH" &&
                          "🟡 PUSH"}

                        {ticketResult ===
                          "PENDING" &&
                          "⏳ PENDING"}
                      </div>

                      {/* DATE */}

                      {ticket.createdAt && (
                        <div
                          style={{
                            marginTop:
                              "8px",
                            fontSize:
                              "12px",
                            color:
                              "#9ca3af",
                          }}
                        >
                          Placed{" "}
                          {new Date(
                            ticket.createdAt
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* BET SUMMARY */}

                    <div
                      style={{
                        display:
                          "grid",
                        gridTemplateColumns:
                          "repeat(4, 1fr)",
                        gap: "8px",
                        marginBottom:
                          "8px",
                      }}
                    >
                      <div
                        style={{
                          textAlign:
                            "center",
                          background:
                            "#f0fdf4",
                          borderRadius:
                            "10px",
                          padding:
                            "10px 4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            color:
                              "#6b7280",
                          }}
                        >
                          WIN
                        </div>

                        <strong
                          style={{
                            color:
                              "#166534",
                            fontSize:
                              "18px",
                          }}
                        >
                          {summary.wins}
                        </strong>
                      </div>

                      <div
                        style={{
                          textAlign:
                            "center",
                          background:
                            "#fef2f2",
                          borderRadius:
                            "10px",
                          padding:
                            "10px 4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            color:
                              "#6b7280",
                          }}
                        >
                          LOSS
                        </div>

                        <strong
                          style={{
                            color:
                              "#991b1b",
                            fontSize:
                              "18px",
                          }}
                        >
                          {summary.losses}
                        </strong>
                      </div>

                      <div
                        style={{
                          textAlign:
                            "center",
                          background:
                            "#fffbeb",
                          borderRadius:
                            "10px",
                          padding:
                            "10px 4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            color:
                              "#6b7280",
                          }}
                        >
                          PUSH
                        </div>

                        <strong
                          style={{
                            color:
                              "#92400e",
                            fontSize:
                              "18px",
                          }}
                        >
                          {summary.pushes}
                        </strong>
                      </div>

                      <div
                        style={{
                          textAlign:
                            "center",
                          background:
                            "#f3f4f6",
                          borderRadius:
                            "10px",
                          padding:
                            "10px 4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "11px",
                            color:
                              "#6b7280",
                          }}
                        >
                          PENDING
                        </div>

                        <strong
                          style={{
                            color:
                              "#6b7280",
                            fontSize:
                              "18px",
                          }}
                        >
                          {summary.pending}
                        </strong>
                      </div>
                    </div>

                    {/* BETS */}

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
                          ) => {
                            const {
                              result,
                              actualScore,
                            } =
                              getBetResult(
                                bet,
                                ticket
                              );

                            const resultStyles =
                              resultColor(
                                result
                              );

                            return (
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

                                {/* PICK + SCORE + RESULT */}

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
                                    gap:
                                      "10px",
                                    flexWrap:
                                      "wrap",
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

                                  {/* ACTUAL SCORE */}

                                  <span
                                    style={{
                                      color:
                                        "#374151",
                                      fontWeight:
                                        "700",
                                    }}
                                  >
                                    Actual:{" "}
                                    {actualScore !==
                                    null
                                      ? actualScore
                                      : "—"}
                                  </span>

                                  {/* RESULT */}

                                  <span
                                    style={{
                                      background:
                                        resultStyles.background,
                                      color:
                                        resultStyles.color,
                                      padding:
                                        "5px 9px",
                                      borderRadius:
                                        "999px",
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "900",
                                      whiteSpace:
                                        "nowrap",
                                    }}
                                  >
                                    {result ===
                                      "WIN" &&
                                      "🟢 WIN"}

                                    {result ===
                                      "LOSS" &&
                                      "🔴 LOSS"}

                                    {result ===
                                      "PUSH" &&
                                      "🟡 PUSH"}

                                    {result ===
                                      "PENDING" &&
                                      "⏳ PENDING"}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}

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

                    {/* RESULTS MESSAGE */}

                    <div
                      style={{
                        background:
                          ticketResult ===
                          "PENDING"
                            ? "#f3f4f6"
                            : ticketResultStyles.background,
                        borderRadius:
                          "12px",
                        padding:
                          "13px",
                        marginTop:
                          "16px",
                        textAlign:
                          "center",
                        color:
                          ticketResult ===
                          "PENDING"
                            ? "#6b7280"
                            : ticketResultStyles.color,
                        fontSize:
                          "13px",
                        fontWeight:
                          "700",
                        lineHeight:
                          "1.5",
                      }}
                    >
                      {scoresLoading
                        ? "Loading scores..."
                        : ticketResult ===
                          "PENDING"
                        ? "Results will update automatically as Game Day scores are entered."
                        : ticketResult ===
                          "WIN"
                        ? "🎉 Ticket won!"
                        : ticketResult ===
                          "LOSS"
                        ? "Ticket lost."
                        : "Ticket pushed."}
                    </div>
                  </div>
                );
              }
            )
        )}
      </div>
    </main>
  );
}