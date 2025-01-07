import React, {FC} from 'react';
import cl from "../Home.module.css";
import BlockBlurredBackground from "../../../components/ui/BlockContent/BlockContent";

const WorkResultSection: FC = () => {
    const workResult: {id: number, count: string, desc: string}[] = [
        {id: 1, count: '200+', desc: 'Виконаних проектів'},
        {id: 2, count: '5', desc: 'Років успішної роботи'},
        {id: 3, count: '98%', desc: 'Завершених проєктів вчасно'},
        {id: 4, count: '20%', desc: 'Вигідніше, ніж у конкурентів'},
    ];

    return (
        <section className={cl.sectionWorkResult}>
            <BlockBlurredBackground>
                <div className={cl.workResult}>
                    {workResult.map(item => (
                        <div key={item.id}>
                            <span>{item.count}</span>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </BlockBlurredBackground>
        </section>
    );
};

export default WorkResultSection;