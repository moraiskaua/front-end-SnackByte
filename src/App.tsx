import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Order from './components/Orders';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <GlobalStyles />
      <Toaster position="bottom-center" />
      <Header />
      <Order />
    </>
  );
}

export default App;
