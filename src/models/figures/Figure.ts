import { Colors } from "../Colors";
import logo from "../../assets/black-bishop.png";
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell){
        this.color = color;
        this.cell = cell;
        //На ячейку сразу добавляем фигуру в качестве текущего объекта
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    //Может ли фигура двигаться в ячейку, или нет
    canMove(target: Cell) :boolean{
        //Проверка цвета
        if(target.figure?.color === this.color){
            return false
        }
        //Проверка на короля, его мы съесть не можем
        if(target.figure?.name === FigureNames.KING){
            return false
        }
        //Остальную логику мы будем определять в дочерних классах
        return true
    }
    
    //Перемещение фигуры
    moveFigure(target: Cell){

    }
}