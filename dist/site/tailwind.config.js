/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--primary), ${opacityValue})`
            : `rgba(var(--primary))`;
        },
        'primary-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--primary-hover), ${opacityValue})`
            : `rgba(var(--primary-hover))`;
        },
        'primary-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--primary-active), ${opacityValue})`
            : `rgba(var(--primary-active))`;
        },
        'default': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--default), ${opacityValue})`
            : `rgba(var(--default))`;
        },
        'default-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--default-hover), ${opacityValue})`
            : `rgba(var(--default-hover))`;
        },
        'default-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--default-active), ${opacityValue})`
            : `rgba(var(--default-active))`;
        },
        'page': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--page), ${opacityValue})`
            : `rgba(var(--page))`;
        },

        // Text colors
        'text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--text), ${opacityValue})`
            : `rgba(var(--text))`;
        },
        'text-primary': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--text-primary), ${opacityValue})`
            : `rgba(var(--text-primary))`;
        },
        'text-secondary': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--text-secondary), ${opacityValue})`
            : `rgba(var(--text-secondary))`;
        },
        'text-faint': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--text-faint), ${opacityValue})`
            : `rgba(var(--text-faint))`;
        },
        'text-button': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--text-button), ${opacityValue})`
            : `rgba(var(--text-button))`;
        },

        // Background colors
        'background': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--background), ${opacityValue})`
            : `rgba(var(--background))`;
        },
        'shade': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--shade), ${opacityValue})`
            : `rgba(var(--shade))`;
        },
        'shade-2': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--shade-2), ${opacityValue})`
            : `rgba(var(--shade-2))`;
        },
        'tooltip': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--tooltip), ${opacityValue})`
            : `rgba(var(--tooltip))`;
        },
        'tooltip-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--tooltip-text), ${opacityValue})`
            : `rgba(var(--tooltip-text))`;
        },

        // Header
        'header': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header), ${opacityValue})`
            : `rgba(var(--header))`;
        },
        'header-border': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-border), ${opacityValue})`
            : `rgba(var(--header-border))`;
        },
        'header-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-text), ${opacityValue})`
            : `rgba(var(--header-text))`;
        },
        'header-text-gradient-from': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-text-gradient-from), ${opacityValue})`
            : `rgba(var(--header-text-gradient-from))`;
        },
        'header-text-gradient-to': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-text-gradient-to), ${opacityValue})`
            : `rgba(var(--header-text-gradient-to))`;
        },
        'header-search': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search), ${opacityValue})`
            : `rgba(var(--header-search))`;
        },
        'header-search-focus': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus), ${opacityValue})`
            : `rgba(var(--header-search-focus))`;
        },
        'header-search-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-text), ${opacityValue})`
            : `rgba(var(--header-search-text))`;
        },
        'header-search-border': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-border), ${opacityValue})`
            : `rgba(var(--header-search-border))`;
        },
        'header-search-focus-border': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus-border), ${opacityValue})`
            : `rgba(var(--header-search-focus-border))`;
        },
        'header-search-button': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-button), ${opacityValue})`
            : `rgba(var(--header-search-button))`;
        },
        'header-search-button-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-button-hover), ${opacityValue})`
            : `rgba(var(--header-search-button-hover))`;
        },
        'header-search-button-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-button-active), ${opacityValue})`
            : `rgba(var(--header-search-button-active))`;
        },
        'header-search-button-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-button-text), ${opacityValue})`
            : `rgba(var(--header-search-button-text))`;
        },
        'header-search-focus-button': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus-button), ${opacityValue})`
            : `rgba(var(--header-search-focus-button))`;
        },
        'header-search-focus-button-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus-button-hover), ${opacityValue})`
            : `rgba(var(--header-search-focus-button-hover))`;
        },
        'header-search-focus-button-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus-button-active), ${opacityValue})`
            : `rgba(var(--header-search-focus-button-active))`;
        },
        'header-search-focus-button-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-search-focus-button-text), ${opacityValue})`
            : `rgba(var(--header-search-focus-button-text))`;
        },
        'header-burger': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger), ${opacityValue})`
            : `rgba(var(--header-burger))`;
        },
        'header-burger-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger-hover), ${opacityValue})`
            : `rgba(var(--header-burger-hover))`;
        },
        'header-burger-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger-active), ${opacityValue})`
            : `rgba(var(--header-burger-active))`;
        },
        'header-burger-background': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger-background), ${opacityValue})`
            : `rgba(var(--header-burger-background))`;
        },
        'header-burger-background-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger-background-hover), ${opacityValue})`
            : `rgba(var(--header-burger-background-hover))`;
        },
        'header-burger-background-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-burger-background-active), ${opacityValue})`
            : `rgba(var(--header-burger-background-active))`;
        },
        'header-button': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-button), ${opacityValue})`
            : `rgba(var(--header-button))`;
        },
        'header-button-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-button-hover), ${opacityValue})`
            : `rgba(var(--header-button-hover))`;
        },
        'header-button-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-button-active), ${opacityValue})`
            : `rgba(var(--header-button-active))`;
        },
        'header-button-text': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--header-button-text), ${opacityValue})`
            : `rgba(var(--header-button-text))`;
        },

        // Menu
        'menu': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--menu), ${opacityValue})`
            : `rgba(var(--menu))`;
        },

        // System colors
        'link': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--link), ${opacityValue})`
            : `rgba(var(--link))`;
        },
        'warning': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--warning), ${opacityValue})`
            : `rgba(var(--warning))`;
        },
        'warning-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--warning-hover), ${opacityValue})`
            : `rgba(var(--warning-hover))`;
        },
        'warning-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--warning-active), ${opacityValue})`
            : `rgba(var(--warning-active))`;
        },
        'success': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--success), ${opacityValue})`
            : `rgba(var(--success))`;
        },
        'success-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--success-hover), ${opacityValue})`
            : `rgba(var(--success-hover))`;
        },
        'success-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--success-active), ${opacityValue})`
            : `rgba(var(--success-active))`;
        },
        'danger': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--danger), ${opacityValue})`
            : `rgba(var(--danger))`;
        },
        'danger-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--danger-hover), ${opacityValue})`
            : `rgba(var(--danger-hover))`;
        },
        'danger-active': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--danger-active), ${opacityValue})`
            : `rgba(var(--danger-active))`;
        },

        // Components
        'input': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--input), ${opacityValue})`
            : `rgba(var(--input))`;
        },
        'input-hover': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--input-focus), ${opacityValue})`
            : `rgba(var(--input-hover))`;
        },
        'input-focus': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--input-focus), ${opacityValue})`
            : `rgba(var(--input-focus))`;
        },
        'border': ({ opacityValue }) => {
          return opacityValue !== undefined
            ? `rgba(var(--border), ${opacityValue})`
            : `rgba(var(--border))`;
        },
      },
      zIndex: {
        0: '0',
        5: '5',
        10: '10',
        15: '15',
        20: '20',
        25: '25',
        30: '30',
        35: '35',
        40: '40',
        45: '45',
        50: '50',
        55: '55',
        60: '60',
        65: '65',
        70: '70',
        75: '75',
        80: '80',
        85: '85',
        90: '90',
        95: '95',
        100: '100',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
      },
      fontFamily: {
        'nunito-sans': 'Nunito Sans',
        'fira': 'Fira Code',
        'dancing-script': 'dancing-script',
      },

      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      minWidth: {
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.62rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '0.1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      maxWidth: {
        '0': '0rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.62rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '0.1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        'xs': '24rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        '8xl': '1600px',
        'full': '100%',
      },
    },
  },
  plugins: [],
};
