import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#1e293b',
        },
        silver: '#C0C0C0',
        'silver-dark': '#a9a9a9',
      },
      backgroundImage: {
        'dots-pattern': "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'dots-size': '20px 20px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
