import { useEffect, useState, useRef } from 'react'
import { snekData, gridSize } from '../InitialData'

function useSnek() {

    const [data, setData] = useState(snekData)
    const [direction, setDirection] = useState({ x: 0, y: 1 })
    const headPos = data[0].pos
    const dirRef = useRef(direction);
    dirRef.current = direction;

    function addDir(pos, dir) {
        return {
            x: (pos.x + dir.x) % gridSize,
            y: (pos.y + dir.y) % gridSize
        }
    }
    function move(dir) {
        console.log('move')
        setData(prevData => {
            const arr = prevData.map((block, index) => ({
                ...block,
                pos: index == 0 ? addDir(block.pos, dir) : { ...(prevData[index - 1].pos) }
            }))
            return arr
        })
    }
    function updateDirecton({ key }) {
        let x = 0, y = 0;
        switch (key) {
            case 'w': {
                x = 0
                y = -1;
                break;
            }
            case 'a': {
                x = -1
                y = 0;
                break;
            }
            case 's': {
                x = 0
                y = 1;
                break;
            }
            case 'd': {
                x = 1
                y = 0;
                break;
            }
            default: break;
        }
        // if (direction.x !== -x && direction.y !== -y)
        setDirection({ x, y })
    }

    useEffect(() => {
        setTimeout(() => {
            move(dirRef.current)
        }, 1000)
    }, [headPos.x, headPos.y])

    useEffect(() => {
        document.addEventListener('keydown', updateDirecton)
        return () => {
            document.removeEventListener('keydown', updateDirecton)
        }
    }, [])

    return [data]
}
export default useSnek