import type { AppProps } from 'next/app'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.50',
      },
    },
  },
  fonts: {
    body: `'Inter', sans-serif;`,
    heading: `'Inter', sans-serif;`,
  },
})

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider {...{ theme }}>
    <Component {...pageProps} />
  </ChakraProvider>
)
export default App
