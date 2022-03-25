import Renderer from "../components/Renderer";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <Renderer>
        <Component {...pageProps} />
      </Renderer>
  )
}

export default MyApp
