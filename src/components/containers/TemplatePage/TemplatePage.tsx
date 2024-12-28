import React, {FC} from 'react';
import cl from './TemplatePage.module.css';

interface TemplatePageProps {
    children: React.ReactNode;
}

const TemplatePage: FC<TemplatePageProps> = ({children}) => {
    return (
        <div className={cl.wrapper}>
            
        </div>
    );
};

export default TemplatePage;