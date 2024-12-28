import React, {FC} from 'react';
import cl from './BlogTiles.module.css';
import Tile from "./Tile";
import {useFetchAllBlogsQuery} from "../../../services/BlogService";
import Preloader from "../../ui/Preloader/Preloader";

const BlogTiles: FC = () => {
    const {data: blogTilesData, isLoading} = useFetchAllBlogsQuery('');

    return (
        <div className={cl.wrapper}>
            <h2>Блог</h2>
            {isLoading ? <div><Preloader/></div> : (
                <div className={cl.grid}>
                    {blogTilesData?.map((item) => (
                        <Tile
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            pre_description={item.pre_description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogTiles;