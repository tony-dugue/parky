import colors from 'tailwindcss/colors'

const brandHue = 52

const primaryPallete = {
  DEFAULT: `hsl(${brandHue}, 100%, 50%)`, // #ffdd00
  25: `hsl(${brandHue}, 100%, 98%)`, // #fffdf0
  50: `hsl(${brandHue}, 100%, 92%)`, // #fff6cd
  100: `hsl(${brandHue}, 100%, 84%)`, // #ffec99
  200: `hsl(${brandHue}, 100%, 75%)`, // #ffe066
  300: `hsl(${brandHue}, 100%, 66%)`, // #ffd633
  400: `hsl(${brandHue}, 100%, 58%)`, // #ffcc1a
  500: `hsl(${brandHue}, 100%, 50%)`, // #ffdd00
  600: `hsl(${brandHue}, 100%, 45%)`, // #e6c200
  700: `hsl(${brandHue}, 100%, 30%)`, // #998500
  800: `hsl(${brandHue}, 100%, 20%)`, // #665900
  900: `hsl(${brandHue}, 100%, 06%)`, // #191400
}

const grayPallete = {
  DEFAULT: `hsl(${brandHue}, 2%, 32%)`, // #868479
  25: `hsl(${brandHue}, 2%, 94%)`, // #f0efed
  50: `hsl(${brandHue}, 2%, 90%)`, // #e6e5e2
  100: `hsl(${brandHue}, 2%, 80%)`, // #cdcbc6
  200: `hsl(${brandHue}, 2%, 70%)`, // #b4b1ab
  300: `hsl(${brandHue}, 2%, 60%)`, // #9b9990
  400: `hsl(${brandHue}, 2%, 50%)`, // #827f75
  500: `hsl(${brandHue}, 2%, 32%)`, // #54524a
  600: `hsl(${brandHue}, 2%, 24%)`, // #3c3a33
  700: `hsl(${brandHue}, 2%, 16%)`, // #272622
  800: `hsl(${brandHue}, 2%, 08%)`, // #141411
  900: `hsl(${brandHue}, 2%, 04%)`, // #0a0a08
}

const greenPallete = {
  DEFAULT: 'hsl(116, 100%, 27%)', // #1f8a36
  25: 'hsl(116, 100%, 98%)', // #f2fdf5
  50: 'hsl(116, 100%, 90%)', // #d6f8e0
  100: 'hsl(116, 100%, 78%)', // #a7edbb
  200: 'hsl(116, 100%, 66%)', // #75e194
  300: 'hsl(116, 100%, 54%)', // #43d56c
  400: 'hsl(116, 100%, 40%)', // #18b14a
  500: 'hsl(116, 100%, 27%)', // #1f8a36
  600: 'hsl(116, 100%, 21%)', // #186c2b
  700: 'hsl(116, 100%, 14%)', // #10491d
  800: 'hsl(116, 100%, 08%)', // #092c12
  900: 'hsl(116, 100%, 04%)', // #041509
}

const redPallete = {
  DEFAULT: 'hsl(10, 94%, 45%)', // #e34928
  25: 'hsl(10, 94%, 98%)', // #fef5f3
  50: 'hsl(10, 94%, 92%)', // #fce3dc
  100: 'hsl(10, 94%, 84%)', // #facac0
  200: 'hsl(10, 94%, 74%)', // #f8a28f
  300: 'hsl(10, 94%, 64%)', // #f4795e
  400: 'hsl(10, 94%, 54%)', // #f15139
  500: 'hsl(10, 94%, 45%)', // #e34928
  600: 'hsl(10, 94%, 35%)', // #b5371f
  700: 'hsl(10, 94%, 22%)', // #771f13
  800: 'hsl(10, 94%, 10%)', // #3a0d08
  900: 'hsl(10, 94%, 04%)', // #180502
}

