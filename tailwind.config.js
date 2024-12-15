export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ajoutez cette ligne pour activer le mode sombre
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      colors: {
        // Vous pouvez ajouter des couleurs personnalisées pour le mode sombre si nécessaire
        dark: {
          background: '#121212',
          text: '#e0e0e0',
          card: '#1e1e1e'
        }
      }
    },
  },

  plugins: [],
}