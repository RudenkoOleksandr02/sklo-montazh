import React, {FC} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";
import OurServicesSection from "./sections/OurServicesSection";
import CallToActionSection from "./sections/CallToActionSection";
import QuestionsSection from "./sections/QuestionsSection";
import {useFetchSeoQuery} from "../../services/SeoService";

const Services: FC = () => {
    const {data} = useFetchSeoQuery('/catalog-seo');

    const text = `Наша команда спеціалізується на професійному монтажі скляних конструкцій: 
    душових кабін, дзеркал з LED-підсвіткою та підігрівом, скляних дверей, полиць, перегородок, 
    перил, а також фотодруку на склі. Ми використовуємо сучасні технології та обладнання,
    щоб кожен проєкт відповідав найвищим стандартам якості, стилю та функціональності.`;

    return (
        <TemplatePage
            title="Послуги"
            text={text}
            seoDescription={data?.description || ''}
            seoKeywords={data?.keywords || ''}
            seoText={data?.text || ''}
        >
            <OurServicesSection/>
            <CallToActionSection/>
            <QuestionsSection/>
        </TemplatePage>
    );
};

export default Services;