import React from "react";
import "./EnterprisesService.css";
import { useSelector } from "react-redux";
function EnterprisesService() {
  const user_info_reducer = useSelector((state) => state.loginReducer);

  console.log("user_info_reducer", user_info_reducer);
  const data = [
    {
      stock_id: "005290",
      name: "동진쎄미켐",
      buying_date: "8/28/2023",
      selling_date: "9/1/2023",
      sector: "반도체",
    },
    {
      stock_id: "222080",
      name: "씨아이에스",
      buying_date: "8/28/2023",
      selling_date: "9/1/2023",
      sector: "기계",
    },
    {
      stock_id: "263750",
      name: "펄어비스",
      buying_date: "8/28/2023",
      selling_date: "9/1/2023",
      sector: "디지털컨텐츠",
    },
    {
      stock_id: "214370",
      name: "케어젠",
      buying_date: "8/28/2023",
      selling_date: "9/1/2023",
      sector: "의약품",
    },
    {
      stock_id: "272290",
      name: "이녹스첨단소",
      buying_date: "8/28/2023",
      selling_date: "9/1/2023",
      sector: "IT부품",
    },
  ];
  function StockTable({ data }) {
    return (
      <div className="enterprises_service_table_responsive">
        <table className="enterprises_service_table enterprises_service_table-bordered">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Name</th>
              <th>Buying Date</th>
              <th>Selling Date</th>
              <th>Sector</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.stock_id}</td>
                <td>{row.name}</td>
                <td>{row.buying_date}</td>
                <td>{row.selling_date}</td>
                <td>{row.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="enterprises_service_container">
      <div className="enterprises_service_company_text">
        DeepTrade & {user_info_reducer.company_name}
      </div>
      <div className="enterprises_button-row">
        <button className="enterprises_button">2주 Top 5</button>
        <button className="enterprises_button">2주 Top 20</button>
        <button className="enterprises_button">4주 Top 5</button>
        <button className="enterprises_button">4주 Top 20</button>
        <button className="enterprises_button">8주 Top 5</button>
        <button className="enterprises_button">8주 Top 20</button>
      </div>

      <StockTable data={data} />
    </div>
  );
}

export default EnterprisesService;
