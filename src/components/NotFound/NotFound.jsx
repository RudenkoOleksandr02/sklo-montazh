import {Box, Typography} from "@mui/material";
const NotFound = () => {
    return <Box sx={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Typography color='error' variant='h4' component='span'>
            404: СТОРІНКА НЕ ЗНАЙДЕНА
        </Typography>
    </Box>
}

export default NotFound;