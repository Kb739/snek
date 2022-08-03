
function useGrid(gridSize, drawBlocks) {
    console.log(drawBlocks)

    function createGrid(gridSize) {
        const arr = [];
        for (let i = 0; i < gridSize ** 2; i++) {
            const block = {
                style: {
                    backgroundColor: "white"
                },
                className: "grid-block"
            }
            const drawBlock = drawBlocks.find(item => posToIndex(item.pos) === i)
            if (drawBlock) {
                block.style.backgroundColor = `${drawBlock.color}`
            }
            arr.push(block)
        }
        return arr
    }

    function posToIndex(pos) {
        return pos.x + pos.y * 10;
    }

    const gridStyle = {
        display: 'grid',
        gridTemplate: `repeat(${gridSize},1fr)/repeat(${gridSize},1fr)`,
    }

    return (
        {
            grid: createGrid(gridSize),
            gridStyle
        }
    )
}

export default useGrid

