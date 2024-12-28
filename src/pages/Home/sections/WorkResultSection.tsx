import React, {FC} from 'react';
import cl from "../Home.module.css";
import BlockBlurredBackground from "../../../components/ui/BlockContent/BlockContent";

const WorkResultSection: FC = () => {
    const workResult: {id: number, count: string, desc: string}[] = [
        {id: 1, count: '1k', desc: 'Виконаних проектів'},
        {id: 2, count: '12', desc: 'Років роботи'},
        {id: 3, count: '43', desc: 'Щасливі клієнти'},
        {id: 4, count: '6', desc: 'Областей'},
    ]

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