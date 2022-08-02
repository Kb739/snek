import { useEffect, useState, useRef } from 'react'
import { snekData, gridSize } from '../InitialData'

function useSnek() {

    const [data, setData] = useState(snekData.body)
    const [direction, setDirection] = useState(snekData.initialDirection)
    const [selfCollision, setSelfCollision] = useState(false)
    const headPos = data[0].pos
    console.log(headPos)

    const dataRef = useRef(data);
    dataRef.current = data;
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

    function predictCollision(data) {
        const head = data[0].pos;
        for (let i = 1; i < data.length; i++) {
            const { x, y } = data[i].pos
            if (head.x === x && head.y === y) {
                return true;
            }
        }
        return false;
    }

    function move() {
        const moveDir = isOpposite(physicalDir.current, dirRef.current) ? physicalDir.current : dirRef.current;
        const data = dataRef.current
        const arr = data.map((block, index) => ({
            ...block,
            pos: index == 0 ? addDir(block.pos, moveDir) : { ...(data[index - 1].pos) }
        }))
        if (predictCollision(arr)) {
            setSelfCollision(true);
        } else {
            prevPos.current = headPos;
            setData(arr)
        }
    }

    function updateDirecton({ key }) {
        let { x, y } = direction;
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
        console.log('grow');
        setData(prevData => {
            return [...prevData, { ...prevData[prevData.length - 1] }]
        })
    }

    function reset() {
        const { body, initialDirection } = snekData;
        const headPos = body[0].pos;
        prevPos.current = addDir(headPos, { x: -initialDirection.x, y: -initialDirection.y })
        setSelfCollision(false)
        setData(body)
        setDirection(initialDirection)

    }

    useEffect(() => {
        document.addEventListener('keydown', updateDirecton)
        return () => {
            document.removeEventListener('keydown', updateDirecton)
        }
    }, [])

    return [data, grow, move, reset, selfCollision]
}
export default useSnek