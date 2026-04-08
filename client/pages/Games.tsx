import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { SlideUpButton } from "@/components/SlideUpButton";
import { useState } from "react";

// ========================
// GAME COMPONENTS
// ========================

const MemoryGame = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍑", "🍊", "🍋"];

  const startGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setGameStarted(true);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-4">Jeu de Mémoire</h3>
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-berry-400 to-mint-400 text-white">
          Jouer 🎯
        </SlideUpButton>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center text-berry-600 mb-6">
        Paires : {matched.length / 2} / {emojis.length}
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg font-bold text-2xl transition-all duration-300 ${
              matched.includes(idx)
                ? "bg-mint-400 cursor-default scale-95"
                : flipped.includes(idx)
                ? "bg-sky-400 scale-105"
                : "bg-berry-300 hover:bg-berry-400 hover:scale-105"
            }`}
          >
            {flipped.includes(idx) || matched.includes(idx) ? card.emoji : "?"}
          </button>
        ))}
      </div>
      {matched.length === cards.length && (
        <motion.div
          className="mt-6 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-3xl font-bold text-green-500 mb-4">🎉 Vous avez gagné ! 🎉</div>
          <SlideUpButton onClick={startGame} className="bg-berry-400 text-white">
            Rejouer
          </SlideUpButton>
        </motion.div>
      )}
    </div>
  );
};

const AlphabetPuzzle = () => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setSelectedLetters([]);
    setScore(0);
  };

  const handleLetterClick = (letter: string) => {
    if (selectedLetters.includes(letter)) return;
    const newSelection = [...selectedLetters, letter];
    setSelectedLetters(newSelection);
    if (newSelection.every((l, i) => l === "ABCDEFG"[i])) {
      setScore(score + 1);
      setSelectedLetters([]);
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🔤</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-4">Puzzle Alphabet</h3>
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-sky-400 to-mint-400 text-white">
          Jouer 🎯
        </SlideUpButton>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center text-sky-600 mb-6">Score : {score}</div>
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-foreground/70 mb-4">
          Tapez les lettres dans l'ordre : A, B, C, D, E, F, G
        </p>
        <div className="flex gap-2 justify-center mb-4 min-h-[44px]">
          {selectedLetters.map((letter, i) => (
            <motion.div
              key={i}
              className="bg-mint-400 text-white font-bold text-xl w-10 h-10 rounded-lg flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["A", "B", "C", "D", "E", "F", "G", "Z"].map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-sky-400 text-white font-bold text-2xl hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105"
            disabled={selectedLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

const NumberCount = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentNumber(1);
    setScore(0);
  };

  const handleNumberClick = (num: number) => {
    if (num === currentNumber) {
      if (currentNumber === 10) {
        setScore(score + 1);
        setCurrentNumber(1);
      } else {
        setCurrentNumber(currentNumber + 1);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🔢</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-4">Compter les Chiffres</h3>
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-lavender-400 to-mint-400 text-white">
          Jouer 🎯
        </SlideUpButton>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center text-lavender-600 mb-6">Score : {score}</div>
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-foreground/70 mb-4">
          Cliquez sur les chiffres de 1 à 10 !
        </p>
        <motion.div
          className="text-5xl font-bold text-lavender-600"
          key={currentNumber}
          animate={{ scale: [1, 1.2, 1] }}
        >
          Suivant : {currentNumber}
        </motion.div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg font-bold text-2xl transition-all ${
              num === currentNumber
                ? "bg-gradient-to-r from-lavender-400 to-sky-400 text-white shadow-lg hover:scale-110"
                : "bg-gray-200 text-gray-400 cursor-default"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

const ColorMatch = () => {
  const colors = ["rouge", "bleu", "vert", "jaune"];
  const colorMap: Record<string, string> = {
    red: "bg-red-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400",
  };

  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    addToSequence();
  };

  const addToSequence = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);
    setPlayerSequence([]);
  };

  const handleColorClick = (color: string) => {
    const newPlayerSeq = [...playerSequence, color];
    setPlayerSequence(newPlayerSeq);

    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      setScore(sequence.length - 1);
      setSequence([]);
      setPlayerSequence([]);
      setGameStarted(false);
    } else if (newPlayerSeq.length === sequence.length) {
      setTimeout(addToSequence, 1000);
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-4">Couleurs Assorties</h3>
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-peach-400 to-berry-400 text-white">
          Jouer 🎯
        </SlideUpButton>
        {score > 0 && (
          <div className="mt-4 text-xl font-bold text-green-500">Dernier score : {score} ⭐</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center text-berry-600 mb-6">Niveau : {sequence.length}</div>
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            className={`h-20 sm:h-24 rounded-2xl ${colorMap[color]} shadow-lg transition-all hover:scale-105 active:scale-95 font-bold text-white uppercase text-sm`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizGame = () => {
  const questions = [
    { q: "Quel son fait un chien ?", options: ["Miaou", "Ouaf", "Meuh", "Coin-coin"], correct: 1 },
    { q: "De quelle couleur est le ciel ?", options: ["Vert", "Rouge", "Bleu", "Jaune"], correct: 2 },
    { q: "Combien de pattes a un chien ?", options: ["2", "3", "4", "5"], correct: 2 },
    { q: "Quel fruit est rouge et rond ?", options: ["Banane", "Orange", "Pomme", "Raisin"], correct: 2 },
    { q: "Que peut-on utiliser pour se déplacer ?", options: ["Cheval", "Voiture", "Vélo", "Tout cela"], correct: 3 },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [answered, setAnswered] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQ(0);
    setScore(0);
    setAnswered(false);
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    if (index === questions[currentQ].correct) setScore(score + 1);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswered(false);
    } else {
      setGameStarted(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">❓</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-4">Quiz !</h3>
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-sky-400 to-lavender-400 text-white">
          Jouer 🎯
        </SlideUpButton>
        {score > 0 && (
          <div className="mt-4 text-xl font-bold text-green-500">
            Dernier score : {score}/{questions.length} ⭐
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-lg font-bold text-sky-600 mb-2">
          Question {currentQ + 1}/{questions.length}
        </p>
        <h3 className="text-2xl font-bold text-foreground/80">{questions[currentQ].q}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {questions[currentQ].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={answered}
            className={`p-4 rounded-xl font-bold text-lg transition-all ${
              answered
                ? idx === questions[currentQ].correct
                  ? "bg-green-400 text-white scale-105"
                  : "bg-red-300 text-white opacity-60"
                : "bg-white border-2 border-sky-200 text-sky-600 hover:bg-sky-50 hover:scale-[1.02]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <SlideUpButton
            onClick={nextQuestion}
            className="w-full bg-gradient-to-r from-sky-400 to-mint-400 text-white justify-center"
          >
            {currentQ === questions.length - 1 ? "Terminer le jeu" : "Question suivante →"}
          </SlideUpButton>
        </motion.div>
      )}
    </div>
  );
};

