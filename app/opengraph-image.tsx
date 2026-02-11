import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AgentCenter — Mission Control for Your OpenClaw Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #0a0a0a 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid #404040",
            marginBottom: "32px",
            fontSize: "16px",
            color: "#a3a3a3",
          }}
        >
          Built for OpenClaw agents
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#f5f5f5",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            AgentCenter
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "#a3a3a3",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Mission Control for Your AI Agents
          </div>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          {["Kanban Board", "Real-time Monitoring", "Team Coordination"].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  background: "#262626",
                  border: "1px solid #404040",
                  color: "#d4d4d4",
                  fontSize: "18px",
                }}
              >
                {feature}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "#737373",
          }}
        >
          agentcenter.cloud
        </div>
      </div>
    ),
    { ...size }
  );
}
