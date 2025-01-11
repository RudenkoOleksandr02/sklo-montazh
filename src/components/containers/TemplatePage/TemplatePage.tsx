import React, {FC} from 'react';
import cl from './TemplatePage.module.css';
import MainSection from "./MainSection";
import SEO from "../SEO/SEO";
import {Helmet, HelmetProvider} from "react-helmet-async";

interface TemplatePageProps {
    children: React.ReactNode;
    title: string;
    text: string;
    seoText?: string;
    seoDescription: string;
    seoKeywords: string;
}

const TemplatePage: FC<TemplatePageProps> = ({children, title, text, seoDescription, seoKeywords, seoText}) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description"
                      content={seoDescription}
                />
                <meta name="keywords"
                      content={seoKeywords}
                />
            </Helmet>
            <MainSection title={title} text={text}/>
            <div className={cl.sectionsWithDarkBG}>
                {children}
                {/*{seoText && (
                    <section>
                        <SEO text={seoText}/>
                    </section>
                )}*/}
            </div>
        </HelmetProvider>

    );
};

export default TemplatePage;