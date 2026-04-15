"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import BackButton from "@/src/components/BackButton"
import SocialFooter from "@/src/components/Socials"

type Item = {
  name: string
  price: number
  image: string
}

export default function MerchPage() {
  const items: Item[] = [
    {
      name: "SLGC Black Polo",
      price: 40,
      image: "/merch/black.png",
    },
    {
      name: "SLGC Green Polo",
      price: 40,
      image: "/merch/green.png",
    },
    {
      name: "SLGC Navy Polo",
      price: 40,
      image: "/merch/navy.png",
    },
        {
      name: "SLGC Gray Polo",
      price: 40,
      image: "/merch/gray.png",
    },
    {
      name: "SLGC Pink Polo",
      price: 40,
      image: "/merch/pink.png",
    },
    {
      name: "SLGC Maroon Polo",
      price: 40,
      image: "/merch/maroon.png",
    },
        {
      name: "SLGC White Polo",
      price: 40,
      image: "/merch/white.png",
    },
    {
      name: "SLGC Cloudy Blues Polo",
      price: 40,
      image: "/merch/cloudyblues.png",
    },
        {
      name: "SLGC Dinosaurs Polo",
      price: 40,
      image: "/merch/dinosaurs.png",
    },
    {
      name: "SLGC Flamingo Polo",
      price: 40,
      image: "/merch/flamingo.png",
    },
    {
      name: "SLGC Gray Floral Polo",
      price: 40,
      image: "/merch/grayfloral.png",
    },
  ]

  const [selectedSizes, setSelectedSizes] = useState<{
    [key: number]: string
  }>({})

  async function handleOrder(item: Item, index: number) {
    const size = selectedSizes[index]

    if (!size) {
      alert("Select a size")
      return
    }

    const { data: userData } = await supabase.auth.getUser()

    const name =
      userData?.user?.user_metadata?.name ||
      userData?.user?.email ||
      "Player"

    const { error } = await supabase.from("orders").insert([
      {
        player_name: name,
        item_name: item.name,
        size: size,
      },
    ])

    if (error) {
      console.error(error)
      alert("Error placing order")
    } else {
      alert("Order placed ✅")
    }
  }

  return (
    <div
      style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
    <BackButton />

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "8px",
          color:"green"
        }}
      >
        👕 SLGC Merch
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#666",
        }}
      >
        Rep the league.
      </p>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#f9f9f9",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "180px",
              marginBottom: "16px",
            }}
          />

          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {item.name}
          </div>

          <div
            style={{
              fontSize: "18px",
              marginBottom: "12px",
            }}
          >
            ${item.price}
          </div>

          {/* SIZE SELECT */}
          <select
            value={selectedSizes[i] || ""}
            onChange={(e) =>
              setSelectedSizes({
                ...selectedSizes,
                [i]: e.target.value,
              })
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "12px",
              width: "60%",
            }}
          >
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
          </select>

          {/* ORDER BUTTON */}
          <button
            onClick={() => handleOrder(item, i)}
            style={{
              width: "50%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#16a34a",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </div>
      ))}
        <SocialFooter />
    </div>
  )
}