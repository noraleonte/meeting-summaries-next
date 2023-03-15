import type { AppProps } from 'next/app'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { SortingOptionProvider } from '~/context/SortingOptionProvider'

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
    <SortingOptionProvider>
      <Component {...pageProps} />
    </SortingOptionProvider>
  </ChakraProvider>
)
export default App
