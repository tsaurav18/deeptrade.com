import React, { useState } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRadio, MDBRow, MDBCheckbox } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircleOutlined, MinusCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function Survey() {

    const [submitted, setSubmitted] = useState(false);

    const [question1, setQuestion1] = useState(0);
    const [question2, setQuestion2] = useState(0);
    const [question3, setQuestion3] = useState(0);
    const [question4, setQuestion4] = useState(0);
    const [question5_1, setQuestion5_1] = useState(false);
    const [question5_2, setQuestion5_2] = useState(false);
    const [question5_3, setQuestion5_3] = useState(false);
    const [question5_4, setQuestion5_4] = useState(false);
    const [question5_5, setQuestion5_5] = useState(false);
    const [question5_6, setQuestion5_6] = useState(false);
    const [question5_7, setQuestion5_7] = useState(false);
    const [question5_8, setQuestion5_8] = useState(false);
    const [question5_9, setQuestion5_9] = useState(false);
    const [question5_10, setQuestion5_10] = useState(false);
    const [question5_11, setQuestion5_11] = useState(false);
    const [question5_12, setQuestion5_12] = useState(false);
    const [question5_13, setQuestion5_13] = useState(false);
    const [question5_14, setQuestion5_14] = useState(false);
    const [question6, setQuestion6] = useState(0);
    const [question7, setQuestion7] = useState(0);
    const [question8, setQuestion8] = useState(0);

    const [total, setTotal] = useState(0);

    const submit = () => {
        if(question1 == 0)
        {
            toast.error("1번 문제를 선택해 주세요.");
        }
        else if(question2 == 0)
        {
            toast.error("2번 문제를 선택해 주세요.");
        }
        else if(question3 == 0)
        {
            toast.error("3번 문제를 선택해 주세요.");
        }
        else if(question4 == 0)
        {
            toast.error("4번 문제를 선택해 주세요.");
        }
        else if(question6 == 0)
        {
            toast.error("6번 문제를 선택해 주세요.");
        }
        else if(question7 == 0)
        {
            toast.error("7번 문제를 선택해 주세요.");
        }
        else if(question8 == 0)
        {
            toast.error("8번 문제를 선택해 주세요.");
        }

        var totalPoints = 0;

        if(question1 == 1)
        {
            totalPoints += 2;
        }
        else if(question1 == 2)
        {
            totalPoints =+ 4;
        }
        else if(question1 == 3)
        {
            totalPoints =+ 6;
        }
        else if(question1 == 4)
        {
            totalPoints =+ 8;
        }
        else if(question1 == 10)
        {
            totalPoints =+ 10;
        }

        if(question2 == 1)
        {
            totalPoints += 0;
        }
        else if(question2 == 2)
        {
            totalPoints += 5;
        }
        else if(question2 == 3)
        {
            totalPoints += 10;
        }
        else if(question2 == 4)
        {
            totalPoints += 15;
        }

        if(question3 == 1)
        {
            totalPoints += 6;
        }
        else if(question3 == 2)
        {
            totalPoints += 8;
        }
        else if(question3 == 3)
        {
            totalPoints += 10;
        }
        else if(question3 == 4)
        {
            totalPoints += 8;
        }
        else if(question3 == 5)
        {
            totalPoints += 6;
        }
        else if(question3 == 6)
        {
            totalPoints += 2;
        }

        if(question4 == 1)
        {
            totalPoints += 10;
        }
        else if(question4 == 2)
        {
            totalPoints += 8;
        }
        else if(question4 == 3)
        {
            totalPoints += 6;
        }
        else if(question4 == 4)
        {
            totalPoints += 4;
        }

        if(question6 == 1)
        {
            totalPoints += 0;
        }
        else if(question6 == 2)
        {
            totalPoints += 2;
        }
        else if(question6 == 3)
        {
            totalPoints += 4;
        }
        else if(question6 == 4)
        {
            totalPoints += 6;
        }
        else if(question6 == 5)
        {
            totalPoints += 8;
        }

        if(question7 == 1)
        {
            totalPoints += 3;
        }
        else if(question7 == 2)
        {
            totalPoints += 6;
        }
        else if(question7 == 3)
        {
            totalPoints += 9;
        }
        else if(question7 == 4)
        {
            totalPoints += 12;
        }

        if(question8 == 1)
        {
            totalPoints += 9;
        }
        else if(question8 == 2)
        {
            totalPoints += 12;
        }
        else if(question8 == 3)
        {
            totalPoints += 15;
        }

        if(question5_13 || (question5_12 && !question5_1 && !question5_2 && !question5_3 && !question5_4 && !question5_5 && !question5_6 && !question5_7 && !question5_8 && !question5_9 && !question5_10 && !question5_11) || (question5_6 && !question5_1 && !question5_2 && !question5_3 && !question5_4 && !question5_5 && !question5_12 && !question5_7 && !question5_8 && !question5_9 && !question5_10 && !question5_11))
        {
            totalPoints += 0;
            console.log("nothing")
        }
        else if(question5_3 || question5_5 || question5_2)
        {
            totalPoints += 20;
            console.log("20")
        }
        else if((question5_10 || question5_11 || question5_12) && (!question5_1 && !question5_2 && !question5_3 && !question5_4 && !question5_5 && !question5_6 && !question5_7 && !question5_8 && !question5_9))
        {
            totalPoints += 5;
            console.log("5")
        }
        else if((question5_1 || question5_2 || question5_4 ||  question5_7 || question5_8 || question5_9) && (!question5_3 && !question5_5 && !question5_6 && !question5_10 && !question5_11 && !question5_12 && !question5_13))
        {
            totalPoints += 10;
            console.log("10")
        }
        else if((question5_1 || question5_4 ||  question5_7 || question5_8 || question5_9) && (question5_6 || question5_7 || question5_8 || question5_9 || question5_10 || question5_11))
        {
            totalPoints += 15;
            console.log("15")
        }

        if(question2 == 1)
        {
            totalPoints -= 20;
        }

        setSubmitted(true);
        console.log(totalPoints);
        setTotal(totalPoints);
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: 'rgb(57, 67, 80)' }}>
                <div className="col-2 logo">
                    <img
                        src="assets/deeptrade_logo.png"
                        alt="logo"
                        style={{ margin: "0px 20px 0 20px" }}
                        onClick={() => {
                            window.open("https://deeptrade.co/", "_self");
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: 10
                }}
            >
                설문조사
            </div>
            {
            submitted ?
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                {
                        (total >= 0 && total <= 40) ?
                        <CheckCircleOutlined
                            style={{
                                fontSize: 100,
                                color: '#03C988',
                                marginTop: 30
                            }}
                        /> :
                        (total >= 41 && total <= 60) ?
                        <MinusCircleOutlined 
                            style={{
                                fontSize: 100,
                                color: '#EBECF1',
                                marginTop: 30
                            }}
                        /> :
                        <ExclamationCircleOutlined 
                            style={{
                                fontSize: 100,
                                color: '#DF2E38',
                                marginTop: 30
                            }}
                        />
                    }
                <p className="fw-bold text-center" style={{marginTop: 50}}>
                    당신의 투자 성향 설문을 환산한 점수는 {total}점입니다. <br />당신의 위험성향은 
                    {
                        (total >= 0 && total <= 20) ?
                        ' 안정' :
                        (total >= 21 && total <= 40) ?
                        ' 안정추구' :
                        (total >= 41 && total <= 60) ?
                        ' 혼합' :
                        (total >= 61 && total <= 80) ?
                        ' 적극투자' :
                        ' 공격'
                    }
                    형이며 제안하는 포트폴리오는 XPercent 주식형 
                    {
                        (total >= 0 && total <= 40) ?
                        ' 안정' :
                        (total >= 41 && total <= 60) ?
                        ' 혼합' :
                        '공격'
                    }
                    형입니다.
                </p>
            </div>
                :
            <MDBContainer className="d-flex justify-content-center">
                <div className="mx-0 mx-sm-auto">
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            1. 총 자산대비 금융자산의 비중
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault1"
                                id="question1_1"
                                label="10% 이하"
                                inline
                                onChange={() => {
                                    setQuestion1(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault1"
                                id="question1_2"
                                label="30% 이하"
                                inline
                                onChange={() => {
                                    setQuestion1(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault1"
                                id="question1_3"
                                label="50% 이하"
                                inline
                                onChange={() => {
                                    setQuestion1(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault1"
                                id="question1_4"
                                label="70% 이하"
                                inline
                                onChange={() => {
                                    setQuestion1(4);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault1"
                                id="question1_5"
                                label="70% 초과"
                                inline
                                onChange={() => {
                                    setQuestion1(5);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            2. 감당할 수 있는 손실 정도
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault2"
                                id="question2_1"
                                label="원금 보장"
                                inline
                                onChange={() => {
                                    setQuestion2(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault2"
                                id="question2_2"
                                label="원금의 20% 이하"
                                inline
                                onChange={() => {
                                    setQuestion2(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault2"
                                id="question2_3"
                                label="원금의 50% 이하"
                                inline
                                onChange={() => {
                                    setQuestion2(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault2"
                                id="question2_4"
                                label="상관 없음"
                                inline
                                onChange={() => {
                                    setQuestion2(4);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            3. 투자자 연령대
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_1"
                                label="20세 미만"
                                inline
                                onChange={() => {
                                    setQuestion3(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_2"
                                label="20 ~ 30세"
                                inline
                                onChange={() => {
                                    setQuestion3(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_3"
                                label="31 ~ 40세"
                                inline
                                onChange={() => {
                                    setQuestion3(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_4"
                                label="41 ~ 50세"
                                inline
                                onChange={() => {
                                    setQuestion3(4);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_5"
                                label="51 ~ 60세"
                                inline
                                onChange={() => {
                                    setQuestion3(5);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault3"
                                id="question3_6"
                                label="61세 이상"
                                inline
                                onChange={() => {
                                    setQuestion3(6);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            4. 투자 목적
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault4"
                                id="question4_1"
                                label="단기적 투자 기회 포착"
                                inline
                                onChange={() => {
                                    setQuestion4(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault4"
                                id="question4_2"
                                label="중장기 자산 증식"
                                inline
                                onChange={() => {
                                    setQuestion4(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault4"
                                id="question4_3"
                                label="안정적인 연금성 수익 창출"
                                inline
                                onChange={() => {
                                    setQuestion4(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault4"
                                id="question4_4"
                                label="금리 수준의 수익 창출"
                                inline
                                onChange={() => {
                                    setQuestion4(4);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            5. 투자경험이 있는 금융투자상품 (복수선택가능)
                        </p>

                        <div className="text-left">
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_1"
                                label="주식"
                                inline
                                onChange={() => {
                                    setQuestion5_1(!question5_1);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_2"
                                label="ELW"
                                inline
                                onChange={() => {
                                    setQuestion5_2(!question5_2);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_3"
                                label="신용거래"
                                inline
                                onChange={() => {
                                    setQuestion5_3(!question5_3);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_4"
                                label="외화증권"
                                inline
                                onChange={() => {
                                    setQuestion5_4(!question5_4);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_5"
                                label="선물옵션"
                                inline
                                onChange={() => {
                                    setQuestion5_5(!question5_5);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_6"
                                label="채권형펀드(채권 포함)"
                                inline
                                onChange={() => {
                                    setQuestion5_6(!question5_6);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_7"
                                label="주식형펀드"
                                inline
                                onChange={() => {
                                    setQuestion5_7(!question5_7);
                                }}
                            />
                        </div>
                        <div className="text-left">
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_8"
                                label="혼합형펀드"
                                inline
                                onChange={() => {
                                    setQuestion5_8(!question5_8);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_9"
                                label="해외펀드"
                                inline
                                onChange={() => {
                                    setQuestion5_9(!question5_9);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_10"
                                label="투자자문-일임"
                                inline
                                onChange={() => {
                                    setQuestion5_10(!question5_10);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_11"
                                label="신탁"
                                inline
                                onChange={() => {
                                    setQuestion5_11(!question5_11);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_12"
                                label="현금성 자산 (예적금, MMF, CMA)"
                                inline
                                onChange={() => {
                                    setQuestion5_12(!question5_12);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_13"
                                label="없음"
                                inline
                                onChange={() => {
                                    setQuestion5_13(!question5_13);
                                }}
                            />
                            <MDBCheckbox
                                name="flexCheckboxDefault"
                                id="question5_14"
                                label="기타"
                                inline
                                onChange={() => {
                                    setQuestion5_14(!question5_14);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            6. 금융투자상품 투자경험기간
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault6"
                                id="question6_1"
                                label="전혀 없음"
                                inline
                                onChange={() => {
                                    setQuestion6(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault6"
                                id="question6_2"
                                label="1년 미만"
                                inline
                                onChange={() => {
                                    setQuestion6(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault6"
                                id="question6_3"
                                label="3년 미만"
                                inline
                                onChange={() => {
                                    setQuestion6(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault6"
                                id="question6_4"
                                label="5년 미만"
                                inline
                                onChange={() => {
                                    setQuestion6(4);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault6"
                                id="question6_5"
                                label="5년 이상"
                                inline
                                onChange={() => {
                                    setQuestion6(5);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            7. 목표하는 투자 기간
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault7"
                                id="question7_1"
                                label="6개원 미만"
                                inline
                                onChange={() => {
                                    setQuestion7(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault7"
                                id="question7_2"
                                label="1년 미만"
                                inline
                                onChange={() => {
                                    setQuestion7(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault7"
                                id="question7_3"
                                label="3년 미만"
                                inline
                                onChange={() => {
                                    setQuestion7(3);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault7"
                                id="question7_4"
                                label="3년 이상"
                                inline
                                onChange={() => {
                                    setQuestion7(4);
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white mt-3">
                        <p className="fw-bold text-left">
                            8. 투자 이해도의 정도
                        </p>

                        <div className="text-left">
                            <MDBRadio
                                name="flexRadioDefault8"
                                id="question8_1"
                                label="예적금 외에는 인지하고 있는 금융상품이 없음"
                                inline
                                onChange={() => {
                                    setQuestion8(1);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault8"
                                id="question8_2"
                                label="주식/채권/펀드 등 일반적인 상품에 대해서는 인지하고 있음"
                                inline
                                onChange={() => {
                                    setQuestion8(2);
                                }}
                            />
                            <MDBRadio
                                name="flexRadioDefault8"
                                id="question8_3"
                                label="파생상품을 포함한 모든 금융상품을 이해하고 있음"
                                inline
                                onChange={() => {
                                    setQuestion8(3);
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className="text-center"
                        style={{
                            marginTop: 20,
                            marginBottom: 50
                        }}
                        onClick={() => {
                            submit();
                        }}
                    >
                        <MDBBtn style={{ fontWeight: 'bold' }}>제출</MDBBtn>
                    </div>
                </div>
            </MDBContainer>
            }
            

            <ToastContainer />
        </>
    );
}