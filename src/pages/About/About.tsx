import React, {FC} from 'react';
import TemplatePage from "../../components/containers/TemplatePage/TemplatePage";

const About: FC = () => {
    const text = `Ми — команда професіоналів, яка спеціалізується на створенні стильних та 
    функціональних рішень зі скла. Наша мета — дарувати вам комфорт, естетику та довговічність кожного виробу.`

    return (
        <TemplatePage title='Про нас' text={text} seoDescription={''} seoKeywords={''}>
            <span></span>
        </TemplatePage>
    );
};

export default About;