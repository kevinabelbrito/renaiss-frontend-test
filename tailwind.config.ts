import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'orange': {
          primary: '#F97316',
          secondary: '#FFEDD5',
          alternative: '#FDBA74'
        },
        'gray': {
          primary: '#64748B',
          secondary: '#CCCCCC',
          alternative: '#CBD5E1'
        },
        'slate': {
          300: '#CBD5E1',
          400: '#94A3B8',
          800: '#1E293B'
        },
        'emerald': {
          600: '#10B981'
        }
      },
      boxShadow: {
        'container-main': '0px 0px 6px rgba(46, 58, 90, 0.09)'
      },
      opacity: {
        '35': '35%',
        '55': '55%'
      },
      borderRadius: {
        'container': '10px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config
