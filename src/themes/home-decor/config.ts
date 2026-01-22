export const config = {
  fonts: {
    google: {
      families: {
        'Playfair Display': {
          wght: '700',
        },
        Montserrat: {
          wght: ['400', '600'],
        },
      },
      display: 'swap',
    },
  },
  cssVariables: {
    light: {
      '--font-body': "'Montserrat', sans-serif",
      '--font-headline': "'Playfair Display', serif",
      '--background': '47 20% 97%', // Off-white/light cream
      '--foreground': '215 15% 20%', // Dark slate blue
      '--card': '0 0% 100%',
      '--card-foreground': '215 15% 20%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '215 15% 20%',
      '--primary': '210 25% 40%', // Muted navy blue
      '--primary-foreground': '0 0% 100%',
      '--secondary': '45 30% 94%', // Light beige
      '--secondary-foreground': '215 15% 25%',
      '--muted': '45 30% 96%',
      '--muted-foreground': '215 10% 45%',
      '--accent': '40 50% 88%', // Soft gold/tan
      '--accent-foreground': '215 20% 25%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '45 20% 90%',
      '--input': '45 20% 90%',
      '--ring': '210 25% 45%',
      '--radius': '0.3rem',
    },
    dark: {
      '--background': '215 20% 12%', // Dark slate
      '--foreground': '47 20% 95%', // Light cream
      '--card': '215 20% 16%',
      '--card-foreground': '47 20% 95%',
      '--popover': '215 20% 12%',
      '--popover-foreground': '47 20% 95%',
      '--primary': '40 50% 80%', // Soft gold
      '--primary-foreground': '215 25% 10%',
      '--secondary': '215 15% 20%',
      '--secondary-foreground': '45 30% 90%',
      '--muted': '215 15% 24%',
      '--muted-foreground': '45 20% 70%',
      '--accent': '215 15% 26%',
      '--accent-foreground': '45 30% 95%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '215 15% 30%',
      '--input': '215 15% 30%',
      '--ring': '40 50% 85%',
    },
  },
};
