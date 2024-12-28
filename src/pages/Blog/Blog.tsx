import React, {FC, useEffect, useState} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";
import cl from './Blog.module.css';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import QuestionsSection from "./QuestionsSection";
import {useFetchAllBlogsQuery} from "../../services/BlogService";
import {IBlog} from "../../types";
import {useParams} from "react-router-dom";

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
            <section className={cl.content}>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {blog?.text || ''}
                </Markdown>
            </section>
            <QuestionsSection/>
        </TemplatePage>
    );
};

export default Blog;