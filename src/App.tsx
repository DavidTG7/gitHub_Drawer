import { useState } from "react";
import Cell from "./components/Cell/Cell";

const App = () => {
  const [cellClicks, setCellClicks] = useState({
    id: new Date(),
    clicks: 1
  })

  const [pressTimeout, setPressTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);


  console.log(cellClicks);

  const handlePlus = () => {
    if (cellClicks.clicks < 5) {
      setCellClicks(prev => ({ ...prev, clicks: prev.clicks + 1 }))
    }
  }

  const handleMinus = (e: any) => {
    e.preventDefault()
    if (cellClicks.clicks > 1) {
      setCellClicks(prev => ({ ...prev, clicks: prev.clicks - 1 }))
    }
  }



  const handleMouseDown = (e: React.MouseEvent) => {
    const timeout = setTimeout(() => {
      setCellClicks((prev) => ({
        ...prev,
        clicks: e.button === 0 ? 5 : 1
      }))
      setPressTimeout(null)
    }, 1000)

    setPressTimeout(timeout)
  }

  const handleMouseUp = () => {
    if (pressTimeout) {
      clearTimeout(pressTimeout)
      setPressTimeout(null)
    }
  }


  return (
    <>
      Hello App!
      <Cell
        handlePlus={handlePlus}
        handleMinus={handleMinus}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        cellClicks={cellClicks}
      />
    </>
  )
}

export default App;
