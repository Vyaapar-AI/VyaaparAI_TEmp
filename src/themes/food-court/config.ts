export const config = {
  fonts: {
    google: {
      families: {
        Oswald: {
          wght: '700',
        },
        Roboto: {
          wght: ['400', '700'],
        },
        Manrope: {
          wght: '800',
        },
      },
      display: 'swap',
    },
  },
  cssVariables: {
    light: {
      '--font-body': "'Roboto', sans-serif",
      '--font-headline': "'Oswald', sans-serif",
      '--font-price': "'Manrope', sans-serif",
      '--background': '0 0% 98%',
      '--foreground': '0 0% 10%',
      '--card': '0 0% 100%',
      '--card-foreground': '0 0% 10%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '0 0% 10%',
      '--primary': '0 72% 51%', // Bold Red
      '--primary-foreground': '0 0% 100%',
      '--secondary': '45 100% 95%', // Light Yellow
      '--secondary-foreground': '45 90% 25%',
      '--muted': '0 0% 95%',
      '--muted-foreground': '0 0% 45%',
      '--accent': '0 0% 90%',
      '--accent-foreground': '0 0% 20%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '0 0% 90%',
      '--input': '0 0% 90%',
      '--ring': '0 72% 55%',
      '--radius': '0.5rem',
    },
    dark: {
      '--font-price': "'Manrope', sans-serif",
      '--background': '0 0% 8%',
      '--foreground': '0 0% 98%',
      '--card': '0 0% 12%',
      '--card-foreground': '0 0% 98%',
      '--popover': '0 0% 8%',
      '--popover-foreground': '0 0% 98%',
      '--primary': '0 65% 55%', // Slightly less intense red for dark mode
      '--primary-foreground': '0 0% 100%',
      '--secondary': '0 0% 15%',
      '--secondary-foreground': '0 0% 85%',
      '--muted': '0 0% 20%',
      '--muted-foreground': '0 0% 65%',
      '--accent': '0 0% 22%',
      '--accent-foreground': '0 0% 95%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '0 0% 25%',
      '--input': '0 0% 25%',
      '--ring': '0 65% 60%',
    },
  },
};
