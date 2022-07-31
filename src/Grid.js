import React, { useState } from "react";
import useSnek from "./hooks/useSnek"

function Grid(props) {

    const [snekData] = useSnek()

    function createGrid(size) {
        const arr = []
        for (let i = 0; i < size * size; i++) {
            const style = {
                backgroundColor: `${snekData.some(block => block.index === i) ? 'black' : 'white'}`
            }
            arr.push(<div className="grid-block" style={style}></div>)
        }
        return arr
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

