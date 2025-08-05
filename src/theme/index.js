import { createTheme } from '@mui/material/styles';

// Professional e-commerce color palette inspired by Temu
const brandColors = {
  primary: {
    main: '#FF6B35', // Vibrant orange - main brand color
    light: '#FF8F66',
    dark: '#CC5529',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#4A90E2', // Professional blue
    light: '#7BB3F0', 
    dark: '#357ABD',
    contrastText: '#FFFFFF'
  },
  success: {
    main: '#00B894', // Modern green
    light: '#55C3A7',
    dark: '#00A085',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#FDCB6E', // Warm yellow
    light: '#FED89B',
    dark: '#E6B800',
    contrastText: '#2D3436'
  },
  error: {
    main: '#E17055', // Soft red
    light: '#E8997C',
    dark: '#D63031',
    contrastText: '#FFFFFF'
  },
  info: {
    main: '#74B9FF', // Light blue
    light: '#A4CDFF',
    dark: '#0984E3',
    contrastText: '#FFFFFF'
  }
};

// Enhanced breakpoints for better responsive control
const responsiveBreakpoints = {
  values: {
    xs: 0,      // Mobile portrait
    sm: 600,    // Mobile landscape / small tablet
    md: 900,    // Tablet
    lg: 1200,   // Desktop
    xl: 1536,   // Large desktop
  }
};

// Professional light theme
const createLightTheme = () => createTheme({
  breakpoints: responsiveBreakpoints,
  palette: {
    mode: 'light',
    ...brandColors,
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      secondary: '#F1F3F4'
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
      disabled: '#ADB5BD'
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    grey: {
      50: '#F8F9FA',
      100: '#F1F3F4',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529'
    }
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
      fontWeight: 500,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em'
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.95rem',
      letterSpacing: '0.02em'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.03em'
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 6px 6px rgba(0, 0, 0, 0.10)',
    '0px 14px 28px rgba(0, 0, 0, 0.15), 0px 10px 10px rgba(0, 0, 0, 0.10)',
    '0px 19px 38px rgba(0, 0, 0, 0.15), 0px 15px 12px rgba(0, 0, 0, 0.10)',
    '0px 24px 48px rgba(0, 0, 0, 0.15), 0px 20px 14px rgba(0, 0, 0, 0.10)',
    '0px 30px 60px rgba(0, 0, 0, 0.15), 0px 24px 16px rgba(0, 0, 0, 0.10)',
    '0px 36px 72px rgba(0, 0, 0, 0.15), 0px 28px 18px rgba(0, 0, 0, 0.10)',
    '0px 42px 84px rgba(0, 0, 0, 0.15), 0px 32px 20px rgba(0, 0, 0, 0.10)',
    '0px 48px 96px rgba(0, 0, 0, 0.15), 0px 36px 22px rgba(0, 0, 0, 0.10)',
    ...Array(14).fill('0px 48px 96px rgba(0, 0, 0, 0.15), 0px 36px 22px rgba(0, 0, 0, 0.10)')
  ]
});

// Professional dark theme
const createDarkTheme = () => createTheme({
  breakpoints: responsiveBreakpoints,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF7849', // Slightly brighter for dark mode
      light: '#FF9F7A',
      dark: '#E55529',
      contrastText: '#FFFFFF'
    },
    secondary: brandColors.secondary,
    success: brandColors.success,
    warning: brandColors.warning,
    error: brandColors.error,
    info: brandColors.info,
    background: {
      default: '#0D1117',
      paper: '#161B22',
      secondary: '#21262D'
    },
    text: {
      primary: '#F0F6FC',
      secondary: '#8B949E',
      disabled: '#484F58'
    },
    divider: 'rgba(240, 246, 252, 0.1)',
    grey: {
      50: '#F0F6FC',
      100: '#C9D1D9',
      200: '#B1BAC4',
      300: '#8B949E',
      400: '#6E7681',
      500: '#484F58',
      600: '#30363D',
      700: '#21262D',
      800: '#161B22',
      900: '#0D1117'
    }
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.2)',
    '0px 4px 8px rgba(0,0,0,0.25)',
    '0px 8px 16px rgba(0,0,0,0.25)',
    '0px 12px 24px rgba(0,0,0,0.25)',
    '0px 16px 32px rgba(0,0,0,0.3)',
    '0px 20px 40px rgba(0,0,0,0.3)',
    '0px 24px 48px rgba(0,0,0,0.3)',
    '0px 28px 56px rgba(0,0,0,0.35)',
    '0px 32px 64px rgba(0,0,0,0.4)',
    ...Array(15).fill('0px 32px 64px rgba(0,0,0,0.4)')
  ]
});

// Enhanced component overrides for professional look
const getComponentOverrides = (palette) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: '12px 32px',
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0px 8px 25px rgba(0,0,0,0.15)'
        }
      },
      contained: {
        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
        '&:hover': {
          background: `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 100%)`,
          boxShadow: '0px 12px 35px rgba(0,0,0,0.2)'
        }
      },
      outlined: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
          backgroundColor: `${palette.primary.main}08`
        }
      },
      sizeSmall: {
        padding: '8px 20px',
        fontSize: '0.875rem'
      },
      sizeLarge: {
        padding: '16px 40px',
        fontSize: '1.125rem'
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        border: `1px solid ${palette.divider}`,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.15)'
        }
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '0.8rem',
        height: 32
      },
      colorPrimary: {
        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
        color: palette.primary.contrastText
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 6,
          fontSize: '1rem',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.main,
            borderWidth: '2px'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.main,
            borderWidth: '2px'
          }
        }
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${palette.divider}`,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)'
      }
    }
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: 'none',
        boxShadow: '4px 0px 20px rgba(0,0,0,0.08)',
        backgroundImage: 'none'
      }
    }
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        margin: '4px 8px',
        padding: '12px 16px',
        '&:hover': {
          backgroundColor: `${palette.primary.main}15`,
          transform: 'translateX(4px)'
        },
        '&.Mui-selected': {
          backgroundColor: palette.primary.main,
          color: palette.primary.contrastText,
          '&:hover': {
            backgroundColor: palette.primary.dark
          }
        }
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        backgroundImage: 'none'
      },
      elevation1: {
        boxShadow: '0px 4px 20px rgba(0,0,0,0.08)'
      },
      elevation2: {
        boxShadow: '0px 8px 30px rgba(0,0,0,0.12)'
      },
      elevation3: {
        boxShadow: '0px 12px 40px rgba(0,0,0,0.15)'
      }
    }
  }
});

// Create final themes with component overrides
const lightTheme = (() => {
  const baseTheme = createLightTheme();
  return {
    ...baseTheme,
    components: getComponentOverrides(baseTheme.palette)
  };
})();

const darkTheme = (() => {
  const baseTheme = createDarkTheme();
  const overrides = getComponentOverrides(baseTheme.palette);
  return {
    ...baseTheme,
    components: {
      ...overrides,
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${baseTheme.palette.divider}`,
            boxShadow: '0px 4px 20px rgba(0,0,0,0.25)'
          }
        }
      }
    }
  };
})();

export { lightTheme, darkTheme, brandColors };