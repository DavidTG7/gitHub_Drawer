import { useEffect, useState } from "react";
import Cell from "./components/Cell/Cell";

const App = () => {
  const [cellClicks, setCellClicks] = useState<{ id: number, clicks: number }[]>([
    {
      id: 1,
      clicks: 1
    },
    {
      id: 2,
      clicks: 1
    }
  ]);

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [mouseButton, setMouseButton] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true)
      setMouseButton(e.button)
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
      setMouseButton(null)
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      Hello App!
      <Cell
        cellClicks={cellClicks}
        setCellClicks={setCellClicks}
        isMouseDown={isMouseDown}
        mouseButton={mouseButton}
      />
    </>
  )
}

export default App;
