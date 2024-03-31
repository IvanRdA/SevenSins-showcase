import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'black': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#000000' // MAIN
        },
        'black-pearl': {
          '50': '#f0f7ff',
          '100': '#e1eefd',
          '200': '#bbdcfc',
          '300': '#7fbefa',
          '400': '#3c9ff4',
          '500': '#1281e5',
          '600': '#0665c3',
          '700': '#06509e',
          '800': '#094583',
          '900': '#0e3b6c',
          '950': '#051427' // MAIN
        },
        'cab-sav': {
          '50': '#fef2f2',
          '100': '#fce7e7',
          '200': '#f9d2d5',
          '300': '#f4adb2',
          '400': '#ed7f88',
          '500': '#e15261',
          '600': '#cd3149',
          '700': '#ac243d',
          '800': '#902139',
          '900': '#7c1f36',
          '950': '#530f1e' // MAIN
        },
        'cognac': {
          '50': '#fdf6ef',
          '100': '#faebda',
          '200': '#f3d4b5',
          '300': '#ebb686',
          '400': '#e28f55',
          '500': '#dc7233',
          '600': '#cd5b29',
          '700': '#a44322', // MAIN
          '800': '#893923',
          '900': '#6e3120',
          '950': '#3b160f'
        },
        'lightning-yellow': {
          '50': '#fffeea',
          '100': '#fffbc6',
          '200': '#fff787',
          '300': '#ffec49',
          '400': '#ffdd1f',
          '500': '#f8bc04', /// MAIN
          '600': '#de9301',
          '700': '#b86905',
          '800': '#95500b',
          '900': '#7b420c',
          '950': '#472201'
        },
        'white': {
          '50': '#ffffff', // MAIN
          '100': '#efefef',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929'
        }
      }
    }
  },
  plugins: []
}
export default config
