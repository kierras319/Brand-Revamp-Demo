"use client"

import { useRef, useCallback, useState } from "react"

export function useManorAudio() {
  const ctxRef = useRef<AudioContext | null>(null)
  const [muted, setMuted] = useState(false)
  const mutedRef = useRef(false)

  function getCtx(): AudioContext | null {
    if (typeof window === "undefined") return null
    try {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        ctxRef.current = new Ctx()
      }
      if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume().catch(() => {})
      }
      return ctxRef.current
    } catch {
      return null
    }
  }

  // Heavy oak door grinding open
  const playDoorCreak = useCallback(() => {
    if (mutedRef.current) return
    const ctx = getCtx()
    if (!ctx) return
    try {
      const now = ctx.currentTime

      const osc1 = ctx.createOscillator()
      osc1.type = "sawtooth"
      osc1.frequency.setValueAtTime(190, now)
      osc1.frequency.exponentialRampToValueAtTime(52, now + 1.6)

      const osc2 = ctx.createOscillator()
      osc2.type = "square"
      osc2.frequency.setValueAtTime(140, now + 0.15)
      osc2.frequency.exponentialRampToValueAtTime(38, now + 1.6)

      const filter = ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(280, now)
      filter.frequency.exponentialRampToValueAtTime(95, now + 1.6)
      filter.Q.value = 9

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.20, now + 0.1)
      gain.gain.setValueAtTime(0.16, now + 0.6)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7)

      osc1.connect(filter); osc2.connect(filter)
      filter.connect(gain); gain.connect(ctx.destination)
      osc1.start(now); osc1.stop(now + 1.7)
      osc2.start(now + 0.15); osc2.stop(now + 1.7)
    } catch {}
  }, [])

  // Dry paper rustle + low footstep thud — scene transitions
  const playPageTurn = useCallback(() => {
    if (mutedRef.current) return
    const ctx = getCtx()
    if (!ctx) return
    try {
      const now = ctx.currentTime

      // Paper rustle
      const bufLen = Math.floor(ctx.sampleRate * 0.14)
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.035))
      }
      const noise = ctx.createBufferSource()
      noise.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = "bandpass"; bp.frequency.value = 2800; bp.Q.value = 1.5
      const ng = ctx.createGain(); ng.gain.value = 0.22
      noise.connect(bp); bp.connect(ng); ng.connect(ctx.destination)
      noise.start(now)

      // Footstep thud
      const osc = ctx.createOscillator()
      osc.type = "sine"
      osc.frequency.setValueAtTime(88, now + 0.06)
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.38)
      const tg = ctx.createGain()
      tg.gain.setValueAtTime(0.25, now + 0.06)
      tg.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.connect(tg); tg.connect(ctx.destination)
      osc.start(now + 0.06); osc.stop(now + 0.42)
    } catch {}
  }, [])

  // Parchment click — choosing an option
  const playChoiceClick = useCallback(() => {
    if (mutedRef.current) return
    const ctx = getCtx()
    if (!ctx) return
    try {
      const now = ctx.currentTime
      const bufLen = Math.floor(ctx.sampleRate * 0.055)
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < bufLen; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.010))
      }
      const src = ctx.createBufferSource()
      src.buffer = buf
      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"; filter.frequency.value = 650; filter.Q.value = 3.5
      const gain = ctx.createGain(); gain.gain.value = 0.32
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination)
      src.start(now)
    } catch {}
  }, [])

  // Ending reveal sting — bass drone + harmonic
  const playEndingSting = useCallback((type: "tense" | "hopeful" = "tense") => {
    if (mutedRef.current) return
    const ctx = getCtx()
    if (!ctx) return
    try {
      const now = ctx.currentTime

      const bass = ctx.createOscillator()
      bass.type = "sine"; bass.frequency.value = 55
      const bassG = ctx.createGain()
      bassG.gain.setValueAtTime(0, now)
      bassG.gain.linearRampToValueAtTime(0.22, now + 0.7)
      bassG.gain.setValueAtTime(0.18, now + 2.5)
      bassG.gain.exponentialRampToValueAtTime(0.001, now + 5.5)
      bass.connect(bassG); bassG.connect(ctx.destination)
      bass.start(now); bass.stop(now + 5.5)

      const interval = type === "hopeful" ? 82.4 : 73.4
      const mid = ctx.createOscillator()
      mid.type = "sine"; mid.frequency.value = interval
      const midG = ctx.createGain()
      midG.gain.setValueAtTime(0, now + 0.6)
      midG.gain.linearRampToValueAtTime(0.11, now + 1.3)
      midG.gain.exponentialRampToValueAtTime(0.001, now + 5.5)
      mid.connect(midG); midG.connect(ctx.destination)
      mid.start(now + 0.6); mid.stop(now + 5.5)

      if (type === "hopeful") {
        const bell = ctx.createOscillator()
        bell.type = "sine"; bell.frequency.value = 440
        const bellG = ctx.createGain()
        bellG.gain.setValueAtTime(0, now + 1.8)
        bellG.gain.linearRampToValueAtTime(0.07, now + 2.0)
        bellG.gain.exponentialRampToValueAtTime(0.001, now + 4.5)
        bell.connect(bellG); bellG.connect(ctx.destination)
        bell.start(now + 1.8); bell.stop(now + 4.5)
      }
    } catch {}
  }, [])

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current
    setMuted(m => !m)
  }, [])

  return { playDoorCreak, playPageTurn, playChoiceClick, playEndingSting, muted, toggleMute }
}
