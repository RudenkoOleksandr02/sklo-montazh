import React, {FC} from 'react';
import cl from './MarkdownWithStyle.module.css';
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

interface MarkdownWithStyleProps {
    content: string;
}

const MarkdownWithStyle: FC<MarkdownWithStyleProps> = ({content}) => {
    return (
        <div className={cl.wrapper}>
            <Markdown remarkPlugins={[remarkGfm]}>
                {content}
            </Markdown>
        </div>
    );
};

export default MarkdownWithStyle;