import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel } from '@mui/material';
import { FC, useState } from 'react';

interface AssertionModalProps {
    title: string;
    message: string | null;
    assertTitle: string;
    cancelTitle?: string;
    onClose: () => void;
    forceOpen?: boolean;
    onAssert?: () => void;
    onCancel?: () => void;
}

export const AssertionModal: FC<AssertionModalProps> = ({
    title,
    message,
    cancelTitle,
    assertTitle,
    forceOpen,
    ...props
}) => {
    const [forbidShowing, setForbidShowing] = useState(false);

    const onClose = () => {
        props.onClose();
    };

    const onCancel = () => {
        props.onCancel ? props.onCancel() : props.onClose();
    };

    const onAssert = () => {
        props.onAssert ? props.onAssert() : props.onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth={'sm'} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 5,
                        alignItems: 'stretch',
                        width: '100%',
                        padding: 10,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {cancelTitle && (
                            <Button variant="outlined" onClick={onCancel}>
                                {cancelTitle}
                            </Button>
                        )}

                        <Button variant="contained" onClick={onAssert}>
                            {assertTitle}
                        </Button>
                    </div>
                </div>
            </DialogActions>
        </Dialog>
    );
};
