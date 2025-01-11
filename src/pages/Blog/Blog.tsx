import React, {FC, useEffect, useState} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";
import cl from './Blog.module.css';
import QuestionsSection from "./QuestionsSection";
import {useFetchAllBlogsQuery} from "../../services/BlogService";
import {IBlog} from "../../types";
import {useParams} from "react-router-dom";
import Preloader from "../../components/ui/Preloader/Preloader";
import MarkdownWithStyle from "../../components/containers/MarkdownWithStyle/MarkdownWithStyle";

type Params = {
    id: string;
}

const Blog: FC = () => {
    const {data} = useFetchAllBlogsQuery('');
    const {id} = useParams<Params>();
    const [blog, setBlog] = useState<IBlog | null>(null);

    useEffect(() => {
        data?.forEach(item => {
            if (String(item.id) === id) setBlog(item);
        })
    }, [id, data]);

    return (
        <TemplatePage title={blog?.title || ''}
                      text={blog?.description || ''}
                      seoDescription={blog?.meta_description || ''}
                      seoKeywords={blog?.meta_keys || ''}>
            {!blog ? <Preloader/> : (
                <section className={cl.content}>
                    <div className={cl.video}>
                        <video controls width="100%" height='500px'>
                            <source src={blog?.video} type="video/mp4"/>
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>
                    <MarkdownWithStyle content={blog?.text || ''}/>
                </section>
            )}
            <QuestionsSection/>
        </TemplatePage>
    );
};

export default Blog;