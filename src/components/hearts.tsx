import React, { useState, useEffect } from "react";

type HeartStyle = {
    id: string;
    style: {
        left: string;
        animationDuration: string;
        transform?: string;
    };
    src: string;
};

function Hearts({ number = 10 }: { number?: number }): React.ReactElement {
    const [hearts, setHearts] = useState<HeartStyle[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHearts(prev => {
                if (prev.length >= number) return prev;

                const id =
                    typeof crypto !== "undefined" && "randomUUID" in crypto
                        ? crypto.randomUUID()
                        : Math.random().toString(36).slice(2);

                const duration = Math.random() * 3 + 2;

                const newHeart: HeartStyle = {
                    id,
                    style: {
                        left: `${Math.random() * 100}vw`,
                        animationDuration: `${duration}s`,
                        transform: `scale(${Math.random() * 0.4 + 0.9})`, // Случайный размер от 0.9 до 1.5
                    },
                    src: `/hearts/heart${Math.ceil(Math.random() * 2)}.png`, // Случайный сердечко от 1 до 3
                };

                setTimeout(() => {
                    setHearts(p => p.filter(h => h.id !== id));
                }, duration * 1000);

                return [...prev, newHeart];
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [number]);

    return (
        <div className="HeartsPage">
        {hearts.map(heart => (
            <img
                key={heart.id}
                src={heart.src || "/hearts/heart1.png"}
                className="heart"
                style={heart.style}
                alt=" "
            />
        ))}
        </div>
    );
}

export default Hearts;
