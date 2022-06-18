import { FC, ReactNode } from 'react';

export const CenterContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
            }}
        >
            {children}
        </div>
    );
};
