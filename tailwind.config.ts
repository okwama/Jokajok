
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// African-inspired color palette - DEEP EARTH TONES ONLY
				'charred-wood': {
					DEFAULT: '#1E1B18',
					light: '#2B2621',
					dark: '#151310',
				},
				'dark-clay': {
					50: '#3A3226',
					100: '#2F2A20',
					200: '#28241C',
					300: '#1E1B18',
					400: '#181614',
					500: '#121110',
					600: '#0F0E0D',
					700: '#0A0909',
					800: '#070706',
					900: '#040404',
				},
				'swahili-dust': {
					50: '#D7CEC7',
					100: '#C4B8AF',
					200: '#B1A397',
					300: '#9E8D7F',
					400: '#8B7767',
					500: '#A78A7F',
					600: '#967A6F',
					700: '#856A5F',
					800: '#745A4F',
					900: '#634A3F',
					dark: '#52392F',
				},
				'burnished-copper': {
					50: '#E8D5C4',
					100: '#DCC4A8',
					200: '#D0B38C',
					300: '#C4A270',
					400: '#B89154',
					500: '#B87333',
					600: '#A6672E',
					700: '#945B29',
					800: '#824F24',
					900: '#70431F',
					dark: '#5E371A',
				},
				'copper-wood': {
					50: '#E5D6C8',
					100: '#D9C7B5',
					200: '#CDB8A2',
					300: '#C1A98F',
					400: '#B59A7C',
					500: '#A98B69',
					600: '#9D7C56',
					700: '#916D43',
					800: '#855E30',
					900: '#794F1D',
				},
				'soft-sand': {
					DEFAULT: '#D7CEC7',
					light: '#E0D7D0',
					dark: '#CEC5BE',
				}
			},
			fontFamily: {
				sans: ['Sawarda Nubian', 'serif'],
				serif: ['Sawarda Nubian', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) scale(1)',
						filter: 'brightness(1)'
					},
					'50%': { 
						transform: 'translateY(-10px) scale(1.02)',
						filter: 'brightness(1.1)'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite'
			},
			backgroundImage: {
				'african-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23A78A7F\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
