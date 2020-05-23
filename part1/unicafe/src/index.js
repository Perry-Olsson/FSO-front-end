import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ name, handleClick }) => (
  <button className="buttons" onClick={handleClick}>
    {name}
  </button>
);

const DisplayFeedback = ({ stat, value }) => (
  <p>
    {stat} {value}
  </p>
);

const DisplayStats = ({ stats }) => {
  const totalFeedback = stats.reduce((acc, value) => acc + value, 0);
  return (
    <>
      <p>all {totalFeedback}</p>
      <p>average {(stats[0] - stats[2]) / totalFeedback || 0}</p>
      <p>positive {stats[0] / totalFeedback || 0}%</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (state, setState) => () => setState(state + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} name={"good"} />
      <Button handleClick={handleClick(neutral, setNeutral)} name={"neutral"} />
      <Button handleClick={handleClick(bad, setBad)} name={"bad"} />
      <h2>Statistics</h2>
      <DisplayFeedback stat="good" value={good} />
      <DisplayFeedback stat="neutral" value={neutral} />
      <DisplayFeedback stat="bad" value={bad} />
      <DisplayStats stats={[good, neutral, bad]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
