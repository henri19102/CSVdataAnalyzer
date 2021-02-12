import React, { useState } from "react";

const VolumePriceChange = ({ allData, sendErrorMsg, startDate, endDate }) => {
  const [highestRange, setHighestRange] = useState([]);

  const sortByVolume = () => {
    if (allData.length === 0) {
      sendErrorMsg("Select file first!");
    }

    let temporaryList = [];

    try {
      temporaryList = allData.filter((x) => x.date >= startDate && x.date <= endDate)
        .map((x) =>(x = {
              date: x.date,
              volume: x.volume,
              priceChange: Math.abs(x.high - x.low).toFixed(2),
            }))
        .sort((a, b) =>
          b.volume - a.volume === 0
            ? b.priceChange - a.priceChange
            : b.volume - a.volume);

      setHighestRange(temporaryList);
    } catch (e) {
      console.log(e);
      setHighestRange([]);
    }
  };

  const setHidden = () => {
    setHighestRange([]);
  };

  if (highestRange.length === 0) {
    return (
      <div>
        <button onClick={sortByVolume}>
          Show ordered list of highest volume dates
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="myStyle">
        <button onClick={setHidden}>Hide Table</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Volume</th>
            <th>Price Change</th>
          </tr>
          {highestRange.map((x) => (
            <tr key={x.volume}>
              <td>{x.date}</td>
              <td>{x.volume}</td>
              <td>{x.priceChange} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolumePriceChange;
