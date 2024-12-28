import React, {FC, ReactNode, useRef, useState} from 'react';
import cl from "./Tile.module.css";

interface TileProps {
    children: ReactNode;
}

const Tile: FC<TileProps> = ({children}) => {
    const [position, setPosition] = useState<{ left: number, top: number }>({ top: 0, left: 0 });
    const tileRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const tile = tileRef.current;
        if (tile) {
            const { left, top } = tile.getBoundingClientRect();
            const relX = e.clientX - left;
            const relY = e.clientY - top;
            setPosition({ top: relY, left: relX });
        }
    };

    return (
        <div
            className={cl.tile}
            ref={tileRef}
            onMouseMove={handleMouseMove}
        >
            <span
                className={cl.animateSpan}
                style={{top: `${position.top}px`, left: `${position.left}px`}}
            />
            <div className={cl.inner}>
                {children}
            </div>
        </div>
    );
};

export default Tile;