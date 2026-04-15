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

const { useEffect, useState } = React;

const LESSONS = [
  {
    id: "earth",
    label: "Earth",
    icon: "EARTH",
    route: "back on Earth",
    routeMeta: "Home to galactic center",
    title: "Mission Briefing",
    eyebrow: "You are on Earth. At the center of our galaxy, something extraordinary lurks.",
    bullets: [
      "Black holes are regions where gravity becomes so strong that not even light can escape.",
      "Most large galaxies, including the Milky Way, contain a supermassive black hole at their center.",
      "The defining boundary is the event horizon: cross it, and nothing returns.",
      "This journey explains what that boundary is, how scientists photographed one, and what the image revealed."
    ],
    keyFact: "Black holes are not cosmic vacuum cleaners. They only pull objects in if those objects get too close. From a safe distance, their gravity behaves like any other object with equal mass.",
    stat: { value: "4M", label: "solar masses of Sagittarius A*, the black hole at our galaxy's center" },
    bonusFacts: [
      { icon: "MAP", title: "Nearest black hole", body: "The nearest known stellar-mass black hole is about 1,500 light-years away in the constellation Monoceros, far enough away to be completely safe." },
      { icon: "TIME", title: "Time dilation", body: "Near a black hole, time itself runs slower due to extreme gravity. That effect is real and measurable in general relativity." },
      { icon: "CORE", title: "Sgr A*", body: "Sagittarius A* contains about 4 million solar masses and sits around 26,000 light-years from Earth at the center of the Milky Way." }
    ],
    visual: "earth"
  },
  {
    id: "horizon",
    label: "Event Horizon",
    icon: "BH",
    route: "Photon sphere",
    routeMeta: "Light orbits here",
    title: "The Point of No Return",
    eyebrow: "The event horizon is the most famous boundary in physics: invisible, yet absolute.",
    bullets: [
      "The event horizon is the boundary around a black hole beyond which nothing can escape.",
      "It is not a solid surface you can touch. It is a boundary in spacetime.",
      "Once something crosses it, every possible future path leads inward.",
      "At that boundary, escape velocity equals the speed of light.",
      "For a non-rotating black hole, its size is described by the Schwarzschild radius: r = 2GM/c^2."
    ],
    keyFact: "For Earth's mass, the Schwarzschild radius, the size of Earth's event horizon if it collapsed, would be just 9 millimeters. Smaller than a marble.",
    stat: { value: "9mm", label: "how small Earth's event horizon would be if Earth were compressed into a black hole" },
    bonusFacts: [
      { icon: "TIDE", title: "Spaghettification", body: "Near a stellar black hole, tidal forces would stretch your body because gravity is stronger at your feet than at your head." },
      { icon: "SLOW", title: "Frozen in time", body: "To a distant observer, anything falling toward a black hole appears to slow down, dim, and redshift near the horizon." },
      { icon: "QNTM", title: "Hawking radiation", body: "Stephen Hawking predicted black holes should slowly lose mass through quantum effects near the horizon, though very slowly for large ones." }
    ],
    visual: "horizon"
  },
  {
    id: "matters",
    label: "Why It Matters",
    icon: "IDEA",
    route: "The Event Horizon - Deeper Dive",
    routeMeta: "Exploring the boundary of the known universe",
    title: "Why the Event Horizon Matters",
    eyebrow: "A boundary in spacetime that tests the limits of physics and took over a century to photograph.",
    bullets: [
      "The event horizon is where general relativity and quantum mechanics collide most directly.",
      "Both theories work extremely well, but they make conflicting predictions about what happens there.",
      "The information paradox asks whether information that falls into a black hole is lost forever.",
      "General relativity points toward loss, while quantum mechanics says information cannot be destroyed.",
      "That conflict is one of the biggest unsolved problems in theoretical physics."
    ],
    stat: { value: "103 years", label: "from Schwarzschild's 1916 solution to the first photograph in 2019" },
    bonusFacts: [
      { icon: "INFO", title: "Information paradox", body: "If matter falls into a black hole, is its information permanently lost? General relativity says yes. Quantum mechanics says no." },
      { icon: "ORBIT", title: "Photon sphere", body: "At 1.5 times the Schwarzschild radius, gravity is strong enough to trap photons in circular orbits, helping create the glowing ring seen in EHT images." },
      { icon: "SPIN", title: "Rotating horizons", body: "Rotating black holes have more complex structure than non-rotating ones, including frame dragging outside the horizon." }
    ],
    visual: "deep"
  },
  {
    id: "eht",
    label: "EHT",
    icon: "EHT",
    route: "Back on Earth - The EHT",
    routeMeta: "All 8 telescope sites combined",
    title: "The Event Horizon Telescope",
    eyebrow: "How humans built a virtual Earth-sized telescope and why they needed one.",
    bullets: [
      "A single telescope could not resolve a black hole's event horizon sharply enough.",
      "Astronomers linked radio telescopes across Earth using Very Long Baseline Interferometry, or VLBI.",
      "Each site observed simultaneously and timestamped its data with atomic clocks.",
      "When the recordings were combined, the network acted like one Earth-sized telescope."
    ],
    keyFact: "The EHT reaches an angular resolution of about 20 micro-arcseconds, sharp enough to read a newspaper in New York from a sidewalk cafe in Paris.",
    stat: { value: "8", label: "telescope sites across 6 continents forming one virtual Earth-sized telescope" },
    bonusFacts: [
      { icon: "LINK", title: "VLBI", body: "Very Long Baseline Interferometry combines signals from telescopes thousands of kilometers apart, filling in detail as Earth rotates." },
      { icon: "DATA", title: "5 petabytes", body: "The 2017 observing campaign produced about 5 petabytes of data, too much to send online, so drives were physically shipped." },
      { icon: "ICE", title: "Antarctica wait", body: "The South Pole Telescope's hard drives had to wait months for the next flight out of Antarctica before processing could begin." }
    ],
    visual: "eht"
  },
  {
    id: "m87",
    label: "M87",
    icon: "M87",
    route: "M87 - 55 million light-years away",
    routeMeta: "Target: Messier 87 galaxy",
    title: "Why M87*?",
    eyebrow: "The EHT needed a target big enough to actually image. M87* won.",
    bullets: [
      "Once Earth-sized resolution was possible, scientists still needed the right target.",
      "Messier 87 is a giant elliptical galaxy 55 million light-years away.",
      "At its center is M87*, a black hole with about 6.5 billion times the Sun's mass.",
      "Its event horizon appears larger in the sky than Sagittarius A* even though it is much farther away.",
      "M87* also changes more slowly, making it easier to image clearly."
    ],
    keyFact: "M87* is so massive that our entire solar system could fit inside its event horizon many times over. Its horizon spans about 120 billion kilometers.",
    stat: { value: "6.5B", label: "solar masses - the immense size of M87*, the first black hole ever photographed" },
    bonusFacts: [
      { icon: "JET", title: "Relativistic jet", body: "M87 is famous for launching a jet of plasma thousands of light-years long at nearly the speed of light." },
      { icon: "WHY", title: "Why not Sgr A*?", body: "Sagittarius A* is smaller and changes more rapidly, so its image blurs more easily during a long observing run." },
      { icon: "NEXT", title: "Sgr A* later", body: "In May 2022, the EHT released the first image of our own galaxy's black hole after solving a tougher imaging problem." }
    ],
    visual: "m87"
  },
  {
    id: "image",
    label: "First Image",
    icon: "IMG",
    route: "Historic release",
    routeMeta: "First direct black hole image",
    title: "The First Image of a Black Hole",
    eyebrow: "On April 10, 2019, the Event Horizon Telescope Collaboration showed humanity something no one had ever seen.",
    bullets: [
      "The image shows a bright, uneven ring surrounding a dark central shadow.",
      "The glowing ring is superheated plasma in the accretion disk.",
      "Its light is bent by the black hole's extreme gravity before reaching us.",
      "One side looks brighter because material there is moving toward Earth and is relativistically boosted.",
      "The dark interior is the black hole shadow, matching Einstein's predictions remarkably well."
    ],
    keyFact: "The image confirmed Einstein's general theory of relativity in one of the most extreme environments in the known universe.",
    stat: { value: "Apr 10, 2019", label: "the date humanity first photographed a black hole" },
    bonusFacts: [
      { icon: "SHDW", title: "The shadow", body: "The dark central region is not just the event horizon, but the enlarged shadow created by bent light paths near the black hole." },
      { icon: "GLOW", title: "Brightness asymmetry", body: "The side of the ring rotating toward Earth is relativistically boosted, making it appear brighter than the receding side." },
      { icon: "TEST", title: "Einstein confirmed", body: "The measured size of the shadow matched general relativity predictions to within about 10%, one of its strongest tests." }
    ],
    visual: "photo"
  },
  {
    id: "quiz",
    label: "Mini Quiz",
    icon: "TEST",
    route: "Final checkpoint",
    routeMeta: "Mini review challenge",
    title: "Mini Quiz",
    eyebrow: "A dedicated end-of-journey question so the information slides stay focused on the lesson.",
    bullets: [
      "These questions cover the event horizon, the Event Horizon Telescope, and the first black hole image.",
      "Select one answer for each question, then submit the quiz to see your score.",
      "Use the final percentage as a quick check on how well the main concepts stuck."
    ],
    stat: { value: "4", label: "interactive review questions at the end of the journey" },
    bonusFacts: [],
    quizQuestions: [
      {
        question: "Why did it take until 2019 to photograph a black hole's event horizon, despite the theory existing since 1916?",
        options: [
          "Scientists did not believe black holes were real until then.",
          "The angular size is too tiny, so we needed a telescope effectively the size of Earth.",
          "Black holes only formed recently in the universe.",
          "Existing optical telescopes were blocked by Earth's atmosphere alone."
        ],
        correct: 1
      },
      {
        question: "What is the event horizon?",
        options: [
          "The glowing ring of gas around every planet.",
          "A solid shell surrounding a black hole.",
          "The boundary beyond which nothing can escape a black hole.",
          "The point where black holes are created in a supernova."
        ],
        correct: 2
      },
      {
        question: "What made the Event Horizon Telescope powerful enough to image M87*?",
        options: [
          "It used visible-light cameras in space.",
          "It linked observatories across Earth to act like one huge telescope.",
          "It flew a telescope close to the black hole.",
          "It only observed black holes during solar eclipses."
        ],
        correct: 1
      },
      {
        question: "What does the dark center in the first black hole image represent?",
        options: [
          "The enlarged shadow caused by light bending near the black hole.",
          "A hole in the camera sensor.",
          "A nearby planet blocking the view.",
          "A cold cloud of gas in front of the galaxy."
        ],
        correct: 0
      }
    ],
    visual: "quiz"
  }
];

