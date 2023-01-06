// importing tailwindcss classes
import "../../styles/globals.css";

// main parent component. initializes all pages
const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
}

export default App;
