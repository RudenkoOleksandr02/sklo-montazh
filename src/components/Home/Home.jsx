import React from "react";
import {Grid, Typography, Box} from "@mui/material";
import {useMediaQuery} from "@mui/material";
import Content from './Content/Content';
import showerImg1 from '../../images/shower/0feba0a96f81442828f079d02a8c1e71-q5jmojd3xzszi7popumxwoc0nu4sz07gjadmlevwco.webp';
import showerImg2 from '../../images/shower/Modo-X-Black-I-Frame-czarna-kabina-prysznicowa-szyba-prysznicowa-_-Radaway-q5jmon4gpbyp98wifyxwpr7vf82h3olkhahejh9apc.webp';
import mirrorImg1 from '../../images/mirror/Facett-Inbani-q5jmoun6808fdj9avzigqlhjsgl7jdg8ku7gcqf6a0.webp';
import mirrorImg2 from '../../images/mirror/Зеркальная-плитка_-стильные-идеи-для-интерьера-q5jmoqvtgo3ujor1u0kezq9psrjxyh0htt3cgl3q0g.webp';
import partitionImg1 from '../../images/partition/a7fd02c80af042def89ff69fc51aedc0-q5jmp33pxikkqm9aunuke56pirvpqjd07hknp6llrk.webp';
import partitionImg2 from '../../images/partition/dd39a164189466c8fc208a8a414bc4eb-q5jmoyeizcdknz3ua14z0kje602oe5v5xcte9u9ll4.webp';
import doorImg1 from '../../images/door/9a30c9e4e05fd27e6234b1a8b0aa6cd2-q5jmp6v2oupq123u8ph2o48jwbd6lbrxk06lmag12o.webp';
import doorImg2 from '../../images/door/edfdd124b5adcaa2c8b3e53140abe669-q5jmpamfg6uauwm3aof4ezgdw0eg687ob1apifrhc8.webp';
import shelfImg1 from '../../images/shelf/5c8b244b55ba30f4cb3af2b960d358c2-q5jmpeds7j00lxsx0sq382c8nec4awls91ehgi4vow.webp';
import shelfImg2 from '../../images/shelf/8f36efd018bb8dd590bf6e2a4ff7c82a-q5jmpi54yv4lfsb62ro4yxk2n3ddvt1j02ilcngbyg.webp';
import photoPrint1 from '../../images/photoPrinting/IMG_20170724_131305-scaled-q5jmi9rudr8qke5nn7sxtd3eh7gwxjb29raxfypcvk.webp';
import photoPrint2 from '../../images/photoPrinting/IMG_20170724_131320-scaled-q5jmieh1bxelpumjjp5m4q2p2adjq4ujcx2itdzeyw (1).webp';
import railingImg1 from '../../images/railing/IMG_20170724_131305-scaled-q5jmi9rudr8qke5nn7sxtd3eh7gwxjb29raxfypcvk (1).webp';
import railingImg2 from '../../images/railing/541b13c2dc4a5c36b3c8c4d7bff4cf94-q5jmppnuhjfgh9cj6xlm1zhrs0siv9ukal8b7to5m8.webp';


