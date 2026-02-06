import React from 'react'
import { Link } from 'react-router-dom'

import Hearts from '../components/hearts'

function Question(): React.ReactElement {
    return (
        <main className="HomePage">
            <div className="container">
                <img src="/peach2.gif" className='gif' />

                <h1>С 14 февраля моя любимая! ❤️</h1>

                <div className="text">
                    <p>
                        Люблю тебя очень сильно зая! Спасибо что ты есть в моей жизни! Я не представляю жизнь без тебя. 
                        Пусть наша любовь будет вечной. Ты мое счастье! 💗
                    </p>
                </div>

                <Link to='/question' className="homeLink">Продолжить</Link>
            </div>

            <p className="author">Сделано с 💗 от Кости для Ники</p>

            <Hearts number={(Math.random() * 5 + 15)} /> {/* от 15 до 20 */}
        </main>
    )
}

export default Question