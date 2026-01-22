export const config = {
  fonts: {
    google: {
      families: {
        'Cormorant Garamond': {
          wght: ['600', '700'],
        },
        Montserrat: {
          wght: ['400', '500'],
        },
      },
      display: 'swap',
    },
  },
  cssVariables: {
    light: {
      '--font-body': "'Montserrat', sans-serif",
      '--font-headline': "'Cormorant Garamond', serif",
      '--background': '25 50% 98%', // Very light, warm off-white
      '--foreground': '20 15% 25%', // Dark, soft black
      '--card': '0 0% 100%',
      '--card-foreground': '20 15% 25%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '20 15% 25%',
      '--primary': '345 40% 55%', // Dusty rose
      '--primary-foreground': '0 0% 100%',
      '--secondary': '25 30% 95%', // Very light nude/beige
      '--secondary-foreground': '20 15% 25%',
      '--muted': '25 30% 97%',
      '--muted-foreground': '20 10% 55%',
      '--accent': '30 40% 90%', // Soft gold/peach accent
      '--accent-foreground': '20 15% 20%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '25 30% 90%',
      '--input': '25 30% 90%',
      '--ring': '345 40% 60%',
      '--radius': '0.5rem',
    },
    dark: {
      '--background': '20 15% 12%', // Very dark, soft black
      '--foreground': '25 50% 96%', // Light off-white
      '--card': '20 15% 16%',
      '--card-foreground': '25 50% 96%',
      '--popover': '20 15% 12%',
      '--popover-foreground': '25 50% 96%',
      '--primary': '345 50% 70%', // Brighter dusty rose
      '--primary-foreground': '20 15% 10%',
      '--secondary': '20 15% 18%',
      '--secondary-foreground': '25 30% 90%',
      '--muted': '20 15% 22%',
      '--muted-foreground': '25 20% 70%',
      '--accent': '30 40% 30%', // Muted gold/peach accent
      '--accent-foreground': '30 40% 95%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '20 15% 25%',
      '--input': '20 15% 25%',
      '--ring': '345 50% 75%',
    },
  },
};
