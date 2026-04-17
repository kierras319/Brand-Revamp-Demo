"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
import { SCENES, CHAPTER_NAMES, type GameScene, type EndingScene } from "@/lib/manor-scenes"
import { useManorAudio } from "@/hooks/useManorAudio"

const LABELS = ["A", "B", "C", "D"]
type Phase = "splash" | "game" | "ending" | "error"

const BASE = "https://images.unsplash.com"
const SCENE_IMAGES: Record<string, string> = {
  arrival:              `${BASE}/photo-1519682337058-a94d519337bc?w=1200&h=800&fit=crop&q=80`,
  foyer_note:           `${BASE}/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=80`,
  hallway_glimpse:      `${BASE}/photo-1512820790803-83ca734da794?w=1200&h=800&fit=crop&q=80`,
  victoria_wrist:       `${BASE}/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop&q=80`,
  edward_reaction:      `${BASE}/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80`,
  victoria_plan:        `${BASE}/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop&q=80`,
  library_plan:         `${BASE}/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=80`,
  dining_room:          `${BASE}/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80`,
  dining_note:          `${BASE}/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80`,
  marcus_watch:         `${BASE}/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80`,
  bedroom_night:        `${BASE}/photo-1519682337058-a94d519337bc?w=1200&h=800&fit=crop&q=80`,
  call_help:            `${BASE}/photo-1484704849700-f032a568e944?w=1200&h=800&fit=crop&q=80`,
  east_wing:            `${BASE}/photo-1476275466078-4007374efbbe?w=1200&h=800&fit=crop&q=80`,
  library_early:        `${BASE}/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=80`,
  library_midnight:     `${BASE}/photo-1512820790803-83ca734da794?w=1200&h=800&fit=crop&q=80`,
  study_trap:           `${BASE}/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80`,
  truth_journal:        `${BASE}/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&q=80`,
  escape_ending:        `${BASE}/photo-1519682337058-a94d519337bc?w=1200&h=800&fit=crop&q=80`,
  evidence_ending:      `${BASE}/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&q=80`,
  truth_ending:         `${BASE}/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&q=80`,
  trapped_ending:       `${BASE}/photo-1476275466078-4007374efbbe?w=1200&h=800&fit=crop&q=80`,
  confrontation_ending: `${BASE}/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80`,
  morning_ending:       `${BASE}/photo-1494790108755-2616b612b1e0?w=1200&h=800&fit=crop&q=80`,
  splash:               `${BASE}/photo-1519682337058-a94d519337bc?w=1200&h=800&fit=crop&q=80`,
}

const HOPEFUL_ENDINGS = new Set(["escape_ending", "evidence_ending", "truth_ending", "morning_ending"])

interface ManorGameProps {
  token: string | null
  invalidReason: "no-token" | "used-or-invalid" | null
}

