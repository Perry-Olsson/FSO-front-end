import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const DisplayAnecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const App = ({ anecdotes }) => {
  const getRandomNumber = () => Math.floor(Math.random() * 6);

  const [selected, setSelected] = useState(getRandomNumber());
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map((val) => 0)
  );

  const handleNextAnectode = () => setSelected(getRandomNumber());
  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const leadingAnecdote = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleNextAnectode} />
      <h2>Leading anecdote</h2>
      {votes[leadingAnecdote] === 0 ? (
        "No votes yet"
      ) : (
        <DisplayAnecdote
          anecdote={anecdotes[leadingAnecdote]}
          votes={votes[leadingAnecdote]}
        />
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
