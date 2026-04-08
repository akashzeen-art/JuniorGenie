export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-screen bg-gradient-to-r from-berry-500 via-lavender-500 to-mint-500 py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🫐</span>
          <span className="font-bold text-sm">Junior Genie</span>
        </div>
        <p className="text-center text-sm font-light">
          © {currentYear} Junior Genie. Créé avec 💜 pour les enfants du monde entier !
        </p>
        <div className="flex gap-3 text-lg">
          <span>🎬</span>
          <span>🎮</span>
          <span>📚</span>
          <span>✨</span>
        </div>
      </div>
    </footer>
  );
};
