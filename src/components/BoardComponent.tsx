import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

//Ожидаемый пропс на вход
interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const clickCell = (cell: Cell) => {
        //Если ячейка, на которой стоит фигура не равняется ячейке, на которую мы хотим нажать, и при этом canMove = true для этой ячейки
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
        }else{
        //Если ячейка содержит фигуру, то изменяем состояние
            setSelectedCell(cell)
        }
    }

    useEffect(() => {
        availableCells()
    }, [selectedCell])

    //Подсвечивание ячеек, в которые возможен вход
    const availableCells = () => {
        board.availableCells(selectedCell)
        updateBoard()
    }

    //Чтобы компонент перерисоваля при подсвечивании ячеек, создаем копию доски, и ее отображаем
    const updateBoard = () => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return(
        <div className='board'>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell => 
                        <CellComponent
                            click={clickCell}
                            key={cell.id}
                            cell={cell}
                            //Если выбранная координата совпадает с координатой ячейки
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default BoardComponent