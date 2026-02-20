/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acid: '#B0041A',
        coral: '#FFC95F',
        electric: '#500711',
        ink: '#0D0D0D',
        paper: '#FAF7F2',
        merlot: '#500711',
        ruby: '#B0041A',
        gold: '#FFC95F',
        pink: '#ED9BBD',
        cream: '#F8E8EE',
      },
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #0D0D0D',
        'brutal-accent': '4px 4px 0px 0px #B0041A',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