const DEEP_CARDS = [
  { title: "Schwarzschild Horizon", subtitle: "Non-rotating black hole", color: "#b889ff", bullets: ["The simplest event horizon: a perfect sphere.", "Radius r = 2GM/c^2 for a black hole of mass M.", "Time appears frozen at this surface to a distant observer."] },
  { title: "Kerr Horizon", subtitle: "Rotating black hole", color: "#6f86ff", bullets: ["Real black holes spin, formed from rotating stars.", "A rotating hole has an outer event horizon and frame dragging outside it.", "The ergosphere lets objects extract rotational energy."] }
];

const TIMELINE = [
  { year: "1916", text: "Schwarzschild solves Einstein's equations and predicts black holes.", color: "#af7eff" },
  { year: "1939", text: "Oppenheimer and Snyder show stars can collapse into black holes.", color: "#8d95ff" },
  { year: "1967", text: "John Wheeler coins the term 'black hole'.", color: "#69b3ff" },
  { year: "1974", text: "Hawking predicts black holes slowly radiate away.", color: "#3ae28b" },
  { year: "1994", text: "Hubble provides indirect evidence for supermassive black holes.", color: "#f0a03a" },
  { year: "2019", text: "EHT captures the first direct image of an event horizon shadow.", color: "#ffd84a" }
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
    setRevealed(Array(facts.length).fill(false));
  }, [slideIndex, facts.length]);

  const discovered = revealed.filter(Boolean).length;

  function toggleCard(index) {
    setRevealed((current) => current.map((item, i) => (i === index ? !item : item)));
  }

  function getFactBullets(fact) {
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
          <div key={fact.title} className={`bonus-card ${revealed[index] ? "revealed" : ""}`} onClick={() => toggleCard(index)}>
            <div className="bonus-icon"><IconGlyph type={fact.icon} className="icon-glyph-bonus" /></div>
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

  function submitQuiz() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function resetQuiz() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="quiz-box">
      <div className="quiz-title">Mini quiz</div>
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
          </div>
        ))}
      </div>
      <div className="quiz-actions">
        {!submitted && <button type="button" className="nav-button primary" onClick={submitQuiz} disabled={!allAnswered}>Submit Quiz</button>}
        {!allAnswered && !submitted && <div className="quiz-meta">Answer all {questions.length} questions to calculate your score.</div>}
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
              <div className="tab-label">{lesson.label}</div>
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
  return <div className="visual-stage"><div className="moon" /><div className="planet" /></div>;
}

