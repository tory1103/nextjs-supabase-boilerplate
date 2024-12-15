import type { Config } from 'tailwindcss';


export default {
	darkMode: [ 'class' ],
	content : [ './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}' ],
	theme   : {
		extend: {
			backgroundImage: {
				'default-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.11\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");'
			},
			borderRadius   : {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors         : {
				background : 'hsl(var(--background))',
				foreground : 'hsl(var(--foreground))',
				card       : {
					DEFAULT   : 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover    : {
					DEFAULT   : 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary    : {
					DEFAULT   : 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary  : {
					DEFAULT   : 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted      : {
					DEFAULT   : 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent     : {
					DEFAULT   : 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT   : 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border     : 'hsl(var(--border))',
				input      : 'hsl(var(--input))',
				ring       : 'hsl(var(--ring))',
				chart      : {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins : [ require( 'tailwindcss-animate' ) ]
} satisfies Config;
