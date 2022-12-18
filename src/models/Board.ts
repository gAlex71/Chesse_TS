import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

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

    public getCell(x: number, y: number){
        //Возвращаем результирующий элемент из двумерного массива
        //y - вертикальная координата
        return this.cells[y][x]
    }

    public getCopyBoard(): Board{
        const newBoard = new Board()
        //Переносим ячейки в новый объект доски
        newBoard.cells = this.cells
        return newBoard
    }

    public availableCells(selectedCell: Cell | null){
        //Проходимся по всем ячейкам
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i]
            for(let j = 0; j < row.length; i++){
                //Потенциальная ячейка
                const target = row[j]
                //Равна ли эта ячейка той, на которую мы можем походить
                //С помощью '!!' - преобразовываем в boolean
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    //Добавление типов фигур на доску
    //Это приватные методы, так как будут использоваться только внутри класса
    private addBishop(){
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }

    private addKing(){
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addKnight(){
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    private addPawn(){
        for(let i = 0; i < 8; i++){
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addQueen(){
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addRook(){
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }


    public addFigures(){
        // new Queen(Colors.WHITE, this.getCell(1, 3))
        this.addBishop()
        this.addKing()
        this.addKnight()
        this.addPawn()
        this.addQueen()
        this.addRook()
    }
}