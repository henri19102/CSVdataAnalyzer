import React, { useState } from "react";

const UpwardTrend = ({ allData, startDate, endDate, sendErrorMsg }) => {
  const [upTrend, setUpTrend] = useState("");

  const hideText = () => {
    setUpTrend("");
  };

  const longestUpwardTrend = () => {
    if (allData.length === 0) {
      setUpTrend("");
    }

    try {
      let allData2 = allData.filter((x) => x.date >= startDate && x.date <= endDate);
      let newList = allData2.map((x) => x.closeLast);
      let temporary = [];
      let final = [];
      let i;
      for (i = 0; i < allData2.length; i++) {
        temporary.push(allData2[i]);

        let first = newList[i] * 10000;
        let second = newList[i + 1] * 10000;

        if (first - second > 0) {
          if (temporary.length >= final.length) {
            final.length = 0;
            final = [...temporary];
          }
          temporary.length = 0;
        }
      }
      if (temporary.length >= final.length) {
        final.length = 0;
        final = [...temporary];
        temporary.length = 0;
      }
      setUpTrend(`In stock historical data the Close/Last price increased ${final.length} days in a row between ${final[0].date} and ${final[final.length - 1].date}.`);
    } catch (e) {
      sendErrorMsg("Select file first!");
    }
  };

  if (upTrend === "") {
    return (
      <div>
        <div className="myStyle">
          <button onClick={longestUpwardTrend}>
            Show the longest upward trend
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="myStyle">
        <button onClick={hideText}> Hide text </button>
      </div>

      <p>{upTrend}</p>
    </div>
  );
};

export default UpwardTrend;
