import { CircularProgress, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC } from 'react';

interface LoaderProps {
    title?: string;
    textColor?: string;
}

export const Loader: FC<LoaderProps> = ({ title, textColor }) => {
    return (
        <Stack direction={'column'} alignItems="center">
            <CircularProgress size={70} sx={{ color: blue[500] }} />
            <label style={{ color: textColor || 'white', fontSize: 18 }}>{title || 'Загрузка'}</label>
        </Stack>
    );
};
