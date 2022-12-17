import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps{
    cell: Cell
}

const CellComponent: FC<CellProps> = ({cell}) => {
    return(
        //Объединяем два класса в одну строку
        <div className={['cell', cell.color].join(' ')}>
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    )
}

export default CellComponent