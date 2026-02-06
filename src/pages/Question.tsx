import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Hearts from '../components/hearts'

// https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7JxkeTsGxhxr2BVWLEnkyvmfeJrVsQsqTq7yKzhOcCysrQA/formResponse

// entry.354685551=action
// entry.951999096=timestamp
// entry.1382923659=quantity of clicks

function Question(): React.ReactElement {
    const [noText, setNoText] = useState('Нет 😢')
    const [size, setSize] = useState(1);
    const [count, setCount] = useState(0);
    const yesBtnRef = useRef<HTMLButtonElement>(null)
    const noBtnRef = useRef<HTMLButtonElement>(null)

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
                }
                return noTexts[nextIndex];
            });
        }
    }

    const clickYesBtn = (): void => {
        sendData().then(() => navigate('/thank')); // игнорируем результат
        return;
    }

    const clickNoBtn = () => {
        setCount(count + 1);
        changeNoText()
        if (yesBtnRef.current && noBtnRef.current) {
            setSize(prev => prev + 1);
        }
    }

    const sendData = async (): Promise<void> => {
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSf7JxkeTsGxhxr2BVWLEnkyvmfeJrVsQsqTq7yKzhOcCysrQA/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'entry.354685551': "yes", // button
                'entry.1382923659': String(count), // count
                'entry.951999096': new Date().toISOString(), // time
            }),
        });
        return;
    }

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
            </div>
            <Hearts number={3} />
        </main>
    )
}

export default Question