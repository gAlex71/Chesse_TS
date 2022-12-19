import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; //Может ли переместиться фигура
    id: number; //Для ключей

    //Принимаем аргументы вызова в конструктор
    //Инициализируем свойства в конструкторе
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null){
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.board = board
        this.available = false
        this.id = Math.random()
    }

    isEmpty(){
        //Если ячейка свободна
        return this.figure === null
    }

    //Пустая ли вертикаль
    isEmptyVertical(target: Cell): boolean{
        //Если столбец не совпадает
        if(this.x !== target.x){
            return false
        }
        //Находим минимальную и максимальную координаты по вертикали
        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for(let y = min + 1; y < max; y++){
            //Если ячейка не пустая
            if(!this.board.getCell(this.x, y).isEmpty()){
                return false
            }
        }
        return true
    }

    //Пустая ли горизонталь
    isEmptyHorizontal(target: Cell): boolean{
        //Если строка не совпадает
        if(this.y !== target.y){
            return false
        }
        //Находим минимальную и максимальную координаты по вертикали
        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for(let x = min + 1; x < max; x++){
            //Если ячейка не пустая
            if(!this.board.getCell(x, this.y).isEmpty()){
                return false
            }
        }
        return true
    }

    //Пустая ли диагональ
    isEmptyDiagonal(target: Cell): boolean{
        //При диагонали разница по x -y одинакова(abs - модуль)
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if(absX !== absY){
            return false
        }

        //Убеждаемся, что диагональ пустая
        const dx = this.x < target.x ? 1 : -1
        const dy = this.y < target.y ? 1 : -1
        //Если ячейка не пустая
        for(let i = 1; i < absY; i++){
            if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty()){
                return false
            }
        }
        return true
    }

    //Меняем фигуру для самой ячейки
    setFigure(figure: Figure){
        this.figure = figure
        //У ячейки, на которую смотрит фигура меняем на this
        this.figure.cell = this
    }

    //Ячейка, на которую мы хотим переместить фигуру
    moveFigure(target: Cell){
        //Если на этой ячейке есть фигура и canMove = true, тогда будем перемещать фигуру
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target)
            //Удаляем фигуру с текущей ячейки, и перемещаем на target ячейку
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}