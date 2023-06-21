import {Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import s from "../../common/Link/Link.module.css";

const Products = () => {
    return <Stack direction='column' spacing={0.5}>
        <Typography sx={{
            fontWeight: 'bold'
        }}>Товари</Typography>
        <Link to='/shower' className={s.item}>Душові кабіни та огорожі</Link>
        <Link to='/mirror' className={s.item}>Дзеркала</Link>
        <Link to='/partition' className={s.item}>Скляні перегородки</Link>
        <Link to='/door' className={s.item}>Скляні двері</Link>
        <Link to='/shelf' className={s.item}>Полиці зі скла</Link>
        <Link to='/photoPrinting' className={s.item}>Фотодрук на склі</Link>
        <Link to='/railing' className={s.item}>Перила</Link>
    </Stack>
}

export default Products;