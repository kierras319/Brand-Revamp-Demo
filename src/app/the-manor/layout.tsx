import type { Metadata } from "next"
import "./manor.css"

export const metadata: Metadata = {
  title: "The Manor — Blackthorn Estate | Keke Writes Thrillers",
  description: "An immersive digital escape room. Old friends. Old secrets. One of them is lying.",
}

export default function ManorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
