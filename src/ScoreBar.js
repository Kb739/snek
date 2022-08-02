import React from 'react'
function ScoreBar({ playerScore }) {
    return (
        <div className="score-bar">
            <h2>Highest Score:{playerScore.highScore}</h2>
            <h2>Current Score:{playerScore.currentScore}</h2>
        </div>
    )
}
export default ScoreBar