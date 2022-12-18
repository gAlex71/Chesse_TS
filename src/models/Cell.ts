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

    //Ячейка, на которую мы хотим переместить фигуру
    moveFigure(target: Cell){
        //Если на этой ячейке есть фигура и canMove = true, тогда будем перемещать фигуру
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target)
            //Удаляем фигуру с текущей ячейки, и перемещаем на target ячейку
            target.figure = this.figure
            this.figure = null
        }
    }
}