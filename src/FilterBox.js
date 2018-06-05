import React from 'react';
import Search from './Search';

export default ({ ...attrs, children }) => (
    <Search
        {...attrs}
    >
        {children}
    </Search>
)