import styles from "./Cell.module.scss";

const Cell = ({ handlePlus, handleMinus, cellClicks, handleMouseDown, handleMouseUp }: any) => {
    console.log(String(cellClicks.clicks));

    return (
        <div
            className={`${styles.cell} ${styles[`level-${String(cellClicks.clicks)}`]}`}
            onClick={handlePlus}
            onContextMenu={handleMinus}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
        </div>
    )
}

export default Cell;