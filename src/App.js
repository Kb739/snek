import React, { useState, useEffect, useRef } from 'react'
import useGrid from './Grid'
import { gridSize } from './InitialData'
import useSnek from "./hooks/useSnek"
import useFood from "./hooks/useFood"
import ScoreBar from './ScoreBar'

function App() {

    const [foodRespawn, setFoodRespawn] = useState(false)
    const [snekData, grow, snekMove, snekReset, selfCollision] = useSnek()
    const foodData = useFood(snekData, gridSize, foodRespawn);
    const { grid, gridStyle } = useGrid(gridSize, [...snekData, foodData])

    const headPos = snekData[0].pos;
    const foodPos = foodData.pos;

    const [playerScore, setPlayerScore] = useState({
        currentScore: 0,
        highScore: 0
    })
    const [isGameRunning, setIsGameRunning] = useState(false)
    const isGameRunningRef = useRef(isGameRunning);
    isGameRunningRef.current = isGameRunning;

    const [isGameOver, setIsGameOver] = useState(false)

    function addToScore() {
        setPlayerScore(prevScore => ({
            ...prevScore,
            currentScore: prevScore.currentScore + 1
        }))
    }

    function updateHighScore() {
        const { currentScore, highScore } = playerScore;
        setPlayerScore(prevScore => ({
            currentScore: 0,
            highScore: currentScore > highScore ? currentScore : highScore
        }))
    }

    function restartGame() {
        updateHighScore()
        snekReset()
        setFoodRespawn(true)
        startGame()
    }

    function startGame() {
        setIsGameRunning(true)
        setIsGameOver(false)
    }

    function update() {
        snekMove()
    }

    function gameOver() {
        setIsGameRunning(false)
        setIsGameOver(true)
    }

    function collision_SnekToFood() {
        return headPos.x === foodPos.x && headPos.y === foodPos.y
    }

    function collision_SnekToSelf() {
        return selfCollision;
    }

    function handleCollision() {
        if (collision_SnekToFood()) {
            //food Consume
            grow()
            setFoodRespawn(true)
            addToScore()
        }
        else if (collision_SnekToSelf()) {
            gameOver()
        }
    }

    useEffect(() => {
        if (isGameRunning) {
            setTimeout(() => {
                if (isGameRunningRef.current) {
                    update()
                }
            }, 1000)
        }
    }, [headPos.x, headPos.y, isGameRunning])

    useEffect(() => {
        handleCollision()
    }, [headPos.x, headPos.y, selfCollision])

    useEffect(() => {
        if (foodRespawn) {
            setFoodRespawn(false)
        }
    }, [foodRespawn])


    const gridElements = grid.map(block => {
        return <div className={block.className} style={block.style}></div>
    })


    return (
        <div className='main'>
            <div className="grid" style={gridStyle}>
                {gridElements}
            </div>
            <ScoreBar playerScore={playerScore} />
            {
                isGameOver ? <button onClick={restartGame}>restart</button>
                    : !isGameRunning ? <button onClick={startGame}>start</button> : ''
            }

        </div>
    )
}
export default App