const Home = () => {
    const isMobileScreen = useMediaQuery('(max-width: 899px)');


    return <Box sx={{
        padding: '24px',
        maxWidth: '1250px',
        margin: 'auto'
    }}>
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography variant={isMobileScreen ? 'h5' : 'h3'} component='h1'>СКЛО МОНТАЖ</Typography>
                    <Typography variant='body2'>
                        Працюємо в Києві та Київській області
                    </Typography>
                    <Typography variant='body1' sx={{
                        margin: '8px 0'
                    }}>
                        Прозора якість, надійний монтаж - з нами ваше скло назавжди!
                    </Typography>
                </Box>
            </Grid>
            {!isMobileScreen && <Grid item md={6} xs={12}>
                <Typography>
                    Ласкаво просимо на наш сайт, наші робітники роблять монтаж душових кабін,
                    дзеркал та інших виробів зі скла.
                </Typography>
                <Typography sx={{
                    margin: '15px 0'
                }}>
                    Ми пропонуємо професійний та надійний сервіс з установки, заміни та ремонту скляних
                    конструкцій в вашому будинку, квартирі чи офісі. Наша команда досвідчених фахівців володіє
                    всіма необхідними знаннями та навичками, щоб виконати будь-який проект в строк та з високою
                    якістю.
                </Typography>
                <Typography>
                    Ми готові запропонувати вам широкий вибір душових кабін та дзеркал різних форм, розмірів та
                    дизайнів, щоб підібрати ідеальне рішення під ваші вимоги та смаки. Ми також готові надати
                    вам консультації з вибору найбільш підходящого варіанту для вашого будинку чи офісу.
                </Typography>
            </Grid>}
        </Grid>
        <Content img1={showerImg1}
                 img2={showerImg2}
                 alt='Душ'
                 title='Душові кабіни'
                 text='Душові кабіни зі скла є одним з найбільш елегантних і стильних варіантів для ванної кімнати.
                 Ми зазвичай робимо монтаж із закаленим склом, тобто обробленим спеціальною технологією, що
                 забезпечує його високу міцність і стійкість до пошкоджень.'
                 path='/showers'
                 direction='row'
        />
        <Content img1={mirrorImg1}
                 img2={mirrorImg2}
                 alt='Дзеркало'
                 title='Дзеркала з led підсвіткою та підігрівом'
                 text='Дзеркала з led підсвіткою та підігрівом є популярним вибором для ванних кімнат та
                 гардеробних. Вони забезпечують яскраве, природне світло для детального розгляду, а також підігрів
                 , що допомагає попередити замерзання і запотівання, які можуть бути неприємними та заважаючими
                 при дотриманні гігієнічних норм.'
                 path='/mirrors'
                 direction='row-reverse'
        />
        <Content img1={partitionImg1}
                 img2={partitionImg2}
                 alt='Скляні перегородки'
                 title='Скляні перегородки'
                 text='Скляні перегородки - конструкції зі скла з металевими елементами різного розміру та
                 оформлення, що використовуються для зонування офісів та кімнат у будинку, оформлення торгових
                 площ.'
                 path='/partitions'
                 direction='row'
        />
        <Content img1={doorImg1}
                 img2={doorImg2}
                 alt='Скляні двері'
                 title='Скляні двері'
                 text='Скляні двері є стильним та практичним рішенням для будь-якого приміщення, де важливо
                 створити відчуття простору та прозорості. Вони можуть бути використані в офісах, магазинах,
                 ресторанах, готелях, а також у приватних будинках та квартирах.'
                 path='/doors'
                 direction='row-reverse'
        />
        <Content img1={shelfImg1}
                 img2={shelfImg2}
                 alt='Полиці зі скла'
                 title='Полиці зі скла'
                 text='Полиці зі скла виглядають легко та повітряно, не захаращують простір.
                 Скляні полиці легко монтуються і не вимагають спеціальних засобів догляду. '
                 path='/shelves'
                 direction='row'
        />
        <Content img1={photoPrint1}
                 img2={photoPrint2}
                 alt='Фотодрук на склі'
                 title='Фотодрук на склі'
                 text='Фотодрук на склі – це найновіша технологія, що дозволяє досягти реалістичного зображення
                 та яскравих, насичених кольорів зображень на склі. Поверхнева поверхня та зовнішнє зображення
                 відсутній повітряний прошарок, що створює оптичну ілюзію живого зображення.'
                 path='/photo_printings'
                 direction='row-reverse'
        />
        <Content img1={railingImg1}
                 img2={railingImg2}
                 alt='Скляні перила'
                 title='Скляні перила'
                 text='Скляні перила - це стильний та безпечний елемент дизайну будівель та інших споруд,
                 що надає їм сучасного вигляду та забезпечує безпеку для користувачів. Вони можуть бути виготовлені
                 з різних матеріалів, таких як закалене скло, ламіноване скло, скло з плівкою або комбіновані
                 матеріали.'
                 path='/railings'
                 direction='row'
        />
    </Box>
}

export default Home;
