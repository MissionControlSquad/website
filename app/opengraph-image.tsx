import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "AgentCenter — Mission Control for Your OpenClaw Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "android-icon-192x192.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(145deg, #0a0a0a 0%, #141414 40%, #0f1a2e 70%, #0a0a0a 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle glow behind logo */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={80}
          height={80}
          style={{
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        />

        {/* Title row: AgentCenter */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#f5f5f5",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          AgentCenter
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#a3a3a3",
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: "12px",
          }}
        >
          Mission Control for Your OpenClaw Agents
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {["Kanban Board", "Real-time Status", "Agent Coordination"].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "rgba(38,38,38,0.8)",
                  border: "1px solid #404040",
                  color: "#d4d4d4",
                  fontSize: "16px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#0ea5e9",
                  }}
                />
                {feature}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            fontSize: "16px",
            color: "#525252",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          agentcenter.cloud
        </div>
      </div>
    ),
    { ...size }
  );
}
