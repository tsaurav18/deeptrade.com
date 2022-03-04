import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import What from './What/What';
import Mission from './Mission/Mission';
import XPercent from './XPercent/XPercent';
import Technology from './Technology/Technology';
import Recruitment from './Recruitment/Recruitment';
import News from './News/News';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="main_container">
      <Header />
      <Main />
      <What />
      <Mission />
      <XPercent />
      <Technology />
      <Recruitment />
      <News />
    </div>
  );
}

export default App;