function HorizonVisual() {
  return (
    <div className="visual-stage">
      <div className="bh-stage"><div className="bh-ring" /><div className="bh-disk" /><div className="bh-core" /></div>
      <div className="stage-label" style={{ top: 36, right: 18, color: "#f0b031" }}>Photon sphere</div>
      <div className="stage-label" style={{ left: 44, bottom: 76 }}>Accretion disk</div>
      <div className="stage-label" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff" }}>Event Horizon</div>
    </div>
  );
}

function DeepVisual() {
  return (
    <div className="deep-column">
      {DEEP_CARDS.map((card) => (
        <div key={card.title} className="deep-card" style={{ borderColor: `${card.color}44` }}>
          <h4 style={{ color: card.color }}>{card.title}</h4>
          <p>{card.subtitle}</p>
          <ul>{card.bullets.map((bullet) => <li key={bullet}>- {bullet}</li>)}</ul>
        </div>
      ))}
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
      <div className="photo-card">
        <div className="photo-frame">
          <img className="bh-photo" src="../FirstBlackHole.jpg" alt="First black hole image captured by the Event Horizon Telescope" />
        </div>
        <div className="photo-caption-title">Actual EHT Photograph - M87*</div>
        <div className="photo-caption-copy">April 10, 2019. The first-ever image of a black hole. The bright ring is superheated plasma. The dark center is the event horizon shadow.</div>
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
              {lesson.keyFact && <div className="fact-box"><div className="fact-title">Key Fact</div><div className="fact-copy">{lesson.keyFact}</div></div>}
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
        <div className="hero-planet-wrap"><div className="moon" style={{ top: 24, right: 30 }} /><div className="planet" /></div>
        <div className="hero-title">Journey to the<br /><span>Event Horizon</span></div>
        <div className="hero-copy">Begin in your home state. Navigate step by step through the cosmos. Arrive at one of the universe's most extreme boundaries and discover how humanity photographed it for the first time.</div>
        <div className="hero-metrics">
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="EARTH" className="icon-glyph-metric" /></div><div className="metric-label">Start on Earth</div></div>
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="ORBIT" className="icon-glyph-metric" /></div><div className="metric-label">6 Stops</div></div>
          <div className="metric-card"><div className="metric-icon"><IconGlyph type="BH" className="icon-glyph-metric" /></div><div className="metric-label">Reach the Horizon</div></div>
        </div>
        <button className="hero-button" onClick={onStart}>Begin the Journey -></button>
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
