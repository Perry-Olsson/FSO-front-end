import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ name, handleClick }) => (
  <button className="buttons" onClick={handleClick}>
    {name}
  </button>
);

const Statistic = ({ stat, value }) => (
  <tr>
    <td>{stat}</td>
    <td>
      {value}
      {stat === "positive" && "%"}
    </td>
  </tr>
);

const Statistics = ({ stats }) => {
  const totalFeedback = stats["good"] + stats["neutral"] + stats["bad"];
  return totalFeedback ? (
    <>
      <Statistic stat="good" value={stats["good"]} />
      <Statistic stat="neutral" value={stats["neutral"]} />
      <Statistic stat="bad" value={stats["bad"]} />
      <Statistic stat="all" value={totalFeedback} />
      <Statistic
        stat="average"
        value={(stats["good"] - stats["bad"]) / totalFeedback || 0}
      />
      <Statistic stat="positive" value={(stats["good"] / totalFeedback) * 100 || 0} />
    </>
  ) : (
    <tr>
      <td>No feedback given</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const handleClick = (state, setState) => () => setState(state + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} name={"good"} />
      <Button handleClick={handleClick(neutral, setNeutral)} name={"neutral"} />
      <Button handleClick={handleClick(bad, setBad)} name={"bad"} />
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistics stats={stats} />
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
