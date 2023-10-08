import {Typography, Box, Paper} from "@mui/material";
import ReactMarkdown from 'react-markdown';

const ProductDescription = ({description}) => {
    return <Box>
        <Typography variant='h6' component='div' sx={{
            textAlign: 'center'
        }}>Опис</Typography>
        <Paper elevation={4} sx={{
            padding: '2px 6px'
        }}>
            <ReactMarkdown>{description}</ReactMarkdown>
        </Paper>
    </Box>
}

export default ProductDescription;
