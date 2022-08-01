import React, { useState, useEffect } from "react";
import useSnek from "./hooks/useSnek"
import { gridSize } from "./InitialData"

function Grid(props) {

    const [snekData, headPos] = useSnek()
    const [foodPos, setFoodPos] = useState(nextFoodPos())
    const [spwanFood, setSpawnFood] = useState(true)

    checkCollision();

    function checkCollision() {
        if (posToIndex(headPos) === foodPos) {
            if (!spwanFood)
                setSpawnFood(true)
        }
    }

    function createGrid(gridSize) {
        const arr = [];
        for (let i = 0; i < gridSize ** 2; i++) {
            const block = {
                style: {
                    backgroundColor: "white"
                },
                className: "grid-block"
            }
            const snekBlock = snekData.find(item => posToIndex(item.pos) === i)
            if (snekBlock) {
                block.style.backgroundColor = `${snekBlock.color}`
            }
            else if (i === foodPos) {
                block.style.backgroundColor = "red"
            }
            arr.push(block)
        }
        return arr
    }

    function posToIndex(pos) {
        return pos.x + pos.y * 10;
    }

    function nextFoodPos() {
        const emptyBlocks = []
        for (let i = 0; i < gridSize ** 2; i++) {
            if (!snekData.some(item => posToIndex(item.pos) === i))
                emptyBlocks.push(i)
        }
        const num = Math.floor(Math.random() * emptyBlocks.length)
        return emptyBlocks[num]
    }

    const gridElements = createGrid(props.size).map(block => {
        return <div className={block.className} style={block.style}></div>
    })

    const gridStyle = {
        display: 'grid',
        gridTemplate: `repeat(${props.size},1fr)/repeat(${props.size},1fr)`,
        gap: '1px'

    }

    useEffect(() => {
        if (spwanFood) {
            setFoodPos(nextFoodPos())
            setSpawnFood(false)
        }
    }, [spwanFood])

    return (
        <div className="grid" style={gridStyle} >
            {gridElements}
        </div>
    )
}

export default Grid

