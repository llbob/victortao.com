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
          backgroundColor: '#F8F8F8',
        },
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
      'link': 'text-blue-800 underline hover:text-gray-800',
      'index-image': 'h-[80vh] w-full object-cover mb-2',
    },
  } as Configuration),
  selfURL: import.meta.url,
} as Options;
