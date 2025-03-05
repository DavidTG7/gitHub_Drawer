import { useState } from "react";
import Cell from "./components/Cell/Cell";

const App = () => {
  const [cellClicks, setCellClicks] = useState<{ id: number, clicks: number }[]>([
    { id: 1, clicks: 1 },
    { id: 2, clicks: 1 }
  ]);

  return (
    <>
      Hello App!
      <Cell
        cellClicks={cellClicks}
        setCellClicks={setCellClicks}
      />
    </>
  )
}

export default App;
