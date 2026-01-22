export const config = {
  fonts: {
    google: {
      families: {
        Inter: {
          wght: ['400', '700'],
        },
      },
      display: 'swap',
    },
  },
  cssVariables: {
    light: {
      '--font-body': "'Inter', sans-serif",
      '--font-headline': "'Inter', sans-serif",
      '--background': '40 33% 97%', // Almost white with a hint of yellow
      '--foreground': '20 14% 8%', // Dark grey
      '--card': '0 0% 100%',
      '--card-foreground': '20 14% 8%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '20 14% 8%',
      '--primary': '27 87% 55%', // Vibrant Orange
      '--primary-foreground': '0 0% 100%',
      '--secondary': '145 63% 30%', // Dark Green
      '--secondary-foreground': '0 0% 98%',
      '--muted': '40 20% 94%',
      '--muted-foreground': '20 10% 45%',
      '--accent': '40 25% 90%',
      '--accent-foreground': '20 15% 20%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '40 10% 88%',
      '--input': '40 10% 88%',
      '--ring': '27 87% 60%',
      '--chart-1': '27 87% 55%',
      '--chart-2': '145 63% 30%',
      '--chart-3': '197 37% 24%',
      '--chart-4': '43 74% 66%',
      '--chart-5': '27 87% 67%',
      '--radius': '0.75rem',
    },
    dark: {
      '--background': '20 14% 4%',
      '--foreground': '0 0% 98%',
      '--card': '20 14% 8%',
      '--card-foreground': '0 0% 98%',
      '--popover': '20 14% 4%',
      '--popover-foreground': '0 0% 98%',
      '--primary': '27 87% 55%', // Vibrant Orange
      '--primary-foreground': '0 0% 100%',
      '--secondary': '145 63% 25%', // Darker Green
      '--secondary-foreground': '0 0% 98%',
      '--muted': '0 0% 15%',
      '--muted-foreground': '0 0% 63.9%',
      '--accent': '0 0% 20%',
      '--accent-foreground': '0 0% 98%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '0 0% 20%',
      '--input': '0 0% 20%',
      '--ring': '27 87% 60%',
    },
  },
};
