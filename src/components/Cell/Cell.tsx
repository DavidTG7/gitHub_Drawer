import styles from "./Cell.module.scss";

const Cell = ({ cellClicks, setCellClicks, isMouseDown, mouseButton }: {
    cellClicks: { id: number; clicks: number }[]
    setCellClicks: React.Dispatch<React.SetStateAction<{ id: number; clicks: number }[]>>
    isMouseDown: boolean
    mouseButton: number | null
}) => {

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
        if (mouseButton === 0) updateCellClicks(id, "increment")
        if (mouseButton === 2) updateCellClicks(id, "decrement")
    }

    return (
        <>
            {cellClicks.map((cell) =>
                <div
                    key={cell.id}
                    className={`${styles.cell} ${styles[`level-${String(cell.clicks)}`]}`}
                    onClick={() => handleLeftClick(cell.id)}
                    onContextMenu={(e) => handleRightClick(e, cell.id)}
                    onMouseEnter={() => handleMouseEnter(cell.id)}
                >
                </div>
            )}
        </>
    )
}

export default Cell;