import React from 'react';
import { connect } from 'react-redux';
import { resultSelector } from '../selector/selectors';

function ResultContainer({ result, timeTaken }) {
  return (
    <div className="result-container">
      {!result && <p className="result-container--loading">loading result...</p>}
      {result && result.status === 'success' && <div className="result-container--success">
        <p className="result-container--success__wording">Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p>
        <p className="result-container__time-taken">{`Time taken: ${timeTaken}`}</p>
        <p className="result-container__planet">{`Planet Found: ${result.planet_name}`}</p>
      </div>}
      {result && result.status !== 'success' && <div className="result-container--failure">
        <p>Oops... sorry... you didn't get to find Falcone... Maybe try again.</p>
      </div>}
    </div>
  );
}

export default connect(resultSelector)(ResultContainer);