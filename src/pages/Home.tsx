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
                        Ты самая яркая и лучшая что случалось в моей жизни!
                        Я так счастлив что ты есть у меня. Ты мое солнышко, моя радость и счастье. 💗
                        Я так тебя люблю. И хочу провести с тобой всю свою жизнь. 💍
                    </p>
                </div>

                <Link to='/question' className="link-btn">Продолжить</Link>
            </div>
            <Hearts number={Math.round(Math.random() * 20 + 30)} />
        </main>
    )
}

export default Question