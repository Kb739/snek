import { useState, useEffect } from "react"

function useFood(nonEmptyBlocks, gridSize, findNewPos) {

    const [pos, setPos] = useState(nextFoodPos())

    useEffect(() => {
        if (findNewPos) {
            setPos(nextFoodPos())
        }
    }, [findNewPos])

    function nextFoodPos() {
        const emptyBlocks = []
        for (let i = 0; i < gridSize; i++) {
            {
                for (let j = 0; j < gridSize; j++) {
                    if (!nonEmptyBlocks.some(item => item.pos.x === i && item.pos.y === j))
                        emptyBlocks.push({ x: i, y: j })
                }
            }
        }
        const num = Math.floor(Math.random() * emptyBlocks.length)
        return emptyBlocks[num]
    }

    return {
        pos,
        color: 'red'
    }
}
export default useFood;