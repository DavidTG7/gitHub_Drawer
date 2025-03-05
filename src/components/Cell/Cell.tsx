import { useEffect, useState } from "react";
import styles from "./Cell.module.scss";

interface CellProps {
    id: number
    clicks: number
}

interface CellComponentProps {
    cellClicks: CellProps[]
    setCellClicks: React.Dispatch<React.SetStateAction<{ id: number; clicks: number }[]>>
}

const Cell = ({ cellClicks, setCellClicks }: CellComponentProps) => {

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

    const updateCellClicks = (id: number, action: "increment" | "decrement") => {
        setCellClicks((prev) =>
            prev.map((cell) =>
                cell.id === id
                    ? {
                        ...cell,
                        clicks:
                            action === "increment" && cell.clicks < 5
                                ? cell.clicks + 1
                                : action === "decrement" && cell.clicks > 1
                                    ? cell.clicks - 1
                                    : cell.clicks
                    }
                    : cell
            )
        )
    }

    const handleLeftClick = (id: number) => updateCellClicks(id, "increment");

    const handleRightClick = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        updateCellClicks(id, "decrement")
    }

    const handleMouseEnter = (id: number) => {
        if (!isMouseDown || mouseButton === null) return

        if (mouseButton === 0) {
            updateCellClicks(id, "increment")
        } else if (mouseButton === 2) {
            updateCellClicks(id, "decrement")
        }
    }

    return (
        <>
            <div
                className={`${styles.cell} ${styles[`level-${String(cellClicks[1].clicks)}`]}`}
                onClick={() => handleLeftClick(cellClicks[1].id)}
                onContextMenu={(e) => handleRightClick(e, cellClicks[1].id)}
                onMouseEnter={() => handleMouseEnter(cellClicks[1].id)}
            >
            </div>
        </>
    )
}

export default Cell;