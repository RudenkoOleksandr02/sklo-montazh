import {Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import s from "../../common/Link/Link.module.css";

const Info = () => {
    return <Stack direction='column' spacing={0.5}>
        <Typography sx={{
            fontWeight: 'bold',
        }}>Інформація</Typography>
        <Link to='/portfolio' className={s.item}>Портфоліо</Link>
        <Link to='/delivery' className={s.item}>Оплата і доставка</Link>
    </Stack>
}

export default Info;