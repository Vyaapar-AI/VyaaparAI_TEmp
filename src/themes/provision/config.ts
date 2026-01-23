export const config = {
  fonts: {
    google: {
      families: {
        Merriweather: {
          wght: '700',
        },
        Lato: {
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
      '--font-body': "'Lato', sans-serif",
      '--font-headline': "'Merriweather', serif",
      '--font-price': "'Manrope', sans-serif",
      '--background': '35 40% 96%', // Light beige
      '--foreground': '20 20% 15%', // Dark charcoal
      '--card': '0 0% 100%',
      '--card-foreground': '20 20% 15%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '20 20% 15%',
      '--primary': '160 44% 39%', // Muted green
      '--primary-foreground': '0 0% 100%',
      '--secondary': '35 25% 90%', // Lighter beige
      '--secondary-foreground': '20 15% 25%',
      '--muted': '35 25% 92%',
      '--muted-foreground': '20 10% 45%',
      '--accent': '35 30% 88%',
      '--accent-foreground': '20 15% 20%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '35 20% 85%',
      '--input': '35 20% 85%',
      '--ring': '160 44% 45%',
      '--radius': '0.5rem',
    },
    dark: {
      '--font-price': "'Manrope', sans-serif",
      '--background': '20 14% 8%', // Dark brown/charcoal
      '--foreground': '35 40% 94%', // Off-white
      '--card': '20 14% 12%',
      '--card-foreground': '35 40% 94%',
      '--popover': '20 14% 8%',
      '--popover-foreground': '35 40% 94%',
      '--primary': '160 44% 45%', // Muted green
      '--primary-foreground': '0 0% 100%',
      '--secondary': '20 10% 18%',
      '--secondary-foreground': '35 25% 85%',
      '--muted': '20 10% 22%',
      '--muted-foreground': '35 15% 65%',
      '--accent': '20 10% 25%',
      '--accent-foreground': '35 25% 95%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '20 10% 28%',
      '--input': '20 10% 28%',
      '--ring': '160 44% 50%',
    },
  },
};
