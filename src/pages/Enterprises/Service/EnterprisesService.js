import React, { useState, useEffect } from "react";
import "./EnterprisesService.css";
import { useDispatch, useSelector } from "react-redux";
import { getDtData } from "../../../api";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../../redux/slices/loginSlice";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";

import { AiOutlineCalendar } from "react-icons/ai";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-76%, -92%)",
    background: "white", // Set the background color
    border: "1px solid #ccc", // Add a border
    borderRadius: "5px", // Add rounded corners
    padding: "10px", // Add padding
    maxWidth: "500px", // Set a maximum width
    width: "454px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add a
  },
};
function EnterprisesService() {
  const user_info_reducer = useSelector((state) => state.loginReducer);

  const [value, onChange] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Add state for calendar visibility

  const [dataList, setDataList] = useState(null);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [currentModel, setcurrentModel] = useState(() => {
    if (user_info_reducer.company_name === "Hantoo") {
      return "1w-5";
    } else if (user_info_reducer.company_name === "Cresendo") {
      return "5";
    } else {
      return "1w";
    }
  });

  console.log("currentModel", currentModel);
  const dateObjects = user_info_reducer.date_list.map(
    (dateString) => new Date(dateString)
  );

  const [vaildSignalDateList, setVaildSignalDateList] = useState(dateObjects);
  const [selectedDate, setSelectedDate] = useState(
    vaildSignalDateList.slice(-1)[0]
  );
  const convertDate = () => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const [currentSelectedDate, setCurrentSelectedDate] = useState(convertDate());

  const onLogout = () => {
    dispatch(resetState());
    navigate("/enterprise", { replace: true });
  };
  const getModelData = async (modelType, currentdate) => {
    console.log("modelType>>>>", modelType, currentSelectedDate);
    console.log("currentdate", currentdate);
    if (currentdate !== undefined) {
      const res = await getDtData.fetchDtData(
        user_info_reducer.company_name,
        modelType,
        currentdate
      );

      if (res.status === 200) {
        setDataList(res.data);
        setSelected(modelType);

        // console.log("data is feteched", res.data);
      } else {
        setServerError(true);
        console.log("something went wrong");
      }
    } else {
      const res = await getDtData.fetchDtData(
        user_info_reducer.company_name,
        modelType,
        currentSelectedDate
      );

      if (res.status === 200) {
        setDataList(res.data);
        setSelected(modelType);

        // console.log("data is feteched", res.data);
      } else {
        setServerError(true);
        console.log("something went wrong");
      }
    }
  };

  useEffect(() => {
    let isComponentRender = true;
    if (isComponentRender) {
      let model_type = "";
      if (user_info_reducer.company_name === "Hantoo") {
        model_type = "1w-5";
      } else if (user_info_reducer.company_name === "Cresendo") {
        model_type = "5";
      } else {
        model_type = "1w";
      }

      getModelData(model_type);
    }

    return () => {
      isComponentRender = false;
      setServerError(false);
    };
  }, [serverError]);

  // console.log("user_info_reducer", user_info_reducer);

  function StockTable({ data }) {
    return (
      <div className="enterprises_service_table_responsive">
        <table className="enterprises_service_table enterprises_service_table-bordered">
          <thead
            className={
              showCalendar ? "nonsticky_table_header" : "sticky_table_header"
            }
          >
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

  function closeModal() {
    setShowCalendar(false);
  }

  // Calculate min and max dates based on your clickable dates
  const minDate = new Date(Math.min(...vaildSignalDateList));
  minDate.setFullYear(minDate.getFullYear() - 3); // Adjust the range as needed

  const maxDate = new Date(Math.max(...vaildSignalDateList));
  // maxDate.setFullYear(maxDate.getFullYear() + 1); // Adjust the range as needed

  const isDateDisabled = (date) => {
    return !vaildSignalDateList.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(_date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentSelectedDate(formattedDate);
    setShowCalendar(false);
    console.log("currentModel", currentModel);
    getModelData(currentModel, formattedDate);
  };

  return (
    <>
      {user_info_reducer.is_staff ? (
        <div style={{ backgroundColor: "#F5F4FF", height: "110vh" }}>
          <div className="enterprises_service_container">
            <div className="enterprises_service_inner_box">
              <div className="enterprises_service_company_text">
                DeepTrade Market AI
              </div>
              <div className="enter_logout_button" onClick={onLogout}>
                로그아웃
              </div>
            </div>
            <div className="enterprises_service_calendar_btn">
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="calendar_icon"
              >
                <AiOutlineCalendar size={25} />
                {showCalendar ? convertDate() : convertDate()}
              </div>
              <Modal
                isOpen={showCalendar}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <Calendar
                  defaultActiveStartDate={selectedDate}
                  onClickDay={(date) => handleDateSelection(date)}
                  onChange={onChange}
                  value={value}
                  minDate={minDate}
                  maxDate={maxDate}
                  tileClassName={({ date }) => {
                    // Add a custom CSS class to the default selected date
                    return date.toDateString() === selectedDate.toDateString()
                      ? "selected-date"
                      : "";
                  }}
                  tileDisabled={({ date }) => isDateDisabled(date)}
                />
              </Modal>
            </div>
            <div className="enterprises_outer">
              <div className="enterprises_button-row">
                {user_info_reducer.company_name === "Hantoo" ? (
                  <div className="button_container">
                    <div className="button_row" style={{}}>
                      <button
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("1w-5");
                          getModelData("1w-5");
                        }}
                        style={{
                          backgroundColor:
                            selected === "1w-5"
                              ? "#007bff"
                              : "rgb(100 100 100)",
                        }}
                      >
                        1주 Top 5
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "2w-5"
                              ? "#007bff"
                              : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("2w-5");
                          getModelData("2w-5");
                        }}
                      >
                        2주 Top 5
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "4w-5"
                              ? "#007bff"
                              : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("4w-5");
                          getModelData("4w-5");
                        }}
                      >
                        4주 Top 5
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "8w-5"
                              ? "#007bff"
                              : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("8w-5");
                          getModelData("8w-5");
                        }}
                      >
                        8주 Top 5
                      </button>
                    </div>
                    <div className="button_row2">
                      <button
                        style={{
                          backgroundColor:
                            selected === "1w" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("1w");
                          getModelData("1w");
                        }}
                      >
                        1주 Top 20
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "2w" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("2w");
                          getModelData("2w");
                        }}
                      >
                        2주 Top 20
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "4w" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("4w");
                          getModelData("4w");
                        }}
                      >
                        4주 Top 20
                      </button>
                      <button
                        style={{
                          backgroundColor:
                            selected === "8w" ? "#007bff" : "rgb(100 100 100)",
                        }}
                        className="enterprises_button"
                        onClick={() => {
                          setcurrentModel("8w");
                          getModelData("8w");
                        }}
                      >
                        8주 Top 20
                      </button>
                    </div>
                  </div>
                ) : user_info_reducer.company_name === "Cresendo" ? (
                  <>
                    <button
                      style={{
                        backgroundColor:
                          selected === "5" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        setcurrentModel("5");
                        getModelData("5");
                      }}
                    >
                      4주 Top 5
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "20" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        setcurrentModel("20");
                        getModelData("20");
                      }}
                    >
                      4주 Top 20
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{
                        backgroundColor:
                          selected === "1w" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        getModelData("1w");
                      }}
                    >
                      1주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "2w" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        getModelData("2w");
                      }}
                    >
                      2주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "4w" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        getModelData("4w");
                      }}
                    >
                      4주 Top 20
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          selected === "8w" ? "#007bff" : "rgb(100 100 100)",
                      }}
                      className="enterprises_button"
                      onClick={() => {
                        getModelData("8w");
                      }}
                    >
                      8주 Top 20
                    </button>
                  </>
                )}
              </div>

              {dataList != null ? <StockTable data={dataList} /> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EnterprisesService;
