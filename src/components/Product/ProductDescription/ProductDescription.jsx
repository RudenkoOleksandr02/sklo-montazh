import {Typography, Box} from "@mui/material";
import ReactMarkdown from 'react-markdown';

const ProductDescription = ({description}) => {
    return <Box>
        <Typography variant='h6' component='div' sx={{
            textAlign: 'center'
        }}>Опис</Typography>
        <Box>
            <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
    </Box>
}

export default ProductDescription;