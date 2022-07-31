import React, { useState } from "react";
import useSnek from "./hooks/useSnek"
import { gridSize } from "./InitialData"

function Grid(props) {

    const [snekData] = useSnek()

    function createGrid(girdSize) {
        const arr = []
        for (let i = 0; i < gridSize ** 2; i++) {
            const style = {
                backgroundColor: `${snekData.some(block => posToIndex(block.pos) === i) ? 'black' : 'white'}`
            }
            arr.push(<div className="grid-block" style={style}></div>)
        }
        return arr
    }

    function posToIndex(pos) {
        return pos.x + pos.y * 10;
    }

    const gridElements = createGrid(props.size)

    const gridStyle = {
        display: 'grid',
        gridTemplate: `repeat(${props.size},1fr)/repeat(${props.size},1fr)`,
        gap: '1px'

    }
    return (
        <div className="grid" style={gridStyle} >
            {gridElements}
        </div>
    )
}

export default Grid

