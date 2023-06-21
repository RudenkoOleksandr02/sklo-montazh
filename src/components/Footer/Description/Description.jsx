import {Stack, Typography} from "@mui/material";

const Description = ({logo}) => {
    return <Stack>
        <img src={logo} alt='logo' width='200px' height='auto'/>
        <Typography>Працюємо в Києві та Київській області</Typography>
    </Stack>
}

export default Description;