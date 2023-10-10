import ReactMarkdown from "react-markdown";
import {Box, Breadcrumbs, CircularProgress, Paper, Typography} from "@mui/material";
import {connect} from "react-redux";
import {getContent} from "../../store/order-reducer";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import s from "../common/Link/Link.module.css";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Order = ({content, getContent}) => {
    useEffect(() => {
        getContent()
    }, [])

    return <HelmetProvider>
        <>
            <Helmet>
                <meta name="description"
                      content="Інформація про оплату та доставку замовлень в нашій компанії. Ми пропонуємо високоякісні продукти та розглядаємо індивідуальні потреби клієнтів. Дізнайтеся більше про наші ціни, варіанти оплати та умови доставки. Зверніться до нас для отримання індивідуальної консультації."
                />
                <meta name="keywords"
                      content="оплата, доставка, високоякісні продукти, ціни, варіанти оплати, умови доставки, консультація"
                />
            </Helmet>
            <Box sx={{
                padding: '24px'
            }}>
                <Breadcrumbs aria-label='breadcrumbs' sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    fontSize: '14px'
                }}>
                    <Link to='/home' className={s.item}>Головна</Link>
                    <Typography sx={{
                        fontSize: '14px'
                    }}>Оплата і доставка</Typography>
                </Breadcrumbs>
                <Box>
                    <Typography variant='h5' component='h2' sx={{
                        textAlign: 'center',
                        margin: '16px 0'
                    }}>Оплата і доставка</Typography>
                </Box>
                {!content
                    ? <CircularProgress sx={{
                        display: 'block',
                        margin: '16px auto'
                    }}/>
                    : <Paper elevation={2} sx={{
                        padding: '2px 6px'
                    }}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </Paper>
                }
            </Box>
        </>
    </HelmetProvider>
}

const mapStateToProps = (state) => {
    return {
        content: state.order.content
    }
}
export default connect(mapStateToProps, {getContent})(Order);
