import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import What from './What/What';
import Mission from './Mission/Mission';
import XPercent from './XPercent/XPercent';
import Technology from './Technology/Technology';
import Recruitment from './Recruitment/Recruitment';
import News from './News/News';
import Partnership from './Partnership/Partnership';
import Footer from './Footer/Footer';
import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-177879135-2')
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const mainRef = useRef(null);
  const whatRef = useRef(null);
  const missionRef = useRef(null);
  const xpercentRef = useRef(null);
  const technologyRef = useRef(null);
  const newsRef = useRef(null);

  useEffect(() => {
    document.title = "DeepTrade | Innovate AI Trading"
  }, [])

  return (
    <>
      <Header 
        whatRef={whatRef} 
        missionRef={missionRef} 
        xpercentRef={xpercentRef} 
        technologyRef={technologyRef} 
        newsRef={newsRef} 
      />
      <Main refProp={mainRef} />
      <What refProp={whatRef} />
      <Mission refProp={missionRef} />
      <XPercent refProp={xpercentRef} />
      <Technology refProp={technologyRef} />
      <Recruitment />
      <News refProp={newsRef} />
      <Partnership mainRef={mainRef} />
      <Footer />
    </>
  );
}

export default App;
