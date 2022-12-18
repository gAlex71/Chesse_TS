import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps{
    cell: Cell;
    selected: boolean;
    //Функция ничего не возвращает(void)
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return(
        //Объединяем два класса в одну строку
        <div 
            onClick={() => click(cell)}
            className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
            style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    )
}

export default CellComponent