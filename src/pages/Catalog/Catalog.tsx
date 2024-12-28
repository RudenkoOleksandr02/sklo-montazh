import React, {FC} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";
import OurServicesSection from "./sections/OurServicesSection";
import CallToActionSection from "./sections/CallToActionSection";
import QuestionsSection from "./sections/QuestionsSection";
import {useFetchSeoQuery} from "../../services/SeoService";

const Catalog: FC = () => {
    const {data} = useFetchSeoQuery('/catalog-seo');

    const text = `Тут зібрано найкращі рішення для створення сучасного інтер’єру зі скляними елементами. 
    Кожна позиція – це поєднання естетики, функціональності та надійності. Ми дбаємо про те, щоб ваш вибір 
    був максимально простим і зрозумілим. Ознайомтесь із нашим асортиментом та оберіть ідеальне рішення 
    для вашого простору.`;

    return (
        <TemplatePage
            title="Каталог"
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

export default Catalog;