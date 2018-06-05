import React from 'react';
import styles from './Button.module.scss'

export default ({ onClick, className = '', children, disabled }) => (
    <button
        onClick={onClick}
        className={`${styles.greatButton} ${className}`}
        type="button"
        {...disabled}
    >
        {children.toUpperCase()}
    </button>
);