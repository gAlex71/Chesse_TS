import React, {FC, useEffect, useRef, useState} from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps{
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [whiteTime, setWhiteTime] = useState(300);
    const [blackTime, setBlackTime] = useState(300);
    //Получаем тип из использумего элемента
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer()
    }, [currentPlayer]);

    function startTimer(){
        //Если в интервале есть таймер, обнуляем его
        if(timer.current){
            clearInterval(timer.current)
        }
        //Логика таймера
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer(){
        setBlackTime(prev => prev - 1)
    }
    function decrementWhiteTimer(){
        setWhiteTime(prev => prev - 1)
    }

    function handleRestart(){
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return(
        <div>
            <div>
                <button onClick={handleRestart}>Restart Game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    )
}

export default Timer;