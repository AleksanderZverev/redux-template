import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { CenterContainer } from '../CenterContainer/CenterContainer';

interface ErrorPageProps {
    errorMessage?: string;
    onReload?: () => void;
}

export const ErrorPage: FC<ErrorPageProps> = ({ errorMessage, onReload }) => {
    return (
        <CenterContainer>
            <Paper
                style={{
                    minWidth: '300px',
                    maxWidth: '600px',
                    width: '50%',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                }}
            >
                <Stack rowGap={'20px'}>
                    <Stack direction={'row'} alignItems="center" columnGap={'5px'}>
                        <Typography variant="h3" fontSize={24}>
                            Ooops.. Some error occured!
                        </Typography>
                        <SentimentVeryDissatisfied />
                    </Stack>
                    <div style={{ fontSize: 20 }}>{errorMessage ?? 'Критическая ошибка'}</div>
                    <Stack direction={'row'} justifyContent="space-between">
                        <Button variant="outlined" onClick={() => window?.history?.go(-1)}>
                            Return
                        </Button>
                        {onReload && (
                            <Button variant="contained" onClick={onReload}>
                                Reload
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Paper>
        </CenterContainer>
    );
};
