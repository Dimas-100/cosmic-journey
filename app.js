const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function buildStars() {
  stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2,
    a: Math.random() * 0.7 + 0.15,
    speed: Math.random() * 0.003 + 0.001,
    phase: Math.random() * Math.PI * 2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.phase += star.speed;
    const alpha = star.a * (0.5 + Math.sin(star.phase) * 0.5);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  buildStars();
});

resizeCanvas();
buildStars();
drawStars();

const { useEffect, useRef, useState } = React;

const LESSONS = [
  {
    id: "earth",
    label: "The Impossible Photograph",
    icon: "EARTH",
    navSubtitle: "Setting the scene",
    route: "THE MISSION",
    routeMeta: "What humanity set out to do.",
    title: "The Impossible Photograph",
    eyebrow: "Scientists wanted to photograph the boundary of a black hole — a surface from which light itself cannot escape — located 55 million light-years away. What they attempted had never been done. What they needed had never been built.",
    bullets: [
      "Black holes are regions where gravity is so strong that escape velocity exceeds the speed of light — making them, by definition, invisible.",
      "At the boundary of every black hole sits the event horizon — the point of no return that defines the black hole itself.",
      "For most of the 20th century, photographing an event horizon shadow was considered technically impossible.",
      "This journey answers one question: how did humanity photograph something that cannot, by definition, be seen?"
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "The target of the first photograph was 55 million light-years away and only 40 microarcseconds in apparent size — equivalent to photographing a golf ball on the surface of the Moon.",
    stat: { value: "40 microarcseconds", label: "the angular size of M87*'s event horizon shadow — the smallest object ever directly imaged" },
    bonusFacts: [
      {
        icon: "MAP",
        title: "Why it seemed impossible",
        bullets: [
          "No single telescope on Earth was large enough. The required dish size would need to equal Earth's entire diameter — roughly 12,742 kilometers.",
          "For most of the 20th century, this was considered beyond the reach of any realistic instrument."
        ]
      },
      {
        icon: "MAP",
        title: "Two targets",
        bullets: [
          "Scientists considered two candidates: M87*, 55 million light-years away in the Messier 87 galaxy, and Sagittarius A*, 26,000 light-years away at the center of our own Milky Way.",
          "Despite being much closer, Sgr A* presented a harder imaging problem. M87* was chosen as the first target."
        ]
      },
      {
        icon: "QNTM",
        title: "The central question",
        bullets: [
          "The event horizon is defined by the fact that nothing crossing it can send any signal outward — including light. By definition, it cannot be seen directly.",
          "What scientists sought to image was the shadow the black hole casts on surrounding light — a dark silhouette predicted by general relativity."
        ]
      }
    ],
    visual: "earth"
  },
  {
    id: "horizon",
    label: "The Boundary",
    icon: "BH",
    navSubtitle: "The physics",
    route: "THE BOUNDARY",
    routeMeta: "The physics of the event horizon.",
    title: "The Point of No Return",
    eyebrow: "The event horizon is the most consequential boundary in physics — invisible, absolute, and defined entirely by the equations of general relativity.",
    bullets: [
      "The event horizon is not a physical surface. It is a boundary in spacetime where escape velocity equals the speed of light.",
      "For a non-rotating black hole, its size is given by the Schwarzschild radius: r = 2GM/c². The horizon scales linearly with mass — double the mass, double the radius.",
      "Real astrophysical black holes rotate. A rotating black hole has a more complex structure than the simple Schwarzschild case — but the key boundary is still the outer event horizon, the true point of no return.",
      "At 1.5 times the Schwarzschild radius sits the photon sphere, where gravity is strong enough to trap light in unstable circular orbits. This region — not the event horizon itself — produces the glowing ring seen in EHT images.",
      "Once any object crosses the event horizon, every possible future path leads inward. Escape is not just difficult — it is geometrically impossible."
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "If Earth were compressed into a black hole, its event horizon would be roughly 9 millimeters across - smaller than a marble. M87*'s event horizon, by contrast, spans about 120 billion kilometers - larger than our entire solar system.",
    stat: { value: "1.5x", label: "the Schwarzschild radius - the distance at which the photon sphere forms, creating the bright ring in EHT images" },
    bonusFacts: [
      {
        icon: "BH",
        title: "What the EHT actually imaged",
        bullets: [
          "The EHT did not photograph the event horizon directly. What it captured is the black hole shadow — the dark region from which no photons reach the observer.",
          "The shadow is larger than the event horizon itself — roughly 2.6 times larger — because gravity bends light paths outward around the photon sphere before they escape to the observer.",
          "The bright ring and dark center in the final image are a direct consequence of the physics on this page."
        ]
      },
      {
        icon: "BH",
        title: "Schwarzschild radius in context",
        bullets: [
          "The Schwarzschild radius formula r = 2GM/c² tells us the horizon scales linearly with mass.",
          "This is why M87, with 6.5 billion solar masses, has an event horizon spanning 120 billion kilometers — and why Earth compressed to a black hole would fit in the palm of your hand."
        ]
      },
      {
        icon: "SHDW",
        title: "The photon sphere",
        bullets: [
          "These orbits are unstable — photons either spiral inward or escape outward. Those that escape reach distant observers as the bright ring.",
          "The photon sphere is why the black hole shadow appears larger than the event horizon itself."
        ]
      }
    ],
    visual: "horizon"
  },
  {
    id: "matters",
    label: "103 Years in the Making",
    icon: "IDEA",
    navSubtitle: "The history",
    route: "THE HISTORY",
    routeMeta: "103 years from prediction to photograph.",
    title: "103 Years in the Making",
    eyebrow: "Scientists knew what the image would look like for 46 years before they could take it.",
    bullets: [
      "General relativity predicts an exact shadow size for a black hole of known mass. Scientists knew what the image should look like for over 40 years before they could capture it.",
      "The shadow diameter is a direct, testable prediction of general relativity in the strong-field regime — conditions no laboratory or solar system experiment can replicate.",
      "Before the EHT, black holes were inferred from their gravitational effects on surrounding matter. No direct image of an event horizon shadow had ever existed.",
      "Confirming the shadow's size and shape meant testing Einstein's equations in the most extreme gravitational environment in the known universe."
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "The shadow of a black hole is not the event horizon itself. It is larger, formed by gravitational lensing of light near the photon sphere. Its predicted size is one of general relativity's most precise strong-field forecasts — and it matched the 2019 image to within 10%.",
    stat: { value: "103 years", label: "long enough for an entire generation of scientists to dedicate their careers to an image they would never live to see" },
    bonusFacts: [
      {
        icon: "IDEA",
        title: "Bardeen's prediction",
        bullets: [
          "In 1973, James Bardeen calculated exactly what a black hole shadow would look like to a distant observer — including the asymmetric brightness caused by relativistic motion in the accretion disk.",
          "His prediction sat mathematically precise and untested for 46 years, until the EHT image confirmed it in 2019.",
          "This is one of the rarest outcomes in science: theory waiting nearly half a century for technology to catch up."
        ]
      },
      {
        icon: "TIME",
        title: "From prediction to proof",
        bullets: [
          "Bardeen's 1973 prediction was mathematically complete but experimentally untestable for decades.",
          "The obstacle was the instrument — no telescope on Earth had the resolving power to test it.",
          "It took until 2017 to build the instrument capable of testing it — the Event Horizon Telescope."
        ]
      },
      {
        icon: "SHDW",
        title: "The shadow vs. the horizon",
        bullets: [
          "Think of a flashlight shining past a ball — the ball blocks some light and casts a shadow larger than the ball itself. A black hole works the same way: its gravity bends light paths around it, casting a shadow larger than the event horizon.",
          "The dark central region in the EHT image is that shadow — the zone from which no light reaches the observer. It is not a photograph of the horizon, but of the region the horizon makes dark."
        ]
      }
    ],
    visual: "deep"
  },
  {
    id: "eht",
    label: "Building an Earth-Sized Eye",
    icon: "EHT",
    navSubtitle: "The instrument",
    route: "THE INSTRUMENT",
    routeMeta: "How Earth became a telescope.",
    title: "Building an Earth-Sized Eye",
    eyebrow: "To photograph an event horizon shadow, you need a telescope the size of a planet. So they built one.",
    bullets: [
      "The Event Horizon Telescope takes its name from its singular purpose: to resolve the shadow of an event horizon — the boundary defined in Step 2 — for the first time in history.",
      "Angular resolution is governed by θ ≈ λ/D — wavelength divided by diameter. Resolving M87*'s shadow required a baseline as large as Earth's full diameter, visible on the globe to the left.",
      "No single dish can be built at that scale. Instead, eight radio telescope sites across six continents were linked using Very Long Baseline Interferometry (VLBI) to form one virtual Earth-sized observatory.",
      "Each site recorded simultaneously — precise timing was essential for combining signals across thousands of kilometers. See the Dig Deeper card for how this was achieved.",
      "The 2017 campaign generated so much data it could not be sent online — explore the bonus cards to find out how it was delivered.",
      "The final image was not a photograph — it was reconstructed from the data. See the bonus cards for how that reconstruction was validated."
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "The EHT achieves an angular resolution of about 20 microarcseconds at 1.3 mm (230 GHz). This is the highest angular resolution ever achieved in astronomy — and it required making the telescope baseline as large as Earth itself.",
    stat: { value: "8", label: "telescope sites across 6 continents forming one virtual Earth-sized telescope" },
    bonusFacts: [
      {
        icon: "LINK",
        title: "How VLBI works",
        bullets: [
          "Each telescope in the EHT array records radio waves simultaneously, with precise timestamps from atomic clocks.",
          "The recordings from all sites are combined after the fact to extract the signal — the farther apart two telescopes are, the finer the detail they can resolve together.",
          "As Earth rotates during the observation, the changing positions of telescopes gradually build up a more complete picture of the source."
        ]
      },
      {
        icon: "SHDW",
        title: "Four imaging pipelines",
        bullets: [
          "The EHT image was not taken like a photograph. It was mathematically reconstructed from the combined telescope data.",
          "Four completely independent teams, using different reconstruction methods, each produced their own image without seeing the others' results.",
          "All four arrived at the same answer — a bright ring surrounding a dark central shadow. That agreement is what makes the result convincing."
        ]
      },
      {
        icon: "DATA",
        title: "The data problem",
        bullets: [
          "The 2017 observing campaign produced approximately 5 petabytes of data — far too large to transmit over the internet. Hard drives had to be physically shipped from every telescope site to correlation facilities.",
          "The South Pole Telescope's drives faced an additional delay: Antarctica is inaccessible during winter. Its data did not arrive for processing until October 2017, six months after the observations."
        ]
      }
    ],
    visual: "eht"
  },
  {
    id: "m87",
    label: "Why M87*?",
    icon: "M87",
    navSubtitle: "The target",
    route: "M87 - 55 million light-years away",
    routeMeta: "Target: Messier 87 galaxy",
    title: "Why M87*?",
    eyebrow: "The EHT needed a target big enough to actually image. M87* won.",
    bullets: [
      "Once Earth-sized resolution was possible, scientists still needed the right target.",
      "Messier 87 is a giant elliptical galaxy 55 million light-years away.",
      "At its center is M87*, a black hole with about 6.5 billion times the Sun's mass.",
      "M87*'s mass of 6.5 billion solar masses gives it a light-crossing time of several days — meaning its structure is essentially stable over an entire observing campaign.",
      "Sgr A*, the black hole at the center of our own Milky Way, presented a harder imaging problem — explore the bonus cards to find out why."
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "M87*'s event horizon spans about 120 billion kilometers — larger than our entire solar system. Its enormous size and days-long structural stability made it the ideal first target, despite being 55 million light-years away.",
    stat: { value: "6.5B", label: "solar masses - the immense size of M87*, the first black hole ever photographed" },
    bonusFacts: [
      {
        icon: "JET",
        title: "The relativistic jet",
        bullets: [
          "M87 is famous for launching a jet of plasma thousands of light-years long at nearly the speed of light — one of the most powerful jets known in any galaxy.",
          "This jet is one of the reasons M87 was already well-studied before the EHT — making it a target with decades of supporting observations behind it."
        ]
      },
      {
        icon: "WHY",
        title: "Why not Sgr A*?",
        bullets: [
          "Sgr A* is the black hole at the center of our own Milky Way — much closer, but far harder to image.",
          "Because it is so much less massive, its structure changes faster than a long observation can average out, blurring the image.",
          "The EHT eventually imaged Sgr A* in 2022 using new algorithms developed specifically for its rapidly changing structure — and found the same shadow shape."
        ]
      },
      {
        icon: "IMG",
        title: "What the image was predicted to show",
        bullets: [
          "With M87* confirmed as the target, scientists already knew what the image should look like before taking it. General relativity predicted a bright asymmetric ring surrounding a dark central shadow.",
          "The predicted shadow diameter for M87*'s mass and distance had been calculated precisely in advance — scientists knew the exact size of the shadow before a single telescope pointed at it."
        ]
      }
    ],
    visual: "m87"
  },
  {
    id: "image",
    label: "The Photograph",
    icon: "IMG",
    navSubtitle: "The result",
    route: "Historic release",
    routeMeta: "First direct black hole image",
    title: "The Photograph",
    eyebrow: "April 10, 2019. The Event Horizon Telescope Collaboration released the first direct observational confirmation of what general relativity had predicted for over a century.",
    bullets: [
      "The image shows a bright, asymmetric ring of emission surrounding a dark central shadow — every feature of which had been predicted by general relativity before the image existed.",
      "The bright ring is superheated plasma in the accretion disk, whose light is bent toward the observer by extreme spacetime curvature.",
      "The brightness asymmetry is caused by relativistic Doppler beaming — material rotating toward Earth is boosted in brightness; the receding side appears dimmer.",
      "The dark central region is the black hole shadow — bounded by the photon capture cross-section near the photon sphere, not the event horizon itself.",
      "The measured shadow diameter matched general relativity's prediction exactly — confirming what 103 years of theory said it would look like."
    ],
    keyFactLabel: "KEY FACT",
    keyFact: "The shadow size matched Einstein's general theory of relativity to within 10% — in one of the most extreme gravitational environments in the known universe. This is one of the strongest tests of GR ever performed.",
    stat: { value: "Apr 10, 2019", label: "the date humanity first directly observed the shadow of an event horizon" },
    bonusFacts: [
      {
        icon: "SHDW",
        title: "The shadow boundary",
        bullets: [
          "Think of the shadow like the dark circle cast behind a ball held in front of a light. The black hole's gravity bends light around it, creating a dark zone larger than the horizon itself — that dark zone is what the EHT captured.",
          "Light that passes too close gets pulled in and never escapes. Light that passes just far enough away bends around the black hole and reaches us — forming the bright ring.",
          "The fact that the shadow appeared at all — exactly where and how theory said it would — is the result of 103 years of physics, from Schwarzschild's equations to this image."
        ]
      },
      {
        icon: "GLOW",
        title: "Relativistic Doppler beaming",
        bullets: [
          "The southern portion of M87*'s ring appears brighter because that material is moving toward Earth and is relativistically boosted in both brightness and frequency.",
          "The northern portion, moving away, appears dimmer. This asymmetry is not an imaging artifact — it is a direct signature of relativistic motion in the accretion flow and was predicted by Bardeen in 1973."
        ]
      },
      {
        icon: "TEST",
        title: "What this image confirmed",
        bullets: [
          "The image matched what general relativity predicted — in gravitational conditions far more extreme than anything testable on Earth or in the solar system.",
          "For the first time, an event horizon shadow went from mathematical prediction to directly observed, measurable reality."
        ]
      }
    ],
    visual: "photo"
  },
  {
    id: "quiz",
    label: "Mini Quiz",
    icon: "TEST",
    navSubtitle: "The test",
    route: "Final checkpoint",
    routeMeta: "Mini review challenge",
    title: "What Did You Learn?",
    eyebrow: "These questions test understanding, not memorization. Read each explanation after answering.",
    bullets: [],
    stat: { value: "6", label: "conceptual questions testing what the journey explained" },
    bonusFacts: [],
    quizQuestions: [
      {
        question: "What produces the bright ring in the EHT image of M87*?",
        options: [
          "The event horizon itself emitting light",
          "The photon sphere region, where lensed accretion disk emission accumulates",
          "A reflection of starlight off the black hole surface",
          "Light escaping directly from the accretion disk"
        ],
        correct: 1,
        explanation: "The bright ring is not the event horizon. It is the photon sphere region at 1.5 times the Schwarzschild radius, where gravity bends light from the accretion disk into near-circular paths. This was the key distinction introduced in Step 2."
      },
      {
        question: "How does the EHT achieve its extreme angular resolution?",
        options: [
          "By using the largest single radio dish ever built",
          "By observing at infrared wavelengths to improve clarity",
          "By linking telescopes across Earth using Very Long Baseline Interferometry to synthesize an Earth-sized aperture",
          "By orbiting telescopes above Earth's atmosphere"
        ],
        correct: 2,
        explanation: "The resolution formula θ ≈ λ/D means that at 1.3 mm wavelength, resolving M87*'s shadow required a baseline equal to Earth's diameter. VLBI links eight telescope sites across six continents with atomic clock timestamps to synthesize that virtual aperture."
      },
      {
        question: "What did the measured shadow diameter of M87* confirm?",
        options: [
          "That black holes emit light through Hawking radiation",
          "That Einstein's general theory of relativity holds in the most extreme gravitational conditions ever directly observed",
          "That M87* is the largest black hole in the universe",
          "That the event horizon and the black hole shadow are the same size"
        ],
        correct: 1,
        explanation: "The shadow diameter matched the general relativity prediction to within 10% — in gravitational conditions far more extreme than anything testable on Earth or in the solar system. This is one of the strongest confirmations of Einstein's equations ever performed."
      }
    ],
    visual: "quiz"
  }
];

const TIMELINE = [
  { year: "1916", text: "Schwarzschild solves Einstein's field equations, deriving the first black hole solution and the concept of a critical radius.", color: "#9ea6b8" },
  { year: "1939", text: "Oppenheimer and Snyder show that gravitational collapse can actually produce a black hole in nature.", color: "#9ea6b8" },
  { year: "1967", text: "John Wheeler coins the term \"black hole.\"", color: "#9ea6b8" },
  { year: "1973", text: "Bardeen calculates the theoretical appearance of a black hole shadow — the first prediction of what EHT would image.", color: "#9ea6b8" },
  { year: "2006", text: "The Event Horizon Telescope project formally begins.", color: "#f0a03a" },
  { year: "2019", text: "The Event Horizon Telescope releases the first direct image of an event horizon shadow — the culmination of 103 years of theory and observation.", color: "#b14cff" }
];

const EHT_SITES = [
  { name: "JCMT", lat: 19.82, lon: -155.47, color: "#b38cff", labelDx: -26, labelDy: -14 },
  { name: "SMA", lat: 19.82, lon: -155.48, color: "#d88cff", labelDx: 16, labelDy: 12 },
  { name: "SMT", lat: 32.70, lon: -109.89, color: "#97b7ff", labelDx: 15, labelDy: -12 },
  { name: "LMT", lat: 18.99, lon: -97.31, color: "#ffab4a", labelDx: 15, labelDy: 11 },
  { name: "IRAM 30m", lat: 37.06, lon: -3.39, color: "#57f294", labelDx: 14, labelDy: -12 },
  { name: "ALMA", lat: -23.02, lon: -67.75, color: "#64c7ff", labelDx: -28, labelDy: 12 },
  { name: "APEX", lat: -23.00, lon: -67.76, color: "#ffd84a", labelDx: 15, labelDy: -12 },
  { name: "SPT", lat: -90, lon: 0, color: "#ff7fcf", labelDx: 0, labelDy: -18 }
];

const EHT_CONNECTIONS = [
  ["JCMT", "SMA"],
  ["JCMT", "SMT"],
  ["SMA", "LMT"],
  ["SMT", "LMT"],
  ["LMT", "IRAM 30m"],
  ["IRAM 30m", "ALMA"],
  ["IRAM 30m", "APEX"],
  ["SMT", "ALMA"],
  ["LMT", "ALMA"],
  ["LMT", "APEX"],
  ["JCMT", "SPT"],
  ["SMA", "SPT"],
  ["ALMA", "SPT"],
  ["APEX", "SPT"]
];

function projectEhtSite(lat, lon) {
  const mapInsetX = 4;
  const mapInsetY = 4;

  return {
    x: mapInsetX + (((lon + 180) / 360) * (100 - mapInsetX * 2)),
    y: mapInsetY + (((90 - lat) / 180) * (100 - mapInsetY * 2))
  };
}

function IconGlyph({ type, className = "" }) {
  return <span className={`icon-glyph icon-${type.toLowerCase()} ${className}`.trim()} aria-hidden="true" />;
}

function BonusFacts({ slideIndex, facts }) {
  const [revealed, setRevealed] = useState([]);

  useEffect(() => {
    setRevealed(facts.map(() => false));
  }, [slideIndex, facts.length]);

  const discovered = revealed.filter(Boolean).length;

  function toggleCard(index) {
    setRevealed((current) => current.map((item, i) => (i === index ? !item : item)));
  }

  function getFactBullets(fact) {
    if (fact.bullets) return fact.bullets;
    return fact.body
      .split(". ")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => (part.endsWith(".") ? part : `${part}.`));
  }

  return (
    <div className="bonus-area">
      <div className="bonus-head">
        <span>Click to reveal bonus facts</span>
        <span>{discovered}/{facts.length} discovered</span>
      </div>
      <div className="bonus-grid">
        {facts.map((fact, index) => (
          <div key={fact.title} className={`bonus-card ${index === 0 ? "featured" : ""} ${revealed[index] ? "revealed" : ""}`} onClick={() => toggleCard(index)}>
            {index === 0 && <div className="bonus-badge">Dig Deeper</div>}
            {index !== 0 && <div className="bonus-icon"><IconGlyph type={fact.icon} className="icon-glyph-bonus" /></div>}
            <div className="bonus-title">{fact.title}</div>
            <div className="bonus-body">
              {revealed[index] ? (
                <ul className="bonus-body-list">
                  {getFactBullets(fact).map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : (
                "Tap to reveal this supporting detail from the journey."
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizSection({ slideIndex, questions }) {
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }, [slideIndex, questions.length]);

  const allAnswered = answers.every((answer) => answer !== null);
  const correctCount = answers.reduce((total, answer, index) => total + (answer === questions[index].correct ? 1 : 0), 0);
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  function chooseAnswer(questionIndex, optionIndex) {
    if (submitted) return;
    setAnswers((current) => current.map((answer, index) => (index === questionIndex ? optionIndex : answer)));
  }

  function resetQuiz() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="quiz-box">
      <div className="quiz-title">What Did You Learn?</div>
      <div className="quiz-subtitle">These questions test understanding, not memorization. Read each explanation after answering.</div>
      <div className="quiz-stack">
        {questions.map((question, questionIndex) => (
          <div key={question.question} className="quiz-card">
            <div className="quiz-question">Question {questionIndex + 1}</div>
            <div className="quiz-prompt">{question.question}</div>
            <div className="quiz-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[questionIndex] === optionIndex;
                const isCorrect = optionIndex === question.correct;
                const showCorrect = submitted && isCorrect;
                const showIncorrect = submitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`quiz-option ${isSelected ? "selected" : ""} ${showCorrect ? "correct" : ""} ${showIncorrect ? "incorrect" : ""}`}
                    onClick={() => chooseAnswer(questionIndex, optionIndex)}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="quiz-explanation">
                <div className="quiz-explanation-answer">Correct answer: {String.fromCharCode(65 + question.correct)}</div>
                <div className="quiz-explanation-copy">{question.explanation}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="quiz-actions">
        {!allAnswered && !submitted && <div className="quiz-meta">Answer all {questions.length} questions to calculate your score.</div>}
        {allAnswered && !submitted && (
          <>
            <button type="button" className="nav-button primary" onClick={() => setSubmitted(true)}>Finish Quiz</button>
          </>
        )}
      </div>
      {submitted && (
        <div className="quiz-overlay">
          <div className="quiz-confetti" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <span
                key={index}
                className="quiz-confetti-piece"
                style={{
                  left: `${(index % 8) * 12 + 6}%`,
                  animationDelay: `${(index % 6) * 0.12}s`,
                  animationDuration: `${3.2 + (index % 5) * 0.35}s`
                }}
              />
            ))}
          </div>
          <div className="quiz-overlay-card">
            <div className="quiz-rocket" aria-hidden="true">
              <div className="quiz-rocket-body">
                <div className="quiz-rocket-window" />
              </div>
              <div className="quiz-rocket-fin quiz-rocket-fin-left" />
              <div className="quiz-rocket-fin quiz-rocket-fin-right" />
              <div className="quiz-rocket-flame" />
            </div>
            <div className="quiz-score">Score: {correctCount}/{questions.length} ({scorePercent}%)</div>
            <div className="quiz-stack">
              {questions.map((question, questionIndex) => (
                <div key={`${question.question}-result`} className="quiz-card">
                  <div className="quiz-question">Question {questionIndex + 1}</div>
                  <div className="quiz-prompt">{question.question}</div>
                  <div className="quiz-explanation">
                    <div className="quiz-explanation-answer">
                      {answers[questionIndex] === question.correct ? "Correct" : "Incorrect"} • Correct answer: {String.fromCharCode(65 + question.correct)}
                    </div>
                    <div className="quiz-explanation-copy">{question.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="quiz-farewell">Thank you for coming along with us on this journey to the event horizon. From Earth to the first black hole image, you have now reached the end of the presentation.</div>
            <button type="button" className="nav-button secondary" onClick={resetQuiz}>Close and Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseNav({ index, visited, goTo }) {
  const progress = ((index + 1) / LESSONS.length) * 100;

  return (
    <div className="course-nav">
      <div className="course-tabs" style={{ gridTemplateColumns: `repeat(${LESSONS.length}, 1fr)` }}>
        {LESSONS.map((lesson, lessonIndex) => {
          const done = visited.has(lessonIndex);

          return (
            <div key={lesson.id} className={`course-tab ${done ? "done" : ""} ${lessonIndex === index ? "active" : ""}`} onClick={() => goTo(lessonIndex)}>
              <div className="tab-icon"><IconGlyph type={lesson.icon} className="icon-glyph-tab" /></div>
              <div className="tab-copy">
                <div className="tab-label">{lesson.label}</div>
                <div className="tab-subtitle">{lesson.navSubtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="course-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-rocket" style={{ left: `clamp(10px, ${progress}%, calc(100% - 10px))` }}>
            <div className="progress-rocket-body">
              <div className="progress-rocket-window" />
            </div>
            <div className="progress-rocket-fin progress-rocket-fin-left" />
            <div className="progress-rocket-fin progress-rocket-fin-right" />
            <div className="progress-rocket-flame" />
          </div>
        </div>
        <div className="tab-label">{Math.round(progress)}% complete</div>
      </div>
      <div className="progress-meta">
        <span>Step {index + 1} of {LESSONS.length}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
    </div>
  );
}

function EarthVisual() {
  return (
    <div className="visual-stage">
      <div className="impossible-scene">
        <div className="impossible-nebula impossible-nebula-a" />
        <div className="impossible-nebula impossible-nebula-b" />
        <div className="impossible-nebula impossible-nebula-c" />
        <div className="impossible-stars impossible-stars-near" />
        <div className="impossible-stars impossible-stars-far" />
        <div className="impossible-stars impossible-stars-twinkle" />
        <div className="impossible-range-ring" />
        <div className="impossible-range-line" />
        <div className="impossible-earth-glow" />
        <div className="impossible-earth">
          <div className="impossible-earth-night" />
          <div className="impossible-earth-atmosphere" />
        </div>
        <div className="impossible-galaxy-wrap">
          <div className="impossible-target-beacon" />
          <div className="impossible-galaxy">
            <div className="impossible-galaxy-haze" />
            <div className="impossible-galaxy-arms" />
            <div className="impossible-galaxy-core" />
            <div className="impossible-galaxy-hole" />
          </div>
        </div>
        <div className="impossible-label impossible-label-earth">Earth</div>
        <div className="impossible-label impossible-label-m87">M87*</div>
        <div className="impossible-caption">55 million light-years away</div>
      </div>
    </div>
  );
}

function BlackHoleKeyedVisual() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return undefined;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    let animationFrame = 0;

    function renderFrame() {
      if (!canvas.isConnected || !image.complete || !image.naturalWidth) {
        animationFrame = requestAnimationFrame(renderFrame);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const frame = context.getImageData(0, 0, width, height);
      const data = frame.data;
      const centerX = width * 0.505;
      const centerY = height * 0.47;
      const radiusX = width * 0.165;
      const radiusY = height * 0.19;

      for (let index = 0; index < data.length; index += 4) {
        const x = ((index / 4) % width);
        const y = Math.floor(index / 4 / width);
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

        const dx = (x - centerX) / radiusX;
        const dy = (y - centerY) / radiusY;
        const insideShadow = dx * dx + dy * dy <= 1;

        if (insideShadow) {
          data[index] = 0;
          data[index + 1] = 0;
          data[index + 2] = 0;
          data[index + 3] = 255;
          continue;
        }

        if (luminance < 18) {
          data[index + 3] = 0;
          continue;
        }

        if (luminance < 40) {
          data[index + 3] = Math.max(0, Math.round((luminance - 18) * 8));
        }
      }

      context.putImageData(frame, 0, 0);
      animationFrame = requestAnimationFrame(renderFrame);
    }

    function startRender() {
      cancelAnimationFrame(animationFrame);
      renderFrame();
    }

    if (image.complete) startRender();
    image.addEventListener("load", startRender);

    return () => {
      cancelAnimationFrame(animationFrame);
      image.removeEventListener("load", startRender);
    };
  }, []);

  return (
    <div className="bh-gif-frame">
      <div className="bh-shadow-base" aria-hidden="true" />
      <canvas ref={canvasRef} className="bh-gif-canvas" width="520" height="300" aria-hidden="true" />
      <img ref={imageRef} className="bh-gif-source" src="./black hole.gif" alt="Animated black hole visualization" />
    </div>
  );
}

function HorizonVisual() {
  return (
    <div className="visual-stage">
      <BlackHoleKeyedVisual />
    </div>
  );
}

function DeepVisual() {
  return (
    <div className="deep-column">
      <div className="timeline-box">
        <div className="timeline-title">Road to the first image</div>
        <div className="timeline-items">
          {TIMELINE.map((entry) => (
            <div key={entry.year} className="timeline-item">
              <div className="timeline-dot" style={{ background: entry.color, color: entry.color }} />
              <div>
                <div className="timeline-year" style={{ color: entry.color }}>{entry.year}</div>
                <div className="timeline-text">{entry.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EHTVisual() {
  const projectedSites = EHT_SITES.map((site) => ({
    ...site,
    ...projectEhtSite(site.lat, site.lon)
  }));

  const siteMap = Object.fromEntries(projectedSites.map((site) => [site.name, site]));

  return (
    <div className="visual-stage">
      <div className="eht-visual">
        <div className="eht-map">
          <svg className="eht-globe" viewBox="0 0 100 100" aria-hidden="true">
            <path className="eht-continent" d="M9 29 L13 23 L18 21 L21 16 L28 15 L34 18 L36 23 L39 25 L39 31 L35 35 L31 36 L30 40 L26 43 L22 42 L18 39 L14 39 L11 34 Z" />
            <path className="eht-continent eht-continent-soft" d="M18 22 L20 19 L23 18 L25 20 L24 24 L21 26 L18 25 Z" />
            <path className="eht-continent eht-continent-alt" d="M25 45 L29 47 L32 52 L32 58 L34 65 L33 73 L30 82 L26 87 L22 81 L21 73 L22 66 L20 58 L22 51 Z" />
            <path className="eht-continent eht-continent-soft" d="M36 12 L40 11 L43 14 L42 20 L39 24 L35 21 L35 16 Z" />
            <path className="eht-continent" d="M52 25 L56 23 L61 23 L64 21 L69 23 L73 25 L77 24 L81 26 L84 30 L86 34 L84 38 L79 39 L75 37 L71 37 L68 35 L64 35 L62 33 L59 34 L56 32 L53 30 Z" />
            <path className="eht-continent eht-continent-alt" d="M57 37 L62 36 L66 39 L69 44 L69 50 L68 56 L66 61 L64 67 L60 72 L56 74 L53 69 L52 61 L53 53 L54 46 Z" />
            <path className="eht-continent eht-continent-soft" d="M81 45 L85 46 L88 49 L89 54 L87 58 L83 59 L80 56 L79 50 Z" />
            <path className="eht-continent eht-continent-soft" d="M12 88 L22 86 L34 85 L47 86 L61 86 L74 85 L86 87 L90 91 L80 93 L67 94 L52 94 L36 93 L22 92 L14 91 Z" />
            <path className="eht-grid" d="M16 18 C30 22, 42 21, 56 18 S79 15, 91 20" />
            <path className="eht-grid" d="M8 34 C25 38, 44 38, 59 35 S82 31, 94 36" />
            <path className="eht-grid" d="M7 50 C24 53, 45 53, 60 50 S83 46, 93 50" />
            <path className="eht-grid" d="M12 66 C28 69, 44 69, 59 66 S80 63, 89 66" />
            <path className="eht-grid-vert" d="M24 10 C22 28, 21 46, 23 66 S28 86, 31 94" />
            <path className="eht-grid-vert" d="M41 8 C39 26, 39 46, 41 67 S46 86, 49 93" />
            <path className="eht-grid-vert" d="M58 8 C56 27, 56 46, 58 67 S63 86, 66 93" />
            <path className="eht-grid-vert" d="M75 11 C72 28, 72 47, 74 66 S79 84, 82 91" />
            {EHT_CONNECTIONS.map(([from, to]) => {
              const start = siteMap[from];
              const end = siteMap[to];

              return <line key={`${from}-${to}`} className="eht-link" x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
            })}
          </svg>
          {projectedSites.map((site) => (
            <React.Fragment key={site.name}>
              <div className="scope-dot" style={{ left: `${site.x}%`, top: `${site.y}%`, background: site.color, color: site.color }} />
              <div className="scope-label" style={{ left: `calc(${site.x}% + ${site.labelDx}px)`, top: `calc(${site.y}% + ${site.labelDy}px)` }}>{site.name}</div>
            </React.Fragment>
          ))}
          <div className="stage-label" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", color: "#d8e6ff" }}>12,742 km diameter</div>
        </div>
        <div className="eht-caption">Virtual Earth-sized telescope</div>
      </div>
    </div>
  );
}

function M87Visual() {
  return (
    <div className="visual-stage">
      <div className="galaxy-stage">
        <div className="galaxy-jet" />
        <div className="galaxy-core" />
        <div className="galaxy-caption" style={{ left: "56%", top: "39%", color: "#ffd84a" }}>M87 Galaxy</div>
        <div className="galaxy-caption" style={{ left: "63%", top: "22%" }}>Relativistic jet</div>
        <div className="galaxy-caption" style={{ left: "38%", bottom: "15%" }}>M87 - 55 million light-years away</div>
      </div>
    </div>
  );
}

function PhotoVisual() {
  return (
    <div className="visual-stage">
      <div className="photo-card photo-card-feature">
        <div className="photo-frame photo-frame-feature">
          <img className="bh-photo" src="../FirstBlackHole.jpg" alt="First black hole image captured by the Event Horizon Telescope" />
        </div>
        <div className="photo-caption-title">Actual EHT Photograph — M87*</div>
        <div className="photo-caption-copy">April 10, 2019. The first-ever image of a black hole.</div>
      </div>
    </div>
  );
}

function QuizVisual() {
  return (
    <div className="visual-stage">
      <div className="photo-card">
        <div className="photo-frame quiz-frame">
          <div className="quiz-visual">
            <div className="quiz-visual-ring" />
            <div className="quiz-visual-core">Q</div>
          </div>
        </div>
        <div className="photo-caption-title">Final Review</div>
        <div className="photo-caption-copy">A separate mini quiz slide so the presentation content stays informational all the way through.</div>
      </div>
    </div>
  );
}

function SlideVisual({ type }) {
  switch (type) {
    case "earth": return <EarthVisual />;
    case "horizon": return <HorizonVisual />;
    case "deep": return <DeepVisual />;
    case "eht": return <EHTVisual />;
    case "m87": return <M87Visual />;
    case "photo": return <PhotoVisual />;
    case "quiz": return <QuizVisual />;
    default: return null;
  }
}

function SlideFooter({ step, total, onBack, onNext, onRestart }) {
  const isFirst = step === 0;
  const isLast = step === total - 1;

  return (
    <div className="slide-footer">
      <div className="slide-step">Step {step + 1} of {total}</div>
      <div className="footer-actions">
        <button className="nav-button secondary" onClick={isFirst ? onRestart : onBack}>{isFirst ? "Back to Intro" : "<- Back"}</button>
        <button className="nav-button primary" onClick={isLast ? onRestart : onNext}>{isLast ? "Restart Journey" : "Continue Journey ->"}</button>
      </div>
    </div>
  );
}

function LessonSlide({ lesson, index, total, visited, goTo, onNext, onBack, onRestart }) {
  return (
    <div className="journey-shell">
      <CourseNav index={index} visited={visited} goTo={goTo} />
      <div className="slide-main">
        <div className="slide-inner">
          <div className="section-pill">{lesson.route} <span style={{ color: "#7f8cb0", textTransform: "none" }}>{lesson.routeMeta}</span></div>
          <div className="top-row">
            <div className="visual-wrap"><SlideVisual type={lesson.visual} /></div>
            <div className="content-wrap">
              <div className="content-card">
                <div className="title small">{lesson.title}</div>
                <div className="eyebrow">{lesson.eyebrow}</div>
                <ul className="copy-list">
                  {lesson.bullets.map((bullet) => <li key={bullet} className="copy-list-item">{bullet}</li>)}
                </ul>
              </div>
              {lesson.keyFact && <div className="fact-box"><div className="fact-title">{lesson.keyFactLabel || "Key Fact"}</div><div className="fact-copy">{lesson.keyFact}</div></div>}
              <div className="stat-box"><div className="stat-value">{lesson.stat.value}</div><div className="stat-label">{lesson.stat.label}</div></div>
            </div>
          </div>
          {lesson.bonusFacts && lesson.bonusFacts.length > 0 && <BonusFacts slideIndex={index} facts={lesson.bonusFacts} />}
          {lesson.quizQuestions && <QuizSection slideIndex={index} questions={lesson.quizQuestions} />}
        </div>
      </div>
      <SlideFooter step={index} total={total} onBack={onBack} onNext={onNext} onRestart={onRestart} />
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div className="hero-shell">
      <div className="hero-inner">
        <div className="hero-pill">Astronomy II - Class Presentation</div>
        <div className="hero-planet-wrap">
          <div className="hero-black-hole-scene">
            <div className="hero-black-hole-halo" />
            <div className="hero-black-hole-ring" />
            <div className="hero-black-hole-shadow" />
            <div className="hero-black-hole-stars hero-black-hole-stars-a" />
            <div className="hero-black-hole-stars hero-black-hole-stars-b" />
          </div>
        </div>
        <div className="hero-title">Journey to the<br /><span>Event Horizon</span></div>
        <div className="hero-copy">At the center of the Messier 87 galaxy, 55 million light-years away, sits a boundary from which nothing - not even light - can escape. For most of the 20th century, imaging it was considered impossible. This is the story of the event horizon, the telescope built to find it, and the photograph that changed science forever.</div>
        <div className="hero-metrics">
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="EARTH" className="icon-glyph-metric" /></div><div className="metric-label">The Physics</div></div>
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="ORBIT" className="icon-glyph-metric" /></div><div className="metric-label">6 Stops</div></div>
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="BH" className="icon-glyph-metric" /></div><div className="metric-label">The Photograph</div></div>
        </div>
        <button className="hero-button" onClick={onStart}>Begin the Journey </button>
      </div>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));

  function goTo(next) {
    if (next < 0 || next >= LESSONS.length) return;
    setIndex(next);
    setVisited((current) => new Set([...current, next]));
  }

  function startJourney() {
    setStarted(true);
    setIndex(0);
    setVisited(new Set([0]));
  }

  function restart() {
    setStarted(false);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (!started) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") goTo(index + 1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") goTo(index - 1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, index]);

  const lesson = LESSONS[index];

  return (
    <div className="app">
      <div className="scene-glow" />
      {!started ? <Intro onStart={startJourney} /> : <LessonSlide lesson={lesson} index={index} total={LESSONS.length} visited={visited} goTo={goTo} onBack={() => goTo(index - 1)} onNext={() => goTo(index + 1)} onRestart={restart} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
