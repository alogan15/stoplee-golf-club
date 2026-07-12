import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export default function SocialFooter() {
  return (
    <footer
      style={{
        width: "100%",
        marginTop: "20px",
        padding: "28px 20px 24px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Stay Connected
      </h2>

      {/* Icons */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          marginBottom: "20px",
        }}
      >
        <a
          href="https://www.facebook.com/groups/6507831649229649"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#166534" }}
        >
          <FaFacebookF size={34} />
        </a>

        <a
          href="https://instagram.com/stoplee25golfclub"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#166534" }}
        >
          <FaInstagram size={34} />
        </a>

        <a
          href="https://x.com/StopLeeGC"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#166534" }}
        >
          <FaXTwitter size={34} />
        </a>
      </div>

      {/* Description */}
      <p
        style={{
          color: "#6b7280",
          fontSize: "15px",
          lineHeight: "1.6",
          maxWidth: "340px",
          marginBottom: "20px",
        }}
      >
        Join the conversation. Share your rounds, victories, and unforgettable
        moments with the league.
      </p>

      {/* Contact Button */}
      <a
        href="mailto:stopleegc@gmail.com?subject=SLGC Inquiry&body=Hi SLGC,"
        style={{
          background: "#166534",
          color: "white",
          padding: "10px 28px",
          borderRadius: "999px",
          fontSize: "17px",
          fontWeight: "600",
          textDecoration: "none",
          marginBottom: "28px",
        }}
      >
        Contact Us
      </a>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "1px",
          background: "#e5e7eb",
          marginBottom: "20px",
        }}
      />

      {/* Credits */}
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        © 2026 StopLee Golf Club
      </p>

      <p
        style={{
          margin: "8px 0 0",
          fontSize: "14px",
          color: "#374151",
        }}
      >
        Built & Designed by <strong>Andrè Logan</strong>
      </p>

      <p
        style={{
          margin: "4px 0 0",
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        From London to Paris LLC
      </p>



      <p
        style={{
          marginTop: "10px",
          fontSize: "11px",
          color: "#9ca3af",
        }}
      >
        Version 2.0
      </p>
    </footer>
  );
}