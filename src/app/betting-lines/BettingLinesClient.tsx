"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bettingLines } from "@/src/data/bettingLines";
import BackButton from "@/src/components/BackButton";

type Player = {
  player: string;
  projected: number;
  overUnder: number;
  pick: string;
  line: string;
  confidence: number;
  note: string;
};

type BetSelection = {
  player: string;
  projected: number;
  overUnder: number;
  pick: "OVER" | "UNDER";
  line: string;
  confidence: number;
  note: string;
  wager: number;
};

type SavedTicket = {
  round: number;
  flight: "A" | "B";
  bets: BetSelection[];
  totalWagered: number;
  balanceAfterBets: number;
  createdAt: string;
  locked: boolean;
};

const BALANCE_KEY = "stoplee_balance";
const TICKET_KEY = "stoplee_betting_ticket";

export default function BettingLinesClient() {
  const router = useRouter();

  const [flight, setFlight] = useState<"A" | "B">("A");

  const [balance, setBalance] = useState<number>(50);

  const [selections, setSelections] = useState<
    Record<string, "OVER" | "UNDER">
  >({});

  const [wagers, setWagers] = useState<Record<string, number>>({});

  const [ticket, setTicket] = useState<SavedTicket | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const players: Player[] =
    flight === "A"
      ? bettingLines.flightA
      : bettingLines.flightB;

  /*
   * LOAD SAVED BALANCE + TICKET
   */
useEffect(() => {
  try {
    const savedBalance = localStorage.getItem(BALANCE_KEY);

    if (savedBalance !== null) {
      const parsedBalance = Number(savedBalance);

      if (
        Number.isFinite(parsedBalance) &&
        parsedBalance >= 0
      ) {
        setBalance(parsedBalance);
      }
    }

    const savedTicket = localStorage.getItem(TICKET_KEY);

    if (savedTicket) {
      const parsedTicket: SavedTicket =
        JSON.parse(savedTicket);

      // Only lock the page if this is the current Round 5 ticket.
      if (parsedTicket.round === 5) {
        setTicket(parsedTicket);

        const savedSelections: Record<
          string,
          "OVER" | "UNDER"
        > = {};

        const savedWagers: Record<string, number> = {};

        parsedTicket.bets.forEach((bet) => {
          savedSelections[bet.player] = bet.pick;
          savedWagers[bet.player] = bet.wager;
        });

        setSelections(savedSelections);
        setWagers(savedWagers);
      }
    }
  } catch (error) {
    console.error(
      "Unable to load betting information:",
      error
    );
  } finally {
    setIsLoaded(true);
  }
}, []);

  /*
   * CURRENT BETS
   */
  const selectedPlayers: BetSelection[] = players
    .filter(
      (player) =>
        selections[player.player] &&
        Number(wagers[player.player]) > 0
    )
    .map((player) => ({
      player: player.player,
      projected: player.projected,
      overUnder: player.overUnder,
      pick: selections[player.player],
      line: player.line,
      confidence: player.confidence,
      note: player.note,
      wager: Number(wagers[player.player]),
    }));

  /*
   * TOTAL WAGERED
   */
  const totalWagered = selectedPlayers.reduce(
    (total, bet) => total + bet.wager,
    0
  );

  /*
   * IMPORTANT BALANCE FIX
   *
   * Never allow the displayed balance to go negative.
   */
    const balanceAfterBets = ticket?.locked
    ? Math.max(0, ticket.balanceAfterBets)
    : Math.max(0, balance - totalWagered);

    const hasEnoughBalance = ticket?.locked
    ? true
    : totalWagered <= balance;

  /*
   * CHANGE PICK
   */
  const handlePickChange = (
    player: string,
    pick: "OVER" | "UNDER"
  ) => {
    if (ticket?.locked) return;

    setSelections((previous) => ({
      ...previous,
      [player]: pick,
    }));
  };

  /*
   * CHANGE WAGER
   */
  const handleWagerChange = (
    player: string,
    value: string
  ) => {
    if (ticket?.locked) return;

    const numericValue =
      value === ""
        ? 0
        : Math.max(0, Number(value));

    setWagers((previous) => ({
      ...previous,
      [player]: numericValue,
    }));
  };

  /*
   * PLACE ALL BETS
   */
  const handlePlaceBet = () => {
    if (ticket?.locked) {
      return;
    }

    if (selectedPlayers.length === 0) {
      alert("Please select at least one bet.");
      return;
    }

    /*
     * DO NOT ALLOW A BET THAT EXCEEDS THE BALANCE.
     *
     * IMPORTANT:
     * totalWagered === balance IS ALLOWED.
     */
    if (!hasEnoughBalance) {
      alert(
        "Your selections exceed your available balance."
      );
      return;
    }

    const newBalance = Math.max(
      0,
      balance - totalWagered
    );

    const newTicket: SavedTicket = {
    round: 5,
      flight,
      bets: selectedPlayers,
      totalWagered,
      balanceAfterBets: newBalance,
      createdAt: new Date().toISOString(),
      locked: true,
    };

    /*
     * SAVE BALANCE
     */
    localStorage.setItem(
      BALANCE_KEY,
      newBalance.toString()
    );

    /*
     * SAVE TICKET
     */
    localStorage.setItem(
      TICKET_KEY,
      JSON.stringify(newTicket)
    );

    /*
     * UPDATE PAGE
     */
    setBalance(newBalance);
    setTicket(newTicket);
  };

  /*
   * VIEW TICKET
   */
  const handleViewTicket = () => {
    router.push("/betting-lines/ticket");
  };

  /*
   * WAIT UNTIL LOCAL STORAGE HAS BEEN READ
   */
  if (!isLoaded) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: "80px",
            color: "#6b7280",
          }}
        >
          Loading betting center...
        </div>
      </main>
    );
  }

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
        <BackButton />

        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "900",
              color: "#166534",
              margin: "0 0 8px",
              letterSpacing: "-0.8px",
            }}
          >
            🏌🏾‍♂️ Prediction Center
          </h1>

          <p
            style={{
              margin: "0 0 5px",
              color: "#166534",
              fontWeight: "700",
            }}
          >
            Architects Golf Club
          </p>

          <p
            style={{
              margin: 0,
              color: "#9ca3af",
              fontSize: "14px",
            }}
          >
            Round 5 • Stewartsville, NJ
          </p>
        </div>

        {/* BALANCE */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "25px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              fontWeight: "700",
              marginBottom: "5px",
              textTransform: "uppercase",
            }}
          >
            Available Balance
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "900",
              color:
                balance > 0
                  ? "#166534"
                  : "#6b7280",
            }}
          >
            ${balance.toFixed(2)}
          </div>

          {totalWagered > 0 && (
            <div
              style={{
                marginTop: "10px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              After current selections:{" "}
              <strong
                style={{
                  color:
                    hasEnoughBalance
                      ? "#166534"
                      : "#991b1b",
                }}
              >
                ${balanceAfterBets.toFixed(2)}
              </strong>
            </div>
          )}
        </div>

        {/* FLIGHT BUTTONS */}
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
            disabled={ticket?.locked}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "12px 26px",
              fontWeight: "700",
              cursor: ticket?.locked
                ? "not-allowed"
                : "pointer",
              background:
                flight === "A"
                  ? "#166534"
                  : "#e5e7eb",
              color:
                flight === "A"
                  ? "#ffffff"
                  : "#374151",
              opacity: ticket?.locked ? 0.7 : 1,
            }}
          >
            Flight A
          </button>

          <button
            onClick={() => setFlight("B")}
            disabled={ticket?.locked}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "12px 26px",
              fontWeight: "700",
              cursor: ticket?.locked
                ? "not-allowed"
                : "pointer",
              background:
                flight === "B"
                  ? "#166534"
                  : "#e5e7eb",
              color:
                flight === "B"
                  ? "#ffffff"
                  : "#374151",
              opacity: ticket?.locked ? 0.7 : 1,
            }}
          >
            Flight B
          </button>
        </div>

        {/* FLIGHT TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Flight {flight}
        </h2>

        {/* PLAYER CARDS */}
        {players.map((player) => {
          const selectedPick =
            selections[player.player];

          const wager =
            wagers[player.player] || 0;

          return (
            <div
              key={player.player}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "20px",
                marginBottom: "18px",
                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.07)",
              }}
            >
              {/* PLAYER */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "23px",
                      fontWeight: "800",
                    }}
                  >
                    {player.player}
                  </div>

                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginTop: "3px",
                    }}
                  >
                    Projected:{" "}
                    {player.projected}
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 13px",
                    borderRadius: "999px",
                    fontWeight: "800",
                    background:
                      player.pick === "UNDER"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      player.pick === "UNDER"
                        ? "#166534"
                        : "#991b1b",
                  }}
                >
                  {player.pick}
                </div>
              </div>

              {/* BETTING NUMBERS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, 1fr)",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    OVER / UNDER
                  </div>

                  <strong>
                    {player.overUnder}
                  </strong>
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    LINE
                  </div>

                  <strong>
                    {player.line}
                  </strong>
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                    }}
                  >
                    CONFIDENCE
                  </div>

                  <strong>
                    {"⭐".repeat(
                      player.confidence
                    )}
                  </strong>
                </div>
              </div>

              {/* OVER / UNDER SELECTION */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, 1fr)",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <button
                  disabled={ticket?.locked}
                  onClick={() =>
                    handlePickChange(
                      player.player,
                      "OVER"
                    )
                  }
                  style={{
                    padding: "14px 10px",
                    borderRadius: "14px",
                    border:
                      selectedPick === "OVER"
                        ? "3px solid #166534"
                        : "2px solid #e5e7eb",
                    background:
                      selectedPick === "OVER"
                        ? "#dcfce7"
                        : "#ffffff",
                    color:
                      selectedPick === "OVER"
                        ? "#166534"
                        : "#374151",
                    fontWeight: "800",
                    fontSize: "16px",
                    cursor:
                      ticket?.locked
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  OVER {player.overUnder}
                </button>

                <button
                  disabled={ticket?.locked}
                  onClick={() =>
                    handlePickChange(
                      player.player,
                      "UNDER"
                    )
                  }
                  style={{
                    padding: "14px 10px",
                    borderRadius: "14px",
                    border:
                      selectedPick === "UNDER"
                        ? "3px solid #166534"
                        : "2px solid #e5e7eb",
                    background:
                      selectedPick === "UNDER"
                        ? "#dcfce7"
                        : "#ffffff",
                    color:
                      selectedPick === "UNDER"
                        ? "#166534"
                        : "#374151",
                    fontWeight: "800",
                    fontSize: "16px",
                    cursor:
                      ticket?.locked
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  UNDER {player.overUnder}
                </button>
              </div>

              {/* WAGER */}
              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  Wager Amount
                </label>

                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      fontSize: "20px",
                      color: "#9ca3af",
                      fontWeight: "700",
                    }}
                  >
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={
                      wager === 0
                        ? ""
                        : wager
                    }
                    disabled={
                      ticket?.locked ||
                      !selectedPick
                    }
                    onChange={(event) =>
                      handleWagerChange(
                        player.player,
                        event.target.value
                      )
                    }
                    placeholder="0"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding:
                        "16px 16px 16px 38px",
                      borderRadius: "14px",
                      border:
                        "2px solid #e5e7eb",
                      fontSize: "20px",
                      fontWeight: "700",
                      outline: "none",
                      background:
                        ticket?.locked ||
                        !selectedPick
                          ? "#f3f4f6"
                          : "#ffffff",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    color: "#9ca3af",
                    fontSize: "14px",
                  }}
                >
                  Maximum wager: $
                  {balance.toFixed(2)}
                </div>
              </div>

              {/* NOTE */}
              <div
                style={{
                  background: "#f0fdf4",
                  borderRadius: "12px",
                  padding: "14px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#374151",
                }}
              >
                <strong>Analysis:</strong>{" "}
                {player.note}
              </div>
            </div>
          );
        })}

        {/* BET SUMMARY */}
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #166534",
            borderRadius: "20px",
            padding: "24px",
            marginTop: "30px",
            marginBottom: "30px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#166534",
              }}
            >
              🧾 Bet Slip
            </div>

            {ticket?.locked && (
              <div
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  fontWeight: "800",
                }}
              >
                LOCKED
              </div>
            )}
          </div>

          <div
            style={{
              color: "#6b7280",
              marginBottom: "20px",
            }}
          >
            Architects Golf Club • Round 5
          </div>

          {selectedPlayers.length === 0 ? (
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "18px",
                textAlign: "center",
                color: "#9ca3af",
              }}
            >
              Select your bets above.
            </div>
          ) : (
            <>
              {selectedPlayers.map((bet) => (
                <div
                  key={bet.player}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    padding:
                      "14px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                      }}
                    >
                      {bet.player}
                    </div>

                    <div
                      style={{
                        color:
                          bet.pick ===
                          "OVER"
                            ? "#991b1b"
                            : "#166534",
                        fontWeight: "800",
                        marginTop: "3px",
                      }}
                    >
                      {bet.pick}{" "}
                      {bet.overUnder}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                    }}
                  >
                    $
                    {bet.wager.toFixed(2)}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop:
                    "3px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    fontSize: "20px",
                    marginBottom: "10px",
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
                    display: "flex",
                    justifyContent:
                      "space-between",
                    fontSize: "20px",
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
            </>
          )}

          {/* INSUFFICIENT BALANCE */}
          {selectedPlayers.length > 0 &&
            !hasEnoughBalance &&
            !ticket?.locked && (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: "15px",
                  borderRadius: "14px",
                  marginTop: "20px",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                Your selections exceed your
                available balance.
              </div>
            )}

          {/* PLACE BET */}
          {!ticket?.locked && (
            <button
              onClick={handlePlaceBet}
              disabled={
                selectedPlayers.length ===
                  0 ||
                !hasEnoughBalance
              }
              style={{
                width: "100%",
                marginTop: "22px",
                padding: "18px",
                borderRadius: "16px",
                border: "none",
                background:
                  selectedPlayers.length >
                    0 &&
                  hasEnoughBalance
                    ? "#166534"
                    : "#d1d5db",
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "900",
                cursor:
                  selectedPlayers.length >
                    0 &&
                  hasEnoughBalance
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              ✓ PLACE BET
            </button>
          )}

          {/* LOCKED CONFIRMATION */}
          {ticket?.locked && (
            <>
              <div
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "20px",
                  borderRadius: "16px",
                  marginTop: "22px",
                  textAlign: "center",
                  fontWeight: "800",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    marginBottom: "6px",
                  }}
                >
                  ✓ BETS PLACED
                </div>

                <div>
                  Your ticket is locked and
                  final.
                </div>
              </div>

              <button
                onClick={handleViewTicket}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "18px",
                  borderRadius: "16px",
                  border:
                    "3px solid #166534",
                  background: "#ffffff",
                  color: "#166534",
                  fontSize: "20px",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
              >
                🧾 VIEW MY TICKET
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}