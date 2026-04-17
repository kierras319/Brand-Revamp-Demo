import { listTokens } from "@/lib/manor-tokens"
import { IssueTokenForm } from "./IssueTokenForm"

interface PageProps {
  searchParams: Promise<{ secret?: string }>
}

export default async function AdminManorPage({ searchParams }: PageProps) {
  const { secret } = await searchParams
  const adminSecret = process.env.ADMIN_MANOR_SECRET

  if (!adminSecret || secret !== adminSecret) {
    return (
      <div style={{ padding: "60px 24px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Access Denied</h1>
        <p style={{ color: "#666" }}>Invalid or missing admin secret.</p>
      </div>
    )
  }

  const tokens = listTokens()

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>The Manor — Admin</h1>
      <p style={{ color: "#666", marginBottom: 32, fontSize: 14 }}>
        Issue one-time access tokens for The Manor digital escape room.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Issue New Token</h2>
        <IssueTokenForm />
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          All Tokens ({tokens.length})
        </h2>
        {tokens.length === 0 ? (
          <p style={{ color: "#999", fontSize: 14 }}>No tokens issued yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280" }}>Name</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280" }}>Email</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280" }}>Issued</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", color: "#6b7280" }}>Used At</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map(t => (
                  <tr key={t.token} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500 }}>{t.name}</td>
                    <td style={{ padding: "10px 12px", color: "#374151" }}>{t.email}</td>
                    <td style={{ padding: "10px 12px", color: "#6b7280" }}>
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 9999,
                        fontSize: 11,
                        fontWeight: 600,
                        background: t.used ? "#fee2e2" : "#dcfce7",
                        color: t.used ? "#991b1b" : "#166534",
                      }}>
                        {t.used ? "USED" : "ACTIVE"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#9ca3af" }}>
                      {t.usedAt ? new Date(t.usedAt).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
