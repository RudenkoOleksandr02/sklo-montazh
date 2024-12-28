import React, { FC, useRef, useState } from 'react';
import { IBlogTile } from "../../../types";
import cl from './BlogTiles.module.css';
import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg';
import {useNavigate} from "react-router-dom";

interface IBlogTilesProps extends IBlogTile {

}

const Tile: FC<IBlogTilesProps> = ({ title, pre_description, id }) => {
    const [position, setPosition] = useState<{ left: number, top: number }>({ top: 0, left: 0 });
    const tileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
            onClick={() => navigate(`/blog/${id}`)}
        >
            <span
                className={cl.animateSpan}
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
            />
            <div className={cl.inner}>
                <h4>{title}</h4>
                <p>{pre_description}</p>
            </div>
            <div className={cl.dateWithArrow + ' ' + cl.inner}>
                <Arrow />
            </div>
        </div>
    );
};

export default Tile;
