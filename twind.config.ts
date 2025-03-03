import { Options } from "$fresh/plugins/twind.ts";
import { Configuration } from "twind";

export default {
  ...({
    theme: {
      extend: {
        fontFamily: {
          serif: ['Montaga', 'serif'],
          fa: ['FA CPNWJSUOMXE', 'sans-serif'],
        },
        colors: {
          backgroundColor: '#EEE',
          activeColor: '#000',
          white: '#EEE',
          pink: 'rgb(147, 123, 151)',
        },
        keyframes: {
          bounceAround: {
            '0%, 30%, 100%': { transform: 'translateX(0) rotate(0deg)' },
            '58%': { transform: 'translateX(-10px) rotate(-6deg)' },
            '60%': { transform: 'translateX(12px) rotate(1deg)' },
            '70%': { transform: 'translateY(-5px)' },
            '73%': { transform: 'translateX(-5px) scale(1.1)' },
            '75%': { transform: 'translateX(3px) scale(0.95)' },
          },
          nameChange: {
            '0%, 60%': { opacity: 1},
            '61%, 71%': { opacity: 0 },
            '71.5%, 100%': { opacity: 1 },
          },
          nameChangeDelay: {
            '0%, 61%': { opacity: 0, scale: 1.2 },
            '61.5%, 64%': { opacity: 1, scale: 1.2 },
            '64.5%, 100%': { opacity: 0, scale: 1 },
          },
          nameChangeDelay2: {
            '0%, 63.5%': { opacity: 0 },
            '64%, 66.5%': { opacity: 1 },
            '67%, 100%': { opacity: 0 },
          },
          nameChangeDelay3: {
            '0%, 66%': { opacity: 0 },
            '66.5%, 69%': { opacity: 1 },
            '69.5%, 100%': { opacity: 0 },
          },
          nameChangeDelay4: {
            '0%, 68.5%': { opacity: 0 },
            '69%, 71.5%': { opacity: 1 },
            '72%, 100%': { opacity: 0 },
          },
          nameChangeDelay5: {
            '0%, 71%': { opacity: 0 },
            '71.5%, 74%': { opacity: 1 },
            '74.5%, 100%': { opacity: 0 },
          },
          nameChangeDelay6: {
            '0%, 73.5%': { opacity: 0 },
            '74%, 76.5%': { opacity: 1 },
            '77%, 100%': { opacity: 0 },
          },
          nameChangeDelay7: {
            '0%, 76%': { opacity: 0 },
            '76.5%, 79%': { opacity: 1 },
            '79.5%, 100%': { opacity: 0 },
          },
          textScroll: {
            '0%': { transform: 'rotate(2deg)' },
            '20%': { transform: 'translateX(0%)' },
            '40%': { transform: 'rotate(-2deg)' },
            '60%': { transform: 'translateX(0%)' },
            '80%': { transform: 'rotate(2deg)' },
            '100%': { transform: 'translateX(-100%), rotate(-3deg)' }
          },
        },
        animation: {
          'bounce-around': 'bounceAround 12s ease-in-out infinite',
          'name-change': 'nameChange 12s ease-in-out infinite',
          'name-change-delay': 'nameChangeDelay 12s ease-in-out infinite',
          'name-change-delay-2': 'nameChangeDelay2 12s ease-in-out infinite',
          'name-change-delay-3': 'nameChangeDelay3 12s ease-in-out infinite',
          'name-change-delay-4': 'nameChangeDelay4 12s ease-in-out infinite',
          'name-change-delay-5': 'nameChangeDelay5 12s ease-in-out infinite',
          'name-change-delay-6': 'nameChangeDelay6 12s ease-in-out infinite',
          'name-change-delay-7': 'nameChangeDelay7 12s ease-in-out infinite',
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
      'link': 'text-activeColor hover:underline',
      'menu-link': 'text-lg hover:underline hover:text-activeColor',
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
