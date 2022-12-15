import { Cell } from "./Cell";
import { Colors } from "./Colors";

export class Board {
    cells: Cell[][] = []

    public initCells(){
        for(let i = 0; i < 8; i++){ //Формирование доски из строк
            const row: Cell[] = [] //Одномерный массив ячеек
            for(let j = 0; j < 8; j++){ //Формирование строки
                if((i + j) % 2 !== 0){
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) //Добавляем черные ячейки
                }else{
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) //Добавляем белые ячейки
                }
            }
            //Добавляем строку в двумерный массив
            this.cells.push(row)
        }
    }
}