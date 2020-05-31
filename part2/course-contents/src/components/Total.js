import React from "react";

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>Number of exercises {sum}</b>
    </p>
  );
};

export default Total;