const WordScramble = () => {
  const words = [
    { word: "CHAT",   hint: "🐱 Un animal doux qui miaule" },
    { word: "CHIEN",  hint: "🐶 Un animal fidèle qui aboie" },
    { word: "SOLEIL", hint: "☀️ Il brille dans le ciel" },
    { word: "FLEUR",  hint: "🌸 Une belle plante" },
    { word: "MAISON", hint: "🏠 Là où tu habites" },
    { word: "POMME",  hint: "🍎 Un fruit rouge ou vert" },
    { word: "LIVRE",  hint: "📚 Tu lis ceci" },
    { word: "ETOILE", hint: "⭐ Brille la nuit" },
  ];

  const [index, setIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const scramble = (w: string) =>
    w.split("").sort(() => Math.random() - 0.5).join("");

  const startGame = () => {
    setIndex(0);
    setScore(0);
    setInput("");
    setStatus("idle");
    setGameOver(false);
    setScrambled(scramble(words[0].word));
    setGameStarted(true);
  };

  const handleSubmit = () => {
    if (input.toUpperCase() === words[index].word) {
      setStatus("correct");
      setScore((s) => s + 1);
    } else {
      setStatus("wrong");
    }
    setTimeout(() => {
      if (index + 1 >= words.length) {
        setGameOver(true);
      } else {
        setIndex((i) => i + 1);
        setScrambled(scramble(words[index + 1].word));
        setInput("");
        setStatus("idle");
      }
    }, 900);
  };

  if (!gameStarted || gameOver) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🔀</div>
        <h3 className="text-2xl font-bold text-berry-600 mb-2">Mots Mélangés</h3>
        <p className="text-foreground/50 mb-5 text-sm">Démêlez les mots français !</p>
        {gameOver && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-5">
            <div className="text-4xl mb-2">{score >= 6 ? "🏆" : score >= 4 ? "🌟" : "💪"}</div>
            <div className="text-2xl font-black text-berry-600">{score}/{words.length}</div>
            <div className="text-foreground/50 text-sm mt-1">
              {score >= 6 ? "Incroyable !" : score >= 4 ? "Bravo !" : "Continue à pratiquer !"}
            </div>
          </motion.div>
        )}
        <SlideUpButton onClick={startGame} className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
          {gameOver ? "Rejouer 🔄" : "Jouer 🎯"}
        </SlideUpButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex justify-between w-full">
        <span className="text-sm font-bold text-foreground/50">{index + 1}/{words.length}</span>
        <span className="text-sm font-bold text-green-500">Score : {score} ⭐</span>
      </div>

      {/* Hint */}
      <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-orange-50 border-2 border-orange-200 rounded-2xl px-6 py-3 text-center"
      >
        <p className="text-base font-semibold text-orange-600">{words[index].hint}</p>
      </motion.div>

      {/* Scrambled word */}
      <motion.div key={`s-${index}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="flex gap-2 flex-wrap justify-center"
      >
        {scrambled.split("").map((ch, i) => (
          <div key={i} className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 text-white font-black text-xl flex items-center justify-center shadow-md">
            {ch}
          </div>
        ))}
      </motion.div>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && input && handleSubmit()}
        maxLength={words[index].word.length}
        placeholder="Tapez votre réponse..."
        className={`w-full text-center text-xl font-black uppercase tracking-widest border-3 rounded-2xl px-4 py-3 outline-none transition-all ${
          status === "correct" ? "border-green-400 bg-green-50 text-green-600" :
          status === "wrong"   ? "border-red-400 bg-red-50 text-red-500" :
          "border-orange-300 bg-white focus:border-orange-400"
        }`}
        style={{ borderWidth: 3 }}
      />

      {/* Feedback */}
      <AnimatePresence mode="wait">
        {status !== "idle" && (
          <motion.div key={status} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className={`text-2xl font-black ${ status === "correct" ? "text-green-500" : "text-red-500" }`}
          >
            {status === "correct" ? "✅ Correct !" : `❌ La réponse était : ${words[index].word}`}
          </motion.div>
        )}
      </AnimatePresence>

      <SlideUpButton
        onClick={handleSubmit}
        className="bg-gradient-to-r from-orange-400 to-pink-400 text-white w-full justify-center"
      >
        Vérifier ✓
      </SlideUpButton>
    </div>
  );
};

// ========================
// GAMES PAGE
// ========================

export const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { id: "memory",   emoji: "🎮", name: "Jeu de Mémoire",  desc: "Trouvez les paires !",           bg: "linear-gradient(135deg,#f472b6,#c084fc)", component: MemoryGame },
    { id: "alphabet", emoji: "🔤", name: "Puzzle Alphabet",   desc: "Tapez les lettres dans l'ordre !",      bg: "linear-gradient(135deg,#60a5fa,#34d399)", component: AlphabetPuzzle },
    { id: "numbers",  emoji: "🔢", name: "Compter les Chiffres",   desc: "Comptez de 1 à 10 !",        bg: "linear-gradient(135deg,#a78bfa,#60a5fa)", component: NumberCount },
    { id: "colors",   emoji: "🎨", name: "Couleurs Assorties",    desc: "Suivez le motif de couleurs !",  bg: "linear-gradient(135deg,#fb923c,#f472b6)", component: ColorMatch },
    { id: "quiz",     emoji: "❓", name: "Quiz",          desc: "Répondez aux questions !",      bg: "linear-gradient(135deg,#34d399,#60a5fa)", component: QuizGame },
    { id: "scramble", emoji: "🔀", name: "Mots Mélangés",      desc: "Démêlez les mots français !",   bg: "linear-gradient(135deg,#fbbf24,#fb923c)", component: WordScramble },
  ];

  if (selectedGame) {
    const game = games.find((g) => g.id === selectedGame);
    const GameComponent = game?.component!;

    return (
      <main className="relative min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-lavender-50 via-mint-50 to-sky-50">
        <Navbar />
        <section className="pt-24 pb-16 px-4 min-h-screen">
          <div className="max-w-2xl mx-auto">

            {/* Back button */}
            <motion.button
              onClick={() => setSelectedGame(null)}
              className="mb-6 flex items-center gap-2 text-sm font-bold text-berry-600 hover:text-berry-700 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -4 }}
            >
              ← Retour aux jeux
            </motion.button>

            {/* Game header */}
            <motion.div
              className="rounded-3xl p-5 mb-4 flex items-center gap-4"
              style={{ background: game?.bg }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {game?.emoji}
              </motion.div>
              <div>
                <h2 className="text-2xl font-black text-white drop-shadow">{game?.name}</h2>
                <p className="text-white/70 text-sm">{game?.desc}</p>
              </div>
            </motion.div>

            {/* Game card */}
            <motion.div
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, type: "spring", stiffness: 160, damping: 18 }}
            >
              <GameComponent />
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-lavender-300 via-sky-300 to-mint-300 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 text-8xl opacity-20 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          🎮
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedTitle
            title="🎯 J<b>e</b>ux<br />Am<b>u</b>sants"
            containerClass="!text-white drop-shadow-lg"
          />
          <p className="text-center mt-4 font-general text-sm uppercase text-white/80">
            Jouez, apprenez et amusez-vous !
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 bg-gradient-to-b from-lavender-50 via-mint-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <button
                  onClick={() => setSelectedGame(game.id)}
                  className="group relative w-full h-full text-left rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  style={{ background: game.bg }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
                  />

                  {/* Floating bg emoji */}
                  <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 select-none pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                    {game.emoji}
                  </div>

                  <div className="relative p-7">
                    {/* Emoji badge */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-5 shadow-md"
                      style={{ background: "rgba(255,255,255,0.35)" }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {game.emoji}
                    </motion.div>

                    <h3 className="text-xl font-black text-white mb-1 drop-shadow">{game.name}</h3>
                    <p className="text-white/70 text-sm mb-5">{game.desc}</p>

                    {/* Play button */}
                    <div className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest transition-all group-hover:gap-3">
                      Jouer
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >→</motion.span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
