import { Footer } from '../components/footer';
import { Header } from '../components/Header';
import './globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className="containerAll">
      <div className="pageContainer">
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