export const animationConfig = {
  'spin-reverse': 'reverse-spin 1s linear infinite',
  'spin-slow': 'spin 3s linear infinite',
  'spin-12': 'spin 12s linear infinite',
  'spin-24': 'spin 24s linear infinite',
  'spin-30': 'spin 30s linear infinite',
  wiggle: 'wiggle 1s ease-in-out infinite',
  'wiggle-fade': 'wiggle-fade 1s ease-in-out infinite',
  slide: 'slide 1s ease-in-out infinite',
  'slide-left': 'slide-left 1s ease-in-out infinite',
  'park-car': 'park-car 5s ease-in-out infinite',
  'slide-right': 'slide-right 1s linear infinite',
  blink: 'blink 2s linear infinite',
  breathe: 'breathe 6s ease-in-out infinite',
  'move-right-12': 'move-right 12s ease-in-out infinite',
  'move-right-24': 'move-right 24s ease-in-out infinite',
  'move-right-36': 'move-right 36s ease-in-out infinite',
  'move-right-48': 'move-right 48s ease-in-out infinite',
  'move-right-60': 'move-right 60s ease-in-out infinite',
}
export const keyframesConfig = {
  'reverse-spin': {
    from: {
      transform: 'rotate(360deg)',
    },
  },
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },
  'wiggle-fade': {
    '0%, 100%': { transform: 'rotate(-3deg)', opacity: '0.4' },
    '50%': { transform: 'rotate(3deg)', opacity: '0.9' },
  },
  blink: {
    '0%, 49%': { opacity: '1' },
    '50%, 100%': { opacity: '0' },
  },

  slide: {
    '0%': { opacity: '1' },
    '100%': { transform: 'translateX(25%)' },
  },
  'move-right': {
    '0%': {
      left: '20%',
      opacity: '0',
    },
    '10%, 90%': {
      opacity: '1',
    },
    '100%': {
      left: '80%',
      opacity: '0',
    },
  },
  'park-car': {
    '0%': {
      transform: ' translateX(-150%) translateY(150%) rotate(90deg)',
    },
    '30%': {
      transform: ' translateY(-10%) rotate(0deg)',
    },
    '40%, 60%': {
      transform: ' translateX(0%) rotate(0deg)',
    },
    '100%': {
      transform: ' translateX(100%) translateY(150%)  rotate(-90deg)',
    },
  },
  'slide-right': {
    '40%,60%': {
      opacity: '1',
    },
    '46%': { transform: 'translateX(25%)', opacity: '0' },
    '54%': {
      transform: 'translateX(-25%)',
      opacity: '0',
    },
  },
  'slide-left': {
    '40%,60%': {
      opacity: '1',
    },
    '46%': { transform: 'translateX(-25%)', opacity: '0' },
    '54%': {
      transform: 'translateX(25%)',
      opacity: '0',
    },
  },
  breathe: {
    '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
    '60%': {
      transform: 'scale(1.5)',
      opacity: '1',
    },
  },
}

const template = {
  DEFAULT: '40%',
  25: '98%',
  50: '95%',
  100: '92%',
  200: '86%',
  300: '78%',
  400: '66%',
  500: '50%',
  600: '36%',
  700: '24%',
  800: '12%',
  900: '04%',
}

export const colorGen = ({ saturation = '100%', hue, lightness = template }) =>
  Object.entries(lightness)
    .map(([key, item]) => ({
      [key]: `hsl(${hue}, ${saturation}, ${item})`,
    }))
    .reduce((obj, item) => Object.assign(obj, item), {})

export const spacingConfig = {
  112: '28rem',
  128: '32rem',
  144: '36rem',
  160: '40rem',
  192: '48rem',
}

export const colorsConfig = {
  transparent: colors.transparent,
  black: colors.black,
  white: colors.white,
  primary: primaryPallete,
  red: redPallete,
  green: greenPallete,
  gray: grayPallete,
  accent: colors.black,
}
