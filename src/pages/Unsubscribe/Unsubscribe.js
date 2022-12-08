import React, { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


export default function Unsubscribe() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.title = "DeepTrade_newsletter";
        var email = searchParams.get('email');
        setEmail(email);
    }, [])

    const unsubscribe = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        };
        fetch('https://xpct.net/api/unsubscribe_email/', requestOptions)
            .then(response => response.json())
            .then(data => setSuccess(true));
    }


    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="col-2 logo">
                    <img 
                        src="assets/deeptrade_logo.png" 
                        alt = "logo" 
                        style={{
                            marginLeft: '30px', 
                            cursor: 'pointer', 
                            width: '300px'}} 
                        onClick={() => {
                            window.open('https://deeptrade.co/', '_self');
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    marginLeft:30,
                    marginTop: 10,
                    fontSize: 15,
                    textAlign: 'left',
                    fontFamily: 'Verdana, sans-serif'
                    
                }}
            >
                <span style={{fontWeight: 'normal'}}>Email : </span>{email}
            </div>
            <div
                style={{
                    fontFamily: 'Verdana, sans-serif',
                    marginTop:30,
                    marginRight:20,
                    marginBottom:5,
                    marginLeft:30,
                    fontSize: 15,
                    textAlign: 'left',
                    marginTop :30
                }}
            >
                Do you really want to unsubscribe?
            </div>


    {
        !success ?
            <div
                
                style={{
                    padding: '0px 0',
                    border: '1px solid gray',
                    fontFamily: 'Verdana, sans-serif',
                    color: 'black',
                    borderRadius: 5,
                    marginLeft:30,
                    marginTop: 0,
                    marginRight:0,
                    marginbBottom:30,
                    display: 'inline-block',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: '300',
                    textAlign: 'center',
                    width:400,
                    backgroundColor:'#f2f2f2'
                }} 

                onClick={() => {
                    unsubscribe();
                }}
            >
                Yes -  Remove me from all future mailings.
            </div>
       : 
        <div 
        style={{
            
            fontSize: 15,
            fontFamily: 'Verdana, sans-serif',
            textAlign: 'left',
            marginLeft:30,
            marginTop: 0,
            marginRight:0,
            marginBottom:10,
            fontWeight:800
        }}
        >
           You have been unsubscribed from our newsletter service!
         </div>                           
}

                <div
                style={{
                    marginTop:'3px',
                    marginLeft:'30px',
                    fontSize:12,
                    fontFamily: 'Verdana, sans-serif'
                }}
                >
                </div>                          
            
        </>
    )
}