import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export default function SocialFooter() {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "30px",
        padding: "40px 20px",
        borderTop: "1px solid #e5e5e5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
        Stay Connected
      </h2>

      {/* Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px", // 🔥 controls spacing
          marginBottom: "30px",
        }}
      >
        <a href="https://www.facebook.com/groups/6507831649229649" target="_blank">
          <FaFacebookF size={40} />
        </a>

        <a href="https://instagram.com/stoplee25golfclub" target="_blank">
          <FaInstagram size={40} />
        </a>

        <a href="https://x.com/StopLeeGC" target="_blank">
          <FaXTwitter size={40} />
        </a>

      </div>

      {/* Text */}
      <p
        style={{
          color: "#555",
          fontSize: "16px",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      >
        Join the conversation. Share your rounds, wins, and moments with us.
      </p>

      {/* Button */}
        <a
          href="mailto:stopleegc@gmail.com?subject=SLGC Inquiry&body=Hi SLGC,"
          style={{
            backgroundColor: "#166534",
            color: "white",
            padding: "12px 24px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: "600",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Contact Us
        </a>
    </div>
  );
}