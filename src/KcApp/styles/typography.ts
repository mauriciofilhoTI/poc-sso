import { theme } from "@king-ds/react/src/styles/index";

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

export const typography = {
  fontFamily: `${theme.fonts.base}`,
  fontWeightRegular: `${theme.fontWeights.regular}`,
  fontWeightMedium: `${theme.fontWeights.medium}`,
  fontWeightBold: `${theme.fontWeights.bold}`,
  h1: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
  },
  subtitle1: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  subtitle2: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  body1: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  body2: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  caption: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 1.5,
    fontSize: pxToRem(12)
  },
  overline: {
    fontWeight: `${theme.fontWeights.bold}`,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: `${theme.fontWeights.regular}`,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  }
} as const;