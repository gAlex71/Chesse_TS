import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

//Ожидаемый пропс на вход
interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        //Если ячейка, на которой стоит фигура не равняется ячейке, на которую мы хотим нажать, и при этом canMove = true для этой ячейки
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            //Перемещаем фигуру
            selectedCell.moveFigure(cell)
            //Переключаем игрока
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        }else{
            if(cell.figure?.color === currentPlayer?.color){
            //Если ячейка содержит фигуру, то изменяем состояние
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        availableCells()
    }, [selectedCell])

    //Подсвечивание ячеек, в которые возможен вход
    function availableCells(){
        board.availableCells(selectedCell)
        updateBoard()
    }

    //Чтобы компонент перерисоваля при подсвечивании ячеек, создаем копию доски, и ее отображаем
    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return(
        <div>
            <h2>Ход игрока {currentPlayer?.color}</h2>
            <div className='board'>
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell => 
                            <CellComponent
                                click={click}
                                key={cell.id}
                                cell={cell}
                                //Если выбранная координата совпадает с координатой ячейки
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent