import { useState } from 'react'
import SnekData from '../InitialSnekData'
function useSnek() {
    const [data, setData] = useState(SnekData)

    return [data]
}
export default useSnek