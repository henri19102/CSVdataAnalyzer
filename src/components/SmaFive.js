import React, { useState } from "react";
let sma = require("sma");

const SmaFive = ({ allData, sendErrorMsg, startDate, endDate }) => {
  const [smaList, setSmaList] = useState([]);

  const calculateSmaFive = () => {
    if (allData.length === 0) {
      sendErrorMsg("Select file first!");
    }

    try {
      let allData2 = allData.filter((x) => x.date >= startDate && x.date <= endDate);
      let newList = allData2.map((x) => x.open);
      let temporaryList = sma(newList, 5);
      let dateAndOpenList = [...allData2];
      dateAndOpenList.splice(0, 4);
      let i;
      let smaList = temporaryList.map((x) => Number(x));
      for (i = 0; i < smaList.length; i++) {
        let percentage = Math.abs(
          (smaList[i] / dateAndOpenList[i].open - 1) * 100
        );
        smaList[i] = {
          date: dateAndOpenList[i].date,
          sma5: smaList[i],
          open: dateAndOpenList[i].open,
          percent: percentage.toFixed(2),
        };
      }

      let smaListFinal = smaList
        .map((x) => (x = { date: x.date, percent: x.percent }))
        .sort((a, b) => b.percent - a.percent);
      setSmaList(smaListFinal);
    } catch (e) {
      console.log(e);
      setSmaList([]);
    }
  };

  const setHidden = () => {
    setSmaList([]);
  };

  if (smaList.length === 0) {
    return (
      <div>
        <button onClick={calculateSmaFive}>
          Show ordered list of price change percentages
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="myStyle">
        <button onClick={setHidden}> Hide Table </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Percent</th>
          </tr>
          {smaList.map((x) => (
            <tr key={x.date}>
              <td>{x.date}</td>
              <td>{x.percent} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmaFive;
