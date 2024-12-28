import React, {FC} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";
import {useFetchSeoQuery} from "../../services/SeoService";
import BlogSection from "./sections/BlogSection";
import CallToActionSection from "./sections/CallToActionSection";
import QuestionsSection from "./sections/QuestionsSection";

const Blogs: FC = () => {
    const {data} = useFetchSeoQuery('blogs-seo')
    const text = `Ласкаво просимо до нашого блогу! Тут ви знайдете корисну інформацію та натхнення для створення
                  стильного і функціонального інтер’єру з використанням скляних елементів. Ми пропонуємо ідеї та
                  поради, які допоможуть вам зробити правильний вибір і створити простір вашої мрії.`;

    return (
        <TemplatePage title='Блог' text={text} seoText={data?.text || ''} seoKeywords={data?.keywords || ''}
                      seoDescription={data?.description || ''}>
            <BlogSection/>
            <CallToActionSection/>
            <QuestionsSection/>
        </TemplatePage>
    );
};

export default Blogs;