"use client";

import { useState } from "react";
import BackButton from "@/src/components/BackButton";
import SocialFooter from "@/src/components/Socials";
import { bettingLines } from "@/src/data/bettingLines";

export default function BettingLinesPage() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1>Prediction Center</h1>
      <p>Betting Lines</p>
    </div>
  );
}