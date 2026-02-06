import React from 'react'

function Hearts({ number = 10 }: { number?: number }): React.ReactElement {
    const hearts = React.useMemo(() => 
        Array.from({ length: number }).map(() => ({
            left: `${Math.random() * 100}dvw`, // от 10 до 90
            top: `${Math.random() * 100}dvh`, // от 10 до 90
            rotate: `${Math.random() * 90 - 45}deg`, // от -45 до 45 градусов
            scale: `${Math.random() * 0.7 + 0.5}`, // от 0.5 до 1.2
            animationDelay: `${Math.random() * 3 - 3}s`, // от -3 до 3 секунд
        }))
    , [number])

    return (
        <main className="HeartsPage">
            {hearts.map((style, i) => ( // чтобы не обновлялись при каждом изменении состояния
                <img
                    key={i}
                    src="/heart.png"
                    className="heart"
                    style={style}
                />
            ))}
        </main>
    )
}

export default Hearts