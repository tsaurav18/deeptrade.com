import React, { useState } from "react";
import SideBar from "./SideBar";
import './index.css'
import { DatePicker, Space, Dropdown, Typography, Select, Table, Tag } from 'antd';
import { DownOutlined, SmileOutline, CaretDownOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const columns = [
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '분류',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '추천날짜',
      dataIndex: 'recom_date',
      key: 'recom_date',
    },
    {
      title: '종목명',
      key: 'stock_name',
      dataIndex: 'stock_name'
    },
    {
      title: '위험도',
      key: 'danger',
      dataIndex: 'danger'
    },
    {
      title: '매수 날짜',
      key: 'buy_date',
      dataIndex: 'buy_date'
    },
    {
      title: '매도 날짜',
      key: 'sell_date',
      dataIndex: 'sell_date'
    },
    {
      title: '비중',
      key: 'weight',
      dataIndex: 'weight'
    },
  ];
  const data = [
    {
      key: '1',
      name: '주식형4호',
      type: '공격형',
      recom_date: '2022-05-30',
      stock_name: '태원불산',
      danger: '고',
      buy_date: '2022-05-30',
      sell_date: '2022-05-30',
      weight: '0.05'
    }
  ];

export default function PortfolioList() {

	const [navVisible, showNavbar] = useState(false);
    const [product, setProduct] = useState("0")
    const [type, setType] = useState("all")

    const handleChange = (value) => {
        setProduct(value)
    };
    const handleTypeChange = (value) => {
        setType(value)
    };

    return (
        <>
            <div className="App">
                <SideBar visible={navVisible} show={showNavbar} />
                <>
                    <div className="page page-with-navbar">
                        <div
                            className="portfolio-header"
                        >
                            <div
                                className="portfolio-header-head"
                            >
                                목록 검색
                            </div>
                            <div
                                className="portfolio-header-select"
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        기간
                                    </div>
                                    <RangePicker size={'small'} />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        상품
                                    </div>
                                    <Select
                                        defaultValue={product}
                                        style={{
                                            width: 120
                                        }}
                                        onChange={handleChange}
                                        size={"small"}
                                        options={[
                                            {
                                                value: '0',
                                                label: '전체',
                                            },
                                            {
                                                value: '1',
                                                label: '주식형1호',
                                            },
                                            {
                                                value: '2',
                                                label: '주식형2호',
                                            },
                                            {
                                                value: '3',
                                                label: '주식형3호',
                                            },
                                            {
                                                value: '4',
                                                label: '주식형4호',
                                            },
                                        ]}
                                        />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    className="inner-select"
                                >
                                    <div
                                        style={{
                                            marginRight: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        분류
                                    </div>
                                    <Select
                                        defaultValue={type}
                                        style={{
                                            width: 120
                                        }}
                                        size={'small'}
                                        onChange={handleTypeChange}
                                        options={[
                                            {
                                            value: 'all',
                                            label: '전체',
                                            },
                                            {
                                            value: 'attack',
                                            label: '공격형',
                                            },
                                            {
                                            value: 'mixed',
                                            label: '혼합형',
                                            },
                                            {
                                            value: 'safe',
                                            label: '안전형',
                                            },
                                        ]}
                                        />
                                </div>
                            </div>
                            <div
                                className="portfolio-header-button"
                            >
                                조회 하기
                            </div>
                        </div>
                        <div
                            className="portfolio-body"
                        >
                            <div
                                style={{
                                    margin: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                포트폴리오 목록
                            </div>
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}