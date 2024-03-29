import React, { ReactNode } from 'react';

// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

interface ThemeProps {
  children: ReactNode;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1fab89',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#9df3c4',
      main: '#62d2a2',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function MaterialUITheme(props: ThemeProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default MaterialUITheme;
