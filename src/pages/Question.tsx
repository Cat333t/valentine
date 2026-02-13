import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Hearts from '../components/hearts'

// https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7JxkeTsGxhxr2BVWLEnkyvmfeJrVsQsqTq7yKzhOcCysrQA/formResponse

// entry.354685551=action
// entry.951999096=timestamp
// entry.1382923659=quantity of clicks

function Question(): React.ReactElement {
    const [arrowStyle, setarrowStyle] = useState<{left: number, top: number, display?: string} | null>(null);
    const [noText, setNoText] = useState('Нет 😢')
    const [size, setSize] = useState(1);
    const [count, setCount] = useState(0);
    const yesBtnRef = useRef<HTMLButtonElement>(null)
    const noBtnRef = useRef<HTMLButtonElement>(null)
    const loaderRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const noTexts = [
        'Ты уверена? 😢',
        'точно нет? 🥹',
        'Ну пожалуйста 🙏',
        'Я так старался... 😞',
        'Сделай это ради меня 🥲',
        'Пожалуйста скажи Да 🥺',
        'Я не могу без тебя 😭',
        'Я обещаю быть лучшим 🌟',
        'Пожалуйста не отказывай мне 🙏',
        'Я не могу без тебя, ты моя любовь! 😘'
    ]

    const changeNoText = (): void => {
        if (noBtnRef.current) {
            setNoText(prev => {
                const currentIndex = Math.max(noTexts.indexOf(prev), 0);
                const nextIndex = currentIndex + 1;
                if (nextIndex >= noTexts.length) {
                    noBtnRef.current!.style.display = 'none';
                    yesBtnRef.current!.classList.add('big');
                    return prev;
                }
                return noTexts[nextIndex];
            });
        }
    }

    const changeNoBtnPosition = (): void => {
        if (yesBtnRef.current && noBtnRef.current) {
            const yesRect = yesBtnRef.current.getBoundingClientRect(); // Получаем прямоугольник кнопки "Да"
            // const noRect = noBtnRef.current.getBoundingClientRect(); // Получаем прямоугольник кнопки "Нет"

            // Вычисляем новое положение для кнопки "Нет" (например, сверху от кнопки "Да")
            const newLeft = yesRect.left + (yesRect.width - noBtnRef.current.offsetWidth) / 2 + (Math.random() * 200 - 100); // Случайное смещение по горизонтали от -100px до +100px
            const newTop = yesRect.top + yesRect.height + 10; // 10px отступ сверху

            // Устанавливаем новое положение для кнопки "Нет"
            noBtnRef.current.style.position = 'absolute';
            noBtnRef.current.style.left = `${newLeft}px`;
            noBtnRef.current.style.top = `${newTop}px`;
        }
    }

    const clickYesBtn = (): void => {
        sendData().then(() => navigate('/thank'));
        return;
    }

    const clickNoBtn = () => {
        setCount(prev => prev + 1);
        changeNoText()
        changeNoBtnPosition();
        if (yesBtnRef.current && noBtnRef.current) {
            setSize(prev => prev + 1);
        }
    }

    const sendData = async (): Promise<void> => {
        // add mini-loader
        if (loaderRef.current) {
            loaderRef.current.style.display = 'flex';
        }

        const now = new Date();

        const year = now.getFullYear();
        const month = (`0${now.getMonth() + 1}`).slice(-2);
        const day = (`0${now.getDate()}`).slice(-2);

        const hours = (`0${now.getHours()}`).slice(-2);
        const minutes = (`0${now.getMinutes()}`).slice(-2);
        const seconds = (`0${now.getSeconds()}`).slice(-2);

        console.log(`${day}.${month}.${year} ${hours}:${minutes}:${seconds}`);

 
        await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7JxkeTsGxhxr2BVWLEnkyvmfeJrVsQsqTq7yKzhOcCysrQA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'entry.354685551': "yes", // button
                'entry.1382923659': String(count), // count
                'entry.951999096': `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`, // time
            }),
        });
        return;
    }

    useEffect(() => {
        if (yesBtnRef.current) {
            const rect = yesBtnRef.current.getBoundingClientRect();
            setarrowStyle({
                left: rect.left + rect.width / 2,
                top: rect.top + rect.height + 5,
                display: 'block',
            });
        }
    }, []);

    return (
        <main className="ThankPage">
            <div className="container">
                <h1>Ты будешь моей валентинкой? 💌</h1>
                <div className="buttons">
                    <button 
                        onClick={clickYesBtn} 
                        id="yesBtn" 
                        ref={yesBtnRef}
                        style={{'--size': size} as React.CSSProperties}
                    >
                        Да! 💍
                    </button>
                    <button onClick={clickNoBtn} id="noBtn" ref={noBtnRef}>{noText || 'Нет 😢'}</button>
                </div>
                <img 
                    src="/arrow.png" 
                    alt="Скажи да🙏🏻" 
                    className='arrow' 
                    style={arrowStyle || undefined}
                />
            </div>
            <div className="loader-container" ref={loaderRef}></div>
            <Hearts number={3} />
        </main>
    )
}

export default Question