import React, {FC, useState} from 'react';
import SEO from "../../../components/containers/SEO/SEO";

interface SeoSectionProps {
    text: string;
}

const SeoSection: FC<SeoSectionProps> = ({text}) => {


    return (
        <section>
            <SEO text={text}/>
        </section>
    );
};

export default SeoSection;