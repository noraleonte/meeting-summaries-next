import type { AppProps } from 'next/app'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { SortingOptionProvider } from '~/context/SortingOptionProvider'
import { ActiveFilterProvider } from '~/context/ActiveFilterProvider'
import { MeetingActionsProvider } from '~/context/MeetingActionsProvider'
import { InvalidContextProvider } from '~/context/InvalidContextProvider'

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
      <ActiveFilterProvider>
        <MeetingActionsProvider>
          <InvalidContextProvider>
            <Component {...pageProps} />
          </InvalidContextProvider>
        </MeetingActionsProvider>
      </ActiveFilterProvider>
    </SortingOptionProvider>
  </ChakraProvider>
)
export default App
