import React from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick, className, children, disabled }) => (
    <button
        onClick={onClick}
        className={`${styles.greatButton} ${className}`}
        type="button"
        {...disabled}
    >
        {children.toUpperCase()}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    className: '',
};

export default Button;