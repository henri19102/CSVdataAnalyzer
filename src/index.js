import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSVReader } from "react-papaparse";
import "./index.css";
import VolumePriceChange from "./components/VolumePriceChange";
import SmaFive from "./components/SmaFive";
import ErrorMsg from "./components/ErrorMsg";
import UpwardTrend from "./components/UpwardTrend";

const App = () => {
  const [allData, setAllData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [err, setErr] = useState("");

  const buttonRef = React.createRef();

  const sendErrorMsg = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr("");
    }, 3000);
  };

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    let lista = data.slice(1);
    lista.pop();
    try {
      let formattedData = lista.map((x) => x.data);
      let i;
      for (i = 0; i < formattedData.length; i++) {
        formattedData[i] = {
          date: (formattedData[i][0] = new Date(formattedData[i][0] + "EST").toISOString().substring(0, 10)),
          closeLast: (formattedData[i][1] = Number(formattedData[i][1].slice(2))),
          volume: (formattedData[i][2] = Number(formattedData[i][2])),
          open: (formattedData[i][3] = Number(formattedData[i][3].slice(2))),
          high: (formattedData[i][4] = Number(formattedData[i][4].slice(2))),
          low: (formattedData[i][5] = Number(formattedData[i][5].slice(2))),
        };
      }
      setAllData(formattedData.reverse());
      setStartDate(formattedData[0].date);
      setEndDate(formattedData[formattedData.length - 1].date);
    } catch (e) {
      handleRemoveFile(e);
      sendErrorMsg("Invalid file type!");
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
      setAllData([]);
      setStartDate("");
      setEndDate("");
    }
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };
  return (
    <div >
      <ErrorMsg err={err} />

      <h1>CSV Data Analyzer</h1>

      <CSVReader
        className="random"
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }) => (
          <aside>
            <button type="submit" onClick={handleOpenDialog}>
              Select local file
            </button>
            <div>{file && file.name}</div>
            <button onClick={handleRemoveFile}>Remove file</button>
          </aside>
        )}
      </CSVReader>

      <aside>
        <p>Start date:</p>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={startDate}
          onChange={handleStartDate}
        ></input>
      </aside>

      <aside>
        <p>End date:</p>
        <input
          type="date"
          id="end"
          name="trip-start"
          value={endDate}
          onChange={handleEndDate}
        ></input>
      </aside>

      <UpwardTrend
        allData={allData}
        sendErrorMsg={sendErrorMsg}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="tableStyle">
        <VolumePriceChange
          allData={allData}
          sendErrorMsg={sendErrorMsg}
          startDate={startDate}
          endDate={endDate}
        />
        <SmaFive
          allData={allData}
          sendErrorMsg={sendErrorMsg}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
