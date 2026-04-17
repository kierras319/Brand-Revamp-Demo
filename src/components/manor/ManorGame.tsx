"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { SCENES, CHAPTER_NAMES, type GameScene, type EndingScene } from "@/lib/manor-scenes"

const LABELS = ["A", "B", "C", "D"]

type Phase = "splash" | "game" | "ending" | "error"

interface ManorGameProps {
  token: string | null
  invalidReason: "no-token" | "used-or-invalid" | null
}

export function ManorGame({ token, invalidReason }: ManorGameProps) {
  const [phase, setPhase] = useState<Phase>(invalidReason ? "error" : "splash")
  const [sceneCount, setSceneCount] = useState(0)
  const [currentScene, setCurrentScene] = useState<GameScene | null>(null)
  const [currentEnding, setCurrentEnding] = useState<EndingScene | null>(null)
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isConsuming, setIsConsuming] = useState(false)
  const [wrapFading, setWrapFading] = useState(false)

  const goToScene = useCallback((sceneId: string, count: number) => {
    const scene = SCENES[sceneId]
    if (!scene) return

    if (scene.type === "ending") {
      setCurrentEnding(scene as EndingScene)
      setPhase("ending")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    setCurrentScene(scene as GameScene)
    setSelectedChoice(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleEnter = useCallback(async () => {
    if (!token || isConsuming) return
    setIsConsuming(true)

    try {
      const res = await fetch("/api/manor/consume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (!res.ok) {
        setPhase("error")
        return
      }

      setSceneCount(1)
      const firstScene = SCENES["arrival"] as GameScene
      setCurrentScene(firstScene)
      setPhase("game")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setPhase("error")
    } finally {
      setIsConsuming(false)
    }
  }, [token, isConsuming])

  const handleChoice = useCallback((choiceIndex: number, nextId: string) => {
    if (isTransitioning) return
    setSelectedChoice(choiceIndex)
    setIsTransitioning(true)

    setTimeout(() => {
      setWrapFading(true)
      setTimeout(() => {
        const nextCount = sceneCount + 1
        setSceneCount(nextCount)
        goToScene(nextId, nextCount)
        setWrapFading(false)
        setIsTransitioning(false)
      }, 320)
    }, 380)
  }, [isTransitioning, sceneCount, goToScene])

  const handleRestart = useCallback(() => {
    setSceneCount(1)
    setCurrentEnding(null)
    setSelectedChoice(null)
    const firstScene = SCENES["arrival"] as GameScene
    setCurrentScene(firstScene)
    setPhase("game")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleShare = useCallback(() => {
    if (!currentEnding) return
    const shareText = `I just played The Manor — a digital escape room.\n\nMy ending: "${currentEnding.title}" [${currentEnding.badge}]\n\nThere are six possible endings. Which one will you get?`

    if (navigator.share) {
      navigator.share({ title: "The Manor — Digital Escape Room", text: shareText }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText).catch(() => {})
    }
  }, [currentEnding])

  const progress = Math.min((sceneCount / 7) * 100, 94)
  const chapterLabel = CHAPTER_NAMES[Math.min(sceneCount - 1, CHAPTER_NAMES.length - 1)] || "Arrival"

  return (
    <div className="manor-root">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />

      {/* ERROR PHASE */}
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

      {/* SPLASH PHASE */}
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
              <span>⬥</span>
              <span className="rule-line" />
              <span>⬥</span>
              <span className="rule-line" />
              <span>⬥</span>
            </div>
            <p className="manor-tagline">
              You have been summoned to Blackthorn Manor.<br />
              Old friends. Old secrets. One of them is lying.<br /><br />
              Can you find the truth before the truth finds you?
            </p>
            <p className="manor-meta">Multiple endings &nbsp;·&nbsp; Trust no one &nbsp;·&nbsp; Every choice matters</p>
            <button
              className="btn-primary"
              onClick={handleEnter}
              disabled={isConsuming}
            >
              {isConsuming ? "Unlocking…" : "Enter the Manor"}
            </button>
            <p className="splash-warning" aria-hidden="true">⚠ Once you enter, the door locks behind you.</p>
          </div>
        </div>
      )}

      {/* GAME PHASE */}
      {phase === "game" && currentScene && (
        <div className="manor-screen manor-game">
          <div
            className="game-wrap"
            style={{
              opacity: wrapFading ? 0 : 1,
              transform: wrapFading ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="game-header">
              <span className="location-pill">{currentScene.room}</span>
              <span className="time-stamp">{currentScene.time}</span>
            </div>

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

      {/* ENDING PHASE */}
      {phase === "ending" && currentEnding && (
        <div className="manor-screen manor-ending">
          <div className="ending-wrap">
            <div className="ending-icon" aria-hidden="true">{currentEnding.icon}</div>
            <div className="ending-badge">{currentEnding.badge}</div>
            <h2 className="ending-title">{currentEnding.title}</h2>
            <div className="ornate-rule" aria-hidden="true">
              <span>⬥</span>
              <span className="rule-line" />
              <span>⬥</span>
              <span className="rule-line" />
              <span>⬥</span>
            </div>
            <p className="ending-text">{currentEnding.text}</p>
            <blockquote className="ending-note">{currentEnding.note}</blockquote>
            <div className="ending-actions">
              <button className="btn-primary" onClick={handleRestart}>
                Begin Again
              </button>
              <button className="btn-secondary" onClick={handleShare}>
                Share Your Ending
              </button>
            </div>
            <p className="ending-cta">
              There are six possible endings. What did you miss?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
