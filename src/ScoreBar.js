import React from 'react'
function ScoreBar({ playerScore }) {
    return (
        <div className="score-bar">
            <h3>Highest Score:{playerScore.highScore}</h3>
            <h3>Current Score:{playerScore.currentScore}</h3>
        </div>
    )
}
export default ScoreBar