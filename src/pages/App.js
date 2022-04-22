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
import React, { useRef, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import Cookies from 'universal-cookie';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-177879135-2')
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const mainRef = useRef(null);
  const whatRef = useRef(null);
  const missionRef = useRef(null);
  const xpercentRef = useRef(null);
  const technologyRef = useRef(null);
  const newsRef = useRef(null);
  
  const cookies = new Cookies();

  const width = window.innerWidth;

  useEffect(() => {
    document.title = "DeepTrade | Innovate AI Trading";
    const modalCookie = cookies.get('showModal');
    const cookieDate = new Date(modalCookie);
    const timeNow = new Date();
    if(!modalCookie)
    {
      //setModalVisible(true);
    }
    else
    {
      getDateDifference(cookieDate, timeNow);
    }
  }, [])

  const closeModal = () => {
    setModalVisible(false);
  }

  const setModalCookie = () => {
    cookies.set('showModal', new Date(), { path: '/'});
    setModalVisible(false);
  }

  const getDateDifference = (date1, date2) => {
    const diffInDays = Math.abs(date2 - date1);
    var dateDiff = diffInDays / (1000 * 60 * 60 * 24);
    if(dateDiff > 1)
    {
      //setModalVisible(true);
    }
  }

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
      <Modal 
        visible={modalVisible} 
        footer={null}
        bodyStyle={{
          padding: 0,
        }}
        onCancel={closeModal}
        closeIcon={<CloseOutlined style={{color: 'white', fontSize:20}} />}
        width={400}
        >
        <div>
          {
            width > 800 ?
            <img src="../../assets/modal/newcomer_event_mobile.png" style={{
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              cursor: 'pointer'
            }} 
            alt="Modal"
            onClick={() => {window.open('https://xpct.net', '_blank')}}
            /> :
            <img src="../../assets/modal/newcomer_event_desktop.png" style={{
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              cursor: 'pointer'
            }} 
            alt="Modal"
            onClick={() => {window.open('https://xpct.net', '_blank')}}
            />
          }
          <div style={{
            backgroundColor: width > 800 ? '#392a16' : '#006e3f',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}>
            <div style={{
              backgroundColor: 'black',
              color: 'white',
              width: 120,
              padding: 10,
              marginLeft: 'auto',
              textAlign: 'center',
              borderRadius: 20,
              marginRight: 20,
              cursor: 'pointer'
            }}
            onClick={setModalCookie}
            >
              하루 보지 않기
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
