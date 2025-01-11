import React, {FC} from 'react';
import cl from './Home.module.css';
import MainSection from "./sections/MainSection";
import OurServicesSection from "./sections/OurServicesSection";
import WorkResultSection from "./sections/WorkResultSection";
import ReviewsSection from "./sections/ReviewsSection";
import CallToActionSection from "./sections/CallToActionSection";
import BlogSection from "./sections/BlogSection";
import RoadMapSection from "./sections/RoadMapSection";
import QuestionsSection from "./sections/QuestionsSection";
import SeoSection from "./sections/SeoSection";
import {useFetchSeoQuery} from "../../services/SeoService";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Home: FC = () => {
    const {data} = useFetchSeoQuery('/seo');

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description"
                      content={data?.description || ''}
                />
                <meta name="keywords"
                      content={data?.keywords || ''}
                />
            </Helmet>
            <div className={cl.wrapper}>
                <MainSection/>
                <RoadMapSection/>
                <div className={cl.sectionsWithDarkBG}>
                    <OurServicesSection/>
                    <WorkResultSection/>
                    <ReviewsSection/>
                    <CallToActionSection/>
                    <BlogSection/>
                    <QuestionsSection/>
                    {/*<SeoSection text={data?.text || ''}/>*/}
                </div>
            </div>
        </HelmetProvider>
    );
};

export default Home;