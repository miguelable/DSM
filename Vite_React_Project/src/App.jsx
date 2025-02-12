import { useState } from 'react'
import './App.css'
import Header from './components/header.jsx';
import Main from './components/main.jsx';
import Footer from './components/footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Main count={count} setCount={setCount} />
      <Footer />
    </>
  );
}

export default App;
