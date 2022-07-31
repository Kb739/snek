import React from "react";

function Grid(props) {

    function createGrid(size) {
        const arr = []
        for (let i = 0; i < size * size; i++)
            arr.push(<div className="grid-block"></div>)
        return arr
    }

    const gridElements = createGrid(props.size)
    const gridStyle = {
        display: 'grid',
        gridTemplate: `repeat(${props.size},1fr)/repeat(${props.size},1fr)`,

    }
    return (
        <div className="grid" style={gridStyle} >
            {gridElements}
        </div>
    )
}

export default Grid

