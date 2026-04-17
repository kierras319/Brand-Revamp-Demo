export interface SceneChoice {
  text: string
  next: string
}

export interface SceneObservation {
  icon: string
  text: string
}

export interface GameScene {
  type?: never
  room: string
  time: string
  text: string
  obs?: SceneObservation
  question: string
  choices: SceneChoice[]
}

export interface EndingScene {
  type: "ending"
  icon: string
  badge: string
  title: string
  text: string
  note: string
}

export type Scene = GameScene | EndingScene

export const CHAPTER_NAMES = [
  "Arrival", "The First Hour", "Deeper In",
  "The Turn", "The Reckoning", "The Truth", "The End",
]

export const SCENES: Record<string, Scene> = {

  // ACT I: ARRIVAL

  arrival: {
    room: "The Grand Entrance",
    time: "Friday, 7:43 PM",
    text: `Rain hammers the stained glass above the door as Victoria Blackthorn pulls it open before you can knock. You haven't seen her in seven years. She is thinner than you remember, and the smile she gives you is practiced — stretched a half-second too long, the way a word sounds strange when you repeat it too many times. Behind her, the manor breathes cold air. "Did you come alone?" she asks.`,
    obs: {
      icon: "👁️",
      text: "You notice: A pale yellow bruise circles her left wrist like a bracelet — someone's grip, faded but not forgotten.",
    },
    question: "How do you respond?",
    choices: [
      { text: "Step inside and study her face before answering.", next: "foyer_note" },
      { text: "Glance past her shoulder into the house before you say anything.", next: "hallway_glimpse" },
      { text: "Say nothing. Take her hand gently. Let her know you see the bruise.", next: "victoria_wrist" },
    ],
  },

  foyer_note: {
    room: "The Grand Entrance — Foyer",
    time: "Friday, 7:44 PM",
    text: `The hallway is long and dark: mahogany panels, oil portraits, a grandfather clock frozen at 11:52. The butler materialises from a doorway — how long has he been there? — and announces dinner at eight. You're about to follow when something catches your eye. Folded beneath the hallway runner: a scrap of paper. Victoria's handwriting, unmistakeable from a hundred passed notes in Sociology 101. The visible words: Don't go to the library after—`,
    obs: {
      icon: "📝",
      text: "The note has been torn. Deliberately. Someone did not want you to finish reading it.",
    },
    question: "The butler is watching you. What do you do?",
    choices: [
      { text: "Slide the note into your sleeve without breaking eye contact with the butler.", next: "dining_note" },
      { text: "Leave it untouched. Follow the butler to dinner and appear perfectly calm.", next: "dining_room" },
      { text: `Ask the butler directly: "Do you know who left this?"`, next: "dining_room" },
    ],
  },

  hallway_glimpse: {
    room: "The East Hallway",
    time: "Friday, 7:45 PM",
    text: `A man stands at the far end of the corridor. Tall, perfectly still, facing away. He didn't turn when the door opened — which means he heard you arrive and chose not to acknowledge it. Victoria says, too brightly: "That's Edward. My husband." He turns slowly. His smile shows all his teeth. He crosses toward you with the unhurried ease of a man who has never been told no. "Welcome to Blackthorn Manor," he says. "We don't get many visitors anymore."`,
    obs: {
      icon: "🔒",
      text: "You notice: The door nearest to Edward has a new lock — shiny, recently installed on what appears to be the east wing entrance.",
    },
    question: "Edward extends his hand. What is your first move?",
    choices: [
      { text: "Smile and shake his hand. You need him to trust you first.", next: "dining_room" },
      { text: `Ask Victoria directly, in front of him: "Are you alright?"`, next: "victoria_wrist" },
      { text: `Say casually: "Why does that door need such a new lock?"`, next: "edward_reaction" },
    ],
  },

  victoria_wrist: {
    room: "The Drawing Room",
    time: "Friday, 7:51 PM",
    text: `Victoria steers you into the drawing room before Edward can follow. The door clicks shut. For a moment she simply breathes — rapid, shallow, like someone who has been holding it in for a very long time. "I need you to leave," she says. "Not tonight — he'd notice. Tomorrow morning. Early. Do you understand me?" Her hands won't stop moving; she picks up a porcelain figure, sets it down, picks it up again. "He watches the cameras. He reads my messages. He knows everything I do. But not you. He doesn't know about you yet."`,
    obs: {
      icon: "🕊️",
      text: "She isn't asking you to leave because she wants you gone. She's warning you because she wants you safe. There is a difference, and she knows it.",
    },
    question: "Footsteps in the hallway. You have seconds.",
    choices: [
      { text: `"Tell me what you need. I am not leaving without you."`, next: "victoria_plan" },
      { text: `"Where is the evidence? I need something I can take out of here tonight."`, next: "library_plan" },
      { text: `Say loudly, for the cameras: "What a lovely room, Victoria!" — buy yourself time.`, next: "dining_room" },
    ],
  },

  edward_reaction: {
    room: "The East Hallway",
    time: "Friday, 7:46 PM",
    text: `Edward's smile doesn't change. That's the thing that frightens you: a guilty man would flinch. He says pleasantly, "Damp problem in the east wing. We lock it to keep guests from wandering into unsafe floors." You glance down — polished parquet, not a water-stain in sight. He places his hand on the small of your back to guide you toward the dining room. The pressure is gentle. The message is not.`,
    obs: {
      icon: "⚠️",
      text: "He lied without breaking stride. This is a man who has told this particular lie many times before.",
    },
    question: "You allow yourself to be steered toward dinner. What are you already planning?",
    choices: [
      { text: "Play along entirely. Observe. Build the picture slowly and carefully.", next: "dining_room" },
      { text: `Catch Victoria's eye as you walk. Mouth the words: "I see it."`, next: "victoria_plan" },
      { text: "Agree cheerfully to his suggestion of a private tour after dinner.", next: "study_trap" },
    ],
  },

  // ACT II: THE DINNER

  victoria_plan: {
    room: "The Drawing Room",
    time: "Friday, 7:54 PM",
    text: `"There is a journal," Victoria whispers. "In the library. Second shelf from the bottom, behind the collected Brontë. He writes everything down — dates, names. He thinks of it as record-keeping." Her voice catches. "He is proud of it." She straightens as the door handle turns. "Don't let him see you looking. He has been waiting for someone to look. He wants to be known." She is describing a man who has committed crimes in the belief he will never be held accountable, because so far, he never has been.`,
    obs: {
      icon: "📖",
      text: "A man who keeps a record of what he has done believes, at his core, that no one will ever hold him to it.",
    },
    question: `Edward fills the doorway. "Dinner's getting cold." What is your move?`,
    choices: [
      { text: "Go to dinner. Go to the library later tonight. Follow her plan exactly.", next: "dining_room" },
      { text: "Slip away to the library now, while he's occupied with dinner guests.", next: "library_early" },
      { text: `Say aloud: "I'd love to see the library, Edward. Could we go now?"`, next: "library_early" },
    ],
  },

  library_plan: {
    room: "The Drawing Room",
    time: "Friday, 7:55 PM",
    text: `"The library," she says. "Tonight. Late. He takes pills — he won't hear you." She hesitates. "Second shelf from the bottom. Behind the Brontë. A black leather journal. No label." She presses her fingernails into her own palm, grounding herself. "He started it seven years ago." Seven years ago — the last time you were here. You left early that weekend. A bad feeling, you told yourself. You've wondered, since then, what would have happened if you'd stayed. Edward's voice calls from the hallway. Victoria straightens like a soldier.`,
    obs: {
      icon: "🎯",
      text: "Seven years ago you were here and you left early. Something you saw, or almost saw, has lived at the edge of your memory ever since.",
    },
    question: "You have a location. A time. What approach makes sense?",
    choices: [
      { text: "Go after midnight, when the house is fully silent.", next: "library_midnight" },
      { text: "Go after dinner, before bed — earlier is safer.", next: "library_early" },
      { text: "Sit through dinner first. Find out who else in this house can be trusted.", next: "dining_room" },
    ],
  },

  dining_room: {
    room: "The Dining Room",
    time: "Friday, 8:04 PM",
    text: `The dining table seats twelve. Tonight there are four of you: Victoria, Edward, yourself, and a silent man introduced only as Marcus — "an old friend" — who has not spoken since the soup was served. The food is extraordinary. The conversation is a performance. Edward holds court with the practiced ease of a man who knows exactly how charming he appears. He refills your wine glass without being asked. He never touches Victoria's shoulder the way a loving husband would. Victoria's glass remains untouched.`,
    obs: {
      icon: "🍷",
      text: "Marcus cuts his food with the precision of a man performing a task, not eating a meal. When Edward speaks, his jaw tightens almost imperceptibly. He knows this house. He has been here before.",
    },
    question: `Edward raises his glass. "To old friends. And buried secrets." He looks directly at you when he says "buried."`,
    choices: [
      { text: "Watch Marcus instead of Edward. He is the unknown variable.", next: "marcus_watch" },
      { text: "Excuse yourself. You've seen enough. Time to start looking.", next: "bedroom_night" },
      { text: "Accept Edward's suggestion of an after-dinner drink in the study.", next: "study_trap" },
    ],
  },

  dining_note: {
    room: "The Dining Room",
    time: "Friday, 8:04 PM",
    text: `The note in your sleeve burns like a coal. You read it twice in the bathroom before dinner: Don't go to the library after midnight. Don't trust— And then it tears. Don't trust whom? Edward? The butler? Victoria herself? You return to the table and watch them all differently now — every smile a possible performance, every silence a calculation. Marcus meets your eyes once, briefly, and then looks away. Deliberately. He wants you to know that he noticed you looking.`,
    obs: {
      icon: "📝",
      text: "Half a warning is sometimes worse than none at all. You spend dinner completing the sentence with your own fears.",
    },
    question: "After dinner, what is your priority?",
    choices: [
      { text: "Watch Marcus. He knows something. Give him the chance to approach you.", next: "marcus_watch" },
      { text: "Go to the library now — the note said don't go after midnight. Go before.", next: "library_early" },
      { text: "Find Victoria alone. She wrote the note. She needs to finish it.", next: "victoria_plan" },
    ],
  },

  marcus_watch: {
    room: "The Dining Room — After Dinner",
    time: "Friday, 9:15 PM",
    text: `When Edward leaves the table to take a phone call, Marcus leans across to you. Barely audible: "Library. Midnight. Come alone. I have what you need to end this." He is back in his seat before Edward returns. The rest of the evening is normal — dangerously, watchfully normal. Victoria plays piano in the drawing room. Edward listens with his eyes closed, his face the portrait of a devoted husband. The manor holds its breath.`,
    obs: {
      icon: "🗝️",
      text: "Marcus came to this house with a purpose. The question is whether that purpose is the same as yours — and whether it matters if it isn't.",
    },
    question: "You retire to your room at eleven. What is your plan?",
    choices: [
      { text: "Go to the library at midnight, exactly as Marcus instructed.", next: "library_midnight" },
      { text: "Go at eleven. Get there first. Have the advantage of the room.", next: "library_early" },
      { text: "Don't trust Marcus. Investigate the east wing instead.", next: "bedroom_night" },
    ],
  },

  // ACT III: THE NIGHT

  bedroom_night: {
    room: "The Guest Bedroom",
    time: "Friday, 11:08 PM",
    text: `Your room is beautiful. It is also, you gradually understand, a cage. The window opens two inches and no further. The lock operates from the outside as well as the inside. Someone has been here since you dropped your bag: your charger has been moved, your notebook riffled. They looked for something. Under the bed, pressed into the gap between two floorboards — you check out of habit, or instinct, the kind that comes from reading too many thrillers — you find a small brass key and a folded note. East wing. Third room. Tell no one. The handwriting is not Victoria's.`,
    obs: {
      icon: "🗝️",
      text: "Someone else in this house wants you to find what's in the east wing. Someone who was not able to tell you to your face.",
    },
    question: "The manor has gone completely silent. This moment feels enormous.",
    choices: [
      { text: "Go to the east wing with the key. Find what — or who — is there.", next: "east_wing" },
      { text: "Go to the library instead. Evidence matters more than anything else.", next: "library_midnight" },
      { text: "Barricade the door and try to call for help from your phone.", next: "call_help" },
    ],
  },

  call_help: {
    room: "The Guest Bedroom",
    time: "Friday, 11:15 PM",
    text: `No signal. The phone cycles through one bar, then none, then searching. You move to every corner of the room. The landline in the corridor has been disconnected — the wire cut cleanly, recently. Your data refuses to load. The WiFi requires a password no one gave you. You stand in the hallway of Blackthorn Manor, fully isolated, and you understand for the first time what it must feel like to live here. Not as a guest. As something with no way out.`,
    obs: {
      icon: "📵",
      text: "Isolation is the first step. He planned this carefully. You found out exactly early enough to matter.",
    },
    question: "No one is coming. What you do now, you do alone.",
    choices: [
      { text: "Go to the east wing. Use the key. Find whoever left you that note.", next: "east_wing" },
      { text: "Go to the library. Evidence is the only thing that leaves this house with you.", next: "library_early" },
      { text: "Find Marcus. If he is here for a reason, you need to know what it is now.", next: "library_midnight" },
    ],
  },

  east_wing: {
    room: "The East Wing — Third Room",
    time: "Saturday, 12:52 AM",
    text: `The key fits. The east wing smells of cold stone and years of disuse — and something underneath that isn't disuse at all. First room: stripped bare, walls scoured clean. Second room: a cot, a bucket, a chain bolted to the baseboard. The metal is still bright; this was not long ago. Third room: a woman. She is alive. She looks at you with eyes that have stopped expecting rescue — a particular kind of extinguishing that you have read about in fiction and are now seeing in a human face six inches from yours. She says one word. "Victoria." Not a name. A warning.`,
    obs: {
      icon: "💡",
      text: "She has been here before Victoria was. She knows what this house does to women. She knows what comes after the key.",
    },
    question: "Footsteps in the hallway behind you. Getting closer.",
    choices: [
      { text: "Pull her toward the window. The oak tree. The wall. You know the way out.", next: "escape_ending" },
      { text: "Kill the light. Absolute silence. Let the footsteps pass.", next: "escape_ending" },
      { text: "Barricade the door. Wait for dawn. Other guests arrive at ten.", next: "trapped_ending" },
    ],
  },

  library_early: {
    room: "The Library",
    time: "Friday, 9:31 PM",
    text: `The library is dark except for a banker's lamp left burning — forgotten, or deliberately left for someone. Floor-to-ceiling shelves, the smell of old paper and something metallic underneath. You find the collected Brontë immediately. Behind it: a black leather journal, no label, no name. Edward's handwriting inside. Meticulous, unhurried, almost serene — as though what he was recording was perfectly reasonable. The first entry is dated seven years ago. The night of the last dinner party at Blackthorn Manor. The night you left early.`,
    obs: {
      icon: "📖",
      text: "He has been doing this for fifteen years. Victoria is not the first. There are names and dates, and at the back a list he calls 'the accommodating' — people who knew and said nothing.",
    },
    question: "Your hands are shaking. What you're holding is evidence of harm spanning a decade and a half.",
    choices: [
      { text: "Take the journal. Leave now. Drive until your phone finds a signal.", next: "escape_ending" },
      { text: "Photograph every page with your phone. Replace it exactly as you found it.", next: "evidence_ending" },
      { text: "Read until you understand the full picture. Every name. Every year.", next: "truth_journal" },
    ],
  },

  library_midnight: {
    room: "The Library — After Midnight",
    time: "Saturday, 12:07 AM",
    text: `The library door is already open when you arrive. Marcus stands inside, the black journal in both hands, his face ashen in the lamplight. "I've known for two years," he says. "I've been building a case. I'm a journalist — I'm not actually an old friend. I'm sorry. I needed access, and you were the access." He sets the journal on the table between you. "I've already called someone I trust. Police arrive at dawn. But Edward is awake right now." You both heard it at the same moment: footsteps overhead, moving toward the stairs.`,
    obs: {
      icon: "👁️",
      text: "The journal contains dates, names, and amounts. A pattern spanning fifteen years. Irrefutable. Edward knows someone is in his library. You have minutes at most.",
    },
    question: "The footsteps reach the landing. What do you do right now?",
    choices: [
      { text: "Conceal the journal. Let Edward find an empty room. Stall him calmly.", next: "truth_ending" },
      { text: "Take the journal and run. Reach the gate before he reaches the stairs.", next: "escape_ending" },
      { text: "Stay. Don't run. Make him do whatever he's considering in front of two witnesses.", next: "truth_ending" },
    ],
  },

  study_trap: {
    room: "The Study",
    time: "Friday, 10:22 PM",
    text: `The study is the most honest room in the manor — because it shows you exactly who Edward is. The mounted trophies. The locked cabinet he keeps the key to on his person. The single chair positioned so that whoever sits in it has their back to the door. He pours two glasses of something dark and expensive, and for a long, unhurried moment he simply watches you. "I think you know something is wrong here," he says, pleasantly. "I can always tell. I have a sense for curious women."`,
    obs: {
      icon: "⚡",
      text: "He is not threatening you. He is informing you that the threat has already been decided. The distinction matters.",
    },
    question: "The door clicks behind you. It is locked from the outside.",
    choices: [
      { text: `Play innocent. "I just wanted to get to know you." Give him absolutely nothing.`, next: "trapped_ending" },
      { text: `Stand up. "I know about the journal, Edward. And I am not here alone."`, next: "confrontation_ending" },
    ],
  },

  truth_journal: {
    room: "The Library",
    time: "Friday, 10:14 PM",
    text: `You read until your hands shake. Edward's journal is a confession, a trophy cabinet, and a ledger all at once. Fifteen years. Seven women. And at the back — a list he calls "the accommodating." Three men who made it possible: a retired solicitor, a local magistrate, and the Detective Chief Inspector of the county constabulary. Men who knew. Men who enabled it. Men who benefited from the arrangement in ways the journal describes in the same calm, meticulous hand. Your phone has no signal. The landline wire has been cut. But Marcus's car is in the drive.`,
    obs: {
      icon: "🩸",
      text: "One name on the accommodating list is the person you were planning to call for help. You stare at it for a long time.",
    },
    question: "The normal channels are compromised. You have the journal. What now?",
    choices: [
      { text: "Take the journal. Take Marcus's keys from his coat in the hall. Drive for signal.", next: "escape_ending" },
      { text: "Wait for morning. Three more guests arrive at ten. Witnesses change everything.", next: "morning_ending" },
      { text: "Confront Edward directly with the journal. Make him see that you've read it.", next: "confrontation_ending" },
    ],
  },

  // ENDINGS

  escape_ending: {
    type: "ending",
    icon: "🏃",
    badge: "SURVIVOR",
    title: "You Escaped",
    text: `Cold gravel under running feet. The manor blazed with light behind you. Edward's voice — measured, unhurried, a man who has done this before — called out from somewhere near the gate. You were already over the wall. You remembered the oak tree from a summer visit in 2008, and memory turned out to be a kind of map. Your phone found signal on the road. The police arrived at Blackthorn Manor at 3:47 AM. Edward was standing at the gate with a flashlight, still smiling. The journal — every page photographed or physically present — became the foundation of a case that ended fifteen years of harm. Victoria is safe. The woman from the east wing is safe. You gave a four-hour statement. Sometimes the instinct that says run is the most intelligent thing about us.`,
    note: "Outcome: You trusted your instincts above the situation, above what was polite, above the voice that said wait. You got out.",
  },

  evidence_ending: {
    type: "ending",
    icon: "📰",
    badge: "TRUTH-TELLER",
    title: "The Truth",
    text: `You photographed every page and replaced the journal exactly as you found it. You spent the rest of the night appearing to sleep. At breakfast, you excused yourself to make a call from the garden — and drove Marcus's car to the village where your phone found signal. The story published six days later. It named every person on Edward's list. The Detective Chief Inspector was suspended within hours. Two men were arrested within the week. Victoria came forward voluntarily. The trial lasted eighteen months and ended in conviction on all counts. The manor was sold at a substantial loss. The new owners say the library has a peculiar feeling to it at night — as though the room remembers what was kept inside it for so long.`,
    note: "Outcome: You chose documentation over confrontation. Evidence does not have to run. Evidence waits.",
  },

  truth_ending: {
    type: "ending",
    icon: "⚖️",
    badge: "WITNESS",
    title: "The Long Night",
    text: `You stood your ground. Edward opened the library door to find two people standing calmly in the lamplight — a journalist with his phone recording, and a woman who had, somewhere between midnight and this moment, stopped being afraid. The presence of a witness changes everything. He knew it. He did not touch either of you. He stepped back into the hallway and the night became very long and very still. The police arrived at 6:22 AM. Marcus's recording, the journal, and Victoria's testimony — given quietly, in full, for the first time in seven years — were more than sufficient. Edward Blackthorn was escorted from his own manor in grey morning light. Victoria watched from the front steps. She did not look away.`,
    note: "Outcome: You stayed. You witnessed. Some forms of courage look exactly like stillness.",
  },

  trapped_ending: {
    type: "ending",
    icon: "🔒",
    badge: "TRAPPED",
    title: "The Manor Keeps Its Secrets",
    text: `Edward stands in the doorway. He does not look angry — anger makes mistakes. He looks patient, which is worse than angry. "I always admired how curious you were," he says. "Victoria used to say so." The lock clicks. The woman in the east wing looks at you with eyes that have seen other people arrive in this room, in this position, wearing this exact expression. She says: "He comes back in the mornings. He thinks mornings are kinder." You spend the night listening to the manor breathe and understanding, for the first time, what it means to be inside a story you believed you were only reading.`,
    note: "Outcome: You stayed when you should have run. But the morning always comes. And this time, there are two of you.",
  },

  confrontation_ending: {
    type: "ending",
    icon: "🛡️",
    badge: "COMPLICIT",
    title: "You Gave Him the Upper Hand",
    text: `You set the journal on Edward's desk. He looked at it for a long time. Then he closed it. Then he looked at you. "What exactly," he said, "do you think happens now?" You understood, too late, that you had carried the only evidence directly to the person it was evidence against. He did not need to threaten you. He already had what he needed. Through the study window you watched Victoria's car pull out of the drive in the rain. She didn't look back. Later — weeks later, from a safe distance — you would learn that she had been planning to leave for six months. She was waiting for exactly the right opening. Your confrontation, it turned out, gave her the distraction she needed. You were wrong about almost everything. You were still, somehow, useful.`,
    note: "Outcome: You handed him control. But sometimes the wrong move is still the right domino.",
  },

  morning_ending: {
    type: "ending",
    icon: "🌅",
    badge: "PATIENT",
    title: "The Long Game",
    text: `Morning came. Three more cars arrived at ten — people you had never met, who turned out not to be casual guests at all. Among them: two investigative journalists with established reputations, and a victim support solicitor who specialised in exactly this kind of case. Marcus had been building toward this weekend for two years. The invitation list was not accidental. You were the final piece — a credible, disinterested witness with no prior stake in the outcome. By noon, Edward's expression had cracked for the first time. Victoria set the journal on the dining room table herself. It had taken seven years. But some women understand, with absolute precision, the difference between the moment before the right moment and the moment itself.`,
    note: "Outcome: You waited. The plan was already in motion long before you arrived. You just didn't know you were part of it.",
  },
}
