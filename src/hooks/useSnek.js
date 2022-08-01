import { useEffect, useState, useRef } from 'react'
import { snekData, gridSize } from '../InitialData'

function useSnek() {

    const [data, setData] = useState(snekData.body)
    const [direction, setDirection] = useState(snekData.initialDirection)
    const headPos = data[0].pos

    const dirRef = useRef(direction);
    dirRef.current = direction;

    const prevPos = useRef(addDir(headPos, { x: -direction.x, y: -direction.y }));
    const physicalDir = useRef(direction);
    physicalDir.current = calculatePhysicalDirection()


    function calculatePhysicalDirection() {
        let x = headPos.x - prevPos.current.x
        let y = headPos.y - prevPos.current.y
        //normalize 
        x = x > 1 ? -1 : x < -1 ? 1 : x
        y = y > 1 ? -1 : y < -1 ? 1 : y
        return {
            x, y
        }
    }
    function addDir(pos, dir) {
        return {
            x: (gridSize + (pos.x + dir.x)) % gridSize,
            y: (gridSize + (pos.y + dir.y)) % gridSize
        }
    }

    function isOpposite(prevDir, newDir) {
        return Math.abs(prevDir.x + newDir.x) + Math.abs(prevDir.y + newDir.y) === 0 ? true : false;
    }

    function move() {
        const moveDir = isOpposite(physicalDir.current, dirRef.current) ? physicalDir.current : dirRef.current;
        prevPos.current = headPos;
        setData(prevData => {
            const arr = prevData.map((block, index) => ({
                ...block,
                pos: index == 0 ? addDir(block.pos, moveDir) : { ...(prevData[index - 1].pos) }
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
        setDirection({ x: x, y: y })
    }
    function grow() {
        setData(prevData => {
            return [...prevData, { ...prevData[prevData.length - 1] }]
        })
    }

    useEffect(() => {
        document.addEventListener('keydown', updateDirecton)
        return () => {
            document.removeEventListener('keydown', updateDirecton)
        }
    }, [])

    return [data, headPos, grow, move]
}
export default useSnek