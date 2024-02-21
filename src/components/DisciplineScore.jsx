import React from "react";
import './DisciplineScore.css';
import Typography from '@mui/material/Typography';

function DisciplineScore(props) {
  const number = (props.count / props.total.length) * 100;
  const roundedNumber = Number(number.toFixed(4));

  return (
    <div className="score">
      

      {props.total.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom className='head'>
          You didn't do anything today.
        </Typography>
      ) : <Typography variant="subtitle1" gutterBottom className='head'>
      You were {roundedNumber}% disciplined today
    </Typography>}
    </div>
  );
}

export default DisciplineScore;
