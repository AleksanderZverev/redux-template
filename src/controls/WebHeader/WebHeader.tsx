import { Divider } from '@mui/material';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './styles.module.css';
import MuiLink from '../Link/Link';

interface WebHeaderProps {}

const WebHeader: FC<WebHeaderProps> = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftHeaderContainer}>
                <div>
                    <Link href="/">
                        <a className={classNames(styles.logo, styles.fullLogo)}>Cat Facts</a>
                    </Link>
                    <Link href="/">
                        <a className={classNames(styles.logo, styles.shortLogo)}>CF</a>
                    </Link>
                </div>
                <Divider orientation="vertical" flexItem />
                <MuiLink
                    className={styles.link}
                    activeClassName={styles.activeLink}
                    href="/cat-facts"
                    underline="none"
                    fontSize={23}
                >
                    Факты и породы
                </MuiLink>
            </div>
            <div className={styles.rightHeaderContainer}>Unknown User</div>
        </header>
    );
};

export default WebHeader;
