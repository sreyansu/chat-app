/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-100 with opacity
        input: "var(--color-input)", // gray-800
        ring: "var(--color-ring)", // teal-500
        background: "var(--color-background)", // gray-900
        foreground: "var(--color-foreground)", // gray-100
        primary: {
          DEFAULT: "var(--color-primary)", // teal-500
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-700
          foreground: "var(--color-secondary-foreground)", // gray-100
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-400
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-800
          foreground: "var(--color-muted-foreground)", // gray-400
        },
        accent: {
          DEFAULT: "var(--color-accent)", // gray-800
          foreground: "var(--color-accent-foreground)", // gray-100
        },
        popover: {
          DEFAULT: "var(--color-popover)", // gray-700
          foreground: "var(--color-popover-foreground)", // gray-100
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-800
          foreground: "var(--color-card-foreground)", // gray-100
        },
        success: {
          DEFAULT: "var(--color-success)", // teal-400
          foreground: "var(--color-success-foreground)", // gray-800
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-300
          foreground: "var(--color-warning-foreground)", // gray-800
        },
        error: {
          DEFAULT: "var(--color-error)", // red-400
          foreground: "var(--color-error-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)", // 8px
        md: "calc(var(--radius) - 2px)", // 6px
        sm: "calc(var(--radius) - 4px)", // 4px
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'elevation-3': '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        "scale-in": "scaleIn 150ms ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
        "spring-in": "springIn 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}