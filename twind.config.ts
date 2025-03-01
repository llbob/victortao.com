import { Options } from "$fresh/plugins/twind.ts";
import { Configuration } from "twind";

export default {
  ...({
    theme: {
      extend: {
        fontFamily: {
          sans: ['Object Sans', 'sans-serif'],
          serif: ['Domine', 'serif'],
        },
        colors: {
          backgroundColor: '#EEE',
          activeColor: '#000',
          white: '#EEE',
          pink: '#FFC0CB',
        },
        keyframes: {
          bounceAround: {
            '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
            '10%': { transform: 'translateX(-10px) rotate(-2deg)' },
            '30%': { transform: 'translateX(5px) rotate(1deg)' },
            '50%': { transform: 'translateY(-5px)' },
            '70%': { transform: 'translateX(-5px) scale(1.1)' },
            '90%': { transform: 'translateX(3px) scale(0.95)' },
          },
          nameChange: {
            '0%, 24%, 100%': { opacity: 1 },
            '25%, 99%': { opacity: 0 },
          },
          nameChangeDelay: {
            '0%, 24%, 49%, 100%': { opacity: 0 },
            '25%, 48%': { opacity: 1 },
          },
          nameChangeDelay2: {
            '0%, 49%, 74%, 100%': { opacity: 0 },
            '50%, 73%': { opacity: 1 },
          },
          nameChangeDelay3: {
            '0%, 74%, 99%': { opacity: 0 },
            '75%, 98%': { opacity: 1 },
          },
          textScroll: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' }
          },
        },
        animation: {
          'bounce-around': 'bounceAround 16s ease-in-out infinite',
          'name-change': 'nameChange 16s ease-in-out infinite',
          'name-change-delay': 'nameChangeDelay 16s ease-in-out infinite',
          'name-change-delay-2': 'nameChangeDelay2 16s ease-in-out infinite',
          'name-change-delay-3': 'nameChangeDelay3 16s ease-in-out infinite',
          'text-scroll': 'textScroll 10s linear infinite',
        }        
      },
    },
    preflight: {
      body: {
        fontFamily: '"Object Sans", sans-serif',
        fontOpticalSizing: 'auto',
        fontVariationSettings: '"wdth" 100',
        backgroundColor: '#F8F8F8',
      },
    },
    plugins: {
      'projects-image': 'w-full h-[600px] object-cover mt-4 transition-all duration-300 ease-in-out hover:opacity-95',
      'page-name': 'pb-2',
      'menu-item': 'text-gray-800 transition-colors duration-300 ease-in-out hover:underline',
      'projects-card': 'overflow-hidden transition-shadow duration-300 ease-in-out mb-16',
      'avatar': 'max-w-full h-auto',
      'link': 'text-activeColor hover:underline',
      'menu-link': 'text-md hover:underline hover:text-activeColor',
      'index-image': 'h-[80vh] w-full object-cover mb-2',
      'scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
    },
  } as Configuration),
  selfURL: import.meta.url,
} as Options;
