import fs from "fs"
import path from "path"
import crypto from "crypto"

const TOKENS_FILE = path.join(process.cwd(), "src/data/manor-tokens.json")

export interface TokenRecord {
  token: string
  email: string
  name: string
  createdAt: string
  used: boolean
  usedAt?: string
}

type TokenStore = Record<string, TokenRecord>

function readStore(): TokenStore {
  try {
    const raw = fs.readFileSync(TOKENS_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function writeStore(store: TokenStore): void {
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(store, null, 2), "utf-8")
}

export function createToken(email: string, name: string): string {
  const token = crypto.randomUUID()
  const store = readStore()
  store[token] = {
    token,
    email,
    name,
    createdAt: new Date().toISOString(),
    used: false,
  }
  writeStore(store)
  return token
}

export function isTokenValid(token: string): boolean {
  const store = readStore()
  const record = store[token]
  return !!record && !record.used
}

export function consumeToken(token: string): TokenRecord | null {
  const store = readStore()
  const record = store[token]
  if (!record || record.used) return null
  record.used = true
  record.usedAt = new Date().toISOString()
  writeStore(store)
  return record
}

export function listTokens(): TokenRecord[] {
  const store = readStore()
  return Object.values(store).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}
