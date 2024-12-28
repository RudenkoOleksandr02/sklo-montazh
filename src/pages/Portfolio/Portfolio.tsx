import React, {FC} from 'react';
import {useFetchShowerImagesQuery} from "../../services/PortfolioService";
import CallToActionSection from "./sections/CallToActionSection";
import QuestionsSection from "./sections/QuestionsSection";
import ImagesSection from "./sections/ImagesSection";
import {useFetchSeoQuery} from "../../services/SeoService";
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";

const Portfolio: FC = () => {
    const {data: images, isLoading} = useFetchShowerImagesQuery('');
    const {data} = useFetchSeoQuery('/portfolio-seo');

    const text = `Ми створюємо унікальні скляні рішення, які поєднують якість, стиль і сучасні технології. У цій
        галереї представлені наші реалізовані проєкти: душові кабіни, дзеркала, скляні полиці, фотодрук
        на склі, перила, перегородки та двері.`;

    return (
        <TemplatePage
            title='Портфоліо'
            text={text}
            seoText={data?.text || ''}
            seoDescription={data?.description || ''}
            seoKeywords={data?.keywords || ''}
        >
            <ImagesSection images={images ? images : null} isLoading={isLoading}/>
            <CallToActionSection/>
            <QuestionsSection/>
        </TemplatePage>
    );
};

export default Portfolio;