"use client"

import { useState } from "react"

export function IssueTokenForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ accessUrl: string; emailSent: boolean } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch("/api/manor/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.error || "Failed to issue token")
        return
      }

      setResult({ accessUrl: data.accessUrl, emailSent: data.emailSent })
      setName("")
      setEmail("")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function copyLink() {
    if (!result) return
    await navigator.clipboard.writeText(result.accessUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            Customer Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Jane Smith"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 14,
            }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
            Customer Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="customer@example.com"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 4,
              fontSize: 14,
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 24px",
            background: "#c9a84c",
            color: "#07070f",
            border: "none",
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Issuing…" : "Issue Access Token"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#fee2e2", borderRadius: 4, fontSize: 14, color: "#991b1b" }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 16, padding: "14px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 4 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 8 }}>
            ✓ Token issued{result.emailSent ? " and email sent" : " (email not configured — copy link manually)"}
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <code style={{ flex: 1, fontSize: 12, padding: "6px 10px", background: "#f1f5f9", borderRadius: 3, wordBreak: "break-all" }}>
              {result.accessUrl}
            </code>
            <button
              onClick={copyLink}
              style={{
                padding: "6px 12px",
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: 3,
                fontSize: 12,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