export function ManorGame({ token, invalidReason }: ManorGameProps) {
  const [phase, setPhase]               = useState<Phase>(invalidReason ? "error" : "splash")
  const [sceneCount, setSceneCount]     = useState(0)
  const [currentScene, setCurrentScene] = useState<GameScene | null>(null)
  const [currentEnding, setCurrentEnding] = useState<EndingScene | null>(null)
  const [currentSceneId, setCurrentSceneId] = useState<string>("splash")
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isConsuming, setIsConsuming]   = useState(false)
  const [wrapFading, setWrapFading]     = useState(false)

  // Two-slot background crossfade
  const [bgSlot, setBgSlot]   = useState<0 | 1>(0)
  const [bgUrls, setBgUrls]   = useState<[string, string]>([
    SCENE_IMAGES["splash"], "",
  ])

  const { playDoorCreak, playPageTurn, playChoiceClick, playEndingSting, muted, toggleMute } = useManorAudio()
  const shareEndingIdRef = useRef<string>("")

  function changeBg(sceneId: string) {
    const url = SCENE_IMAGES[sceneId] ?? SCENE_IMAGES["splash"]
    const nextSlot: 0 | 1 = bgSlot === 0 ? 1 : 0
    setBgUrls(prev => {
      const next: [string, string] = [prev[0], prev[1]]
      next[nextSlot] = url
      return next
    })
    setBgSlot(nextSlot)
  }

  const goToScene = useCallback((sceneId: string, count: number) => {
    const scene = SCENES[sceneId]
    if (!scene) return

    if (scene.type === "ending") {
      setCurrentEnding(scene as EndingScene)
      setCurrentSceneId(sceneId)
      shareEndingIdRef.current = sceneId
      changeBg(sceneId)
      setPhase("ending")
      const stingType = HOPEFUL_ENDINGS.has(sceneId) ? "hopeful" : "tense"
      setTimeout(() => playEndingSting(stingType), 400)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    setCurrentScene(scene as GameScene)
    setCurrentSceneId(sceneId)
    setSelectedChoice(null)
    changeBg(sceneId)
    window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgSlot, bgUrls, playEndingSting])

  const handleEnter = useCallback(async () => {
    if (!token || isConsuming) return
    setIsConsuming(true)
    playDoorCreak()

    try {
      const res = await fetch("/api/manor/consume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) { setPhase("error"); return }

      setSceneCount(1)
      const firstScene = SCENES["arrival"] as GameScene
      setCurrentScene(firstScene)
      setCurrentSceneId("arrival")
      changeBg("arrival")
      setPhase("game")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setPhase("error")
    } finally {
      setIsConsuming(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isConsuming, playDoorCreak, bgSlot, bgUrls])

  const handleChoice = useCallback((choiceIndex: number, nextId: string) => {
    if (isTransitioning) return
    setSelectedChoice(choiceIndex)
    setIsTransitioning(true)
    playChoiceClick()

    setTimeout(() => {
      playPageTurn()
      setWrapFading(true)
      setTimeout(() => {
        const nextCount = sceneCount + 1
        setSceneCount(nextCount)
        goToScene(nextId, nextCount)
        setWrapFading(false)
        setIsTransitioning(false)
      }, 320)
    }, 380)
  }, [isTransitioning, sceneCount, goToScene, playChoiceClick, playPageTurn])

  const handleRestart = useCallback(() => {
    setSceneCount(1)
    setCurrentEnding(null)
    setSelectedChoice(null)
    const firstScene = SCENES["arrival"] as GameScene
    setCurrentScene(firstScene)
    setCurrentSceneId("arrival")
    changeBg("arrival")
    setPhase("game")
    window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgSlot, bgUrls])

  const handleShare = useCallback(() => {
    const ending = currentEnding
    if (!ending) return
    const shareText = `I just played The Manor — a digital escape room.\n\nMy ending: "${ending.title}" [${ending.badge}]\n\nThere are six possible endings. Which one will you get?`
    if (navigator.share) {
      navigator.share({ title: "The Manor — Digital Escape Room", text: shareText }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText).catch(() => {})
    }
  }, [currentEnding])

  const progress   = Math.min((sceneCount / 7) * 100, 94)
  const chapterLabel = CHAPTER_NAMES[Math.min(sceneCount - 1, CHAPTER_NAMES.length - 1)] || "Arrival"

  return (
    <div className="manor-root">

      {/* Atmospheric background image — two-slot crossfade */}
      <div
        className="scene-bg"
        style={{ backgroundImage: bgUrls[0] ? `url(${bgUrls[0]})` : "none", opacity: bgSlot === 0 ? 1 : 0 }}
      />
      <div
        className="scene-bg"
        style={{ backgroundImage: bgUrls[1] ? `url(${bgUrls[1]})` : "none", opacity: bgSlot === 1 ? 1 : 0 }}
      />

      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />

      {/* Mute toggle — visible during game and ending */}
      {(phase === "game" || phase === "ending" || phase === "splash") && (
        <button
          className="mute-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>
      )}

      {/* ERROR */}
      {phase === "error" && (
        <div className="manor-screen manor-error">
          <div>
            <div className="error-icon">🔒</div>
            <h1 className="error-title">The Door Is Closed</h1>
            <p className="error-text">
              {invalidReason === "no-token"
                ? "No access token was provided. You'll need a valid invitation link to enter the manor."
                : "This access link has already been used or is no longer valid. Each link permits a single playthrough."}
            </p>
            <Link href="/shop" className="error-link">Return to the Shop</Link>
          </div>
        </div>
      )}

      {/* SPLASH */}
      {phase === "splash" && (
        <div className="manor-screen manor-splash">
          <div className="candle candle--left" aria-hidden="true">
            <div className="candle__flame" />
            <div className="candle__body" />
          </div>
          <div className="candle candle--right" aria-hidden="true">
            <div className="candle__flame" />
            <div className="candle__body" />
          </div>
          <div className="splash-content">
            <span className="crest" aria-hidden="true">✦</span>
            <h1 className="manor-title">THE MANOR</h1>
            <p className="manor-estate">Blackthorn Estate &nbsp;·&nbsp; An Immersive Mystery</p>
            <div className="ornate-rule" aria-hidden="true">
              <span>⬥</span><span className="rule-line" /><span>⬥</span><span className="rule-line" /><span>⬥</span>
            </div>
            <p className="manor-tagline">
              You have been summoned to Blackthorn Manor.<br />
              Old friends. Old secrets. One of them is lying.<br /><br />
              Can you find the truth before the truth finds you?
            </p>
            <p className="manor-meta">Multiple endings &nbsp;·&nbsp; Trust no one &nbsp;·&nbsp; Every choice matters</p>
            <button className="btn-primary" onClick={handleEnter} disabled={isConsuming}>
              {isConsuming ? "Unlocking…" : "Enter the Manor"}
            </button>
            <p className="splash-warning" aria-hidden="true">⚠ Once you enter, the door locks behind you.</p>
          </div>
        </div>
      )}

      {/* GAME */}
      {phase === "game" && currentScene && (
        <div className="manor-screen manor-game">
          <div
            className="game-wrap"
            style={{
              opacity:    wrapFading ? 0 : 1,
              transform:  wrapFading ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="game-header">
              <span className="location-pill">{currentScene.room}</span>
              <span className="time-stamp">{currentScene.time}</span>
            </div>

            {/* Scene image strip */}
            <div
              className="scene-strip"
              style={{ backgroundImage: `url(${SCENE_IMAGES[currentSceneId] ?? ""})` }}
              aria-hidden="true"
            />

            <div className="scene-body">
              <p className="scene-text">{currentScene.text}</p>
              {currentScene.obs && (
                <div className="observation-box">
                  <span className="obs-icon" aria-hidden="true">{currentScene.obs.icon}</span>
                  <p className="obs-text">{currentScene.obs.text}</p>
                </div>
              )}
              {currentScene.question && (
                <p className="scene-question">{currentScene.question}</p>
              )}
            </div>

            <div className="choices-container" role="group" aria-label="Your choices">
              {currentScene.choices.map((choice, i) => (
                <button
                  key={i}
                  className={`choice-btn${selectedChoice === i ? " selected" : ""}`}
                  style={{ animationDelay: `${(i * 0.12) + 0.25}s` }}
                  disabled={isTransitioning}
                  aria-label={`Choice ${LABELS[i]}: ${choice.text}`}
                  onClick={() => handleChoice(i, choice.next)}
                >
                  <span className="choice-letter" aria-hidden="true">{LABELS[i]}</span>
                  <span className="choice-text">{choice.text}</span>
                </button>
              ))}
            </div>

            <footer className="game-footer">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="chapter-label">{chapterLabel}</span>
            </footer>
          </div>
        </div>
      )}

      {/* ENDING */}
      {phase === "ending" && currentEnding && (
        <div className="manor-screen manor-ending">
          <div className="ending-wrap">
            <div className="ending-icon" aria-hidden="true">{currentEnding.icon}</div>
            <div className="ending-badge">{currentEnding.badge}</div>
            <h2 className="ending-title">{currentEnding.title}</h2>
            <div className="ornate-rule" aria-hidden="true">
              <span>⬥</span><span className="rule-line" /><span>⬥</span><span className="rule-line" /><span>⬥</span>
            </div>
            <p className="ending-text">{currentEnding.text}</p>
            <blockquote className="ending-note">{currentEnding.note}</blockquote>
            <div className="ending-actions">
              <button className="btn-primary" onClick={handleRestart}>Begin Again</button>
              <button className="btn-secondary" onClick={handleShare}>Share Your Ending</button>
            </div>
            <p className="ending-cta">There are six possible endings. What did you miss?</p>
          </div>
        </div>
      )}
    </div>
  )
}
