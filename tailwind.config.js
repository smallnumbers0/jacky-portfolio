/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'selector', // Use class-based dark mode with system preference fallback
  theme: {
    extend: {
      spacing: {
        'section': '5rem',        // 20 * 0.25rem (py-20)
        'section-sm': '8rem',     // 32 * 0.25rem (py-32)
      },
      maxWidth: {
        'content': '56rem',       // 4xl equivalent
        'content-wide': '80rem',  // 5xl equivalent
        'content-full': '96rem',  // 6xl equivalent
      },
      fontSize: {
        'heading-xl': ['3.5rem', { lineHeight: '1.1' }],    // ~7xl
        'heading-lg': ['2.5rem', { lineHeight: '1.2' }],    // ~4xl
        'heading-md': ['1.875rem', { lineHeight: '1.3' }],  // ~3xl
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],     // ~lg with relaxed leading
        'body': ['1rem', { lineHeight: '1.7' }],            // ~base with relaxed leading
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-up-delay-1': 'fade-in-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards',
        'fade-in-up-delay-2': 'fade-in-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s forwards',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(24px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}