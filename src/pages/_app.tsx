import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#777777',
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
