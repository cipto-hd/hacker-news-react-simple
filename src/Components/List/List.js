import React from 'react';
import Button from '../Button';

export default ({ list, onDismiss, filterQuery }) => {
    const isTitleIncudeFilterQuery = (item) => filterQuery ? 
        (item.title ? 
            item.title.toLowerCase().includes(filterQuery.trim().toLowerCase()) : null
        ) 
        : item;

    const largeColumn = {
        width: '40%',
    };
    const midColumn = {
        width: '30%',
    };
    const smallColumn = {
        width: '10%',
    };
    return (
        <div className="table">
            {
                list.filter(isTitleIncudeFilterQuery).map(item =>
                    <div key={item.objectID} className="table-row">
                        <span style={largeColumn}>
                            <a href={item.url} target="_blank">{item.title}</a>
                        </span>
                        <span style={midColumn}>
                            {item.author}
                        </span>
                        <span style={smallColumn}>
                            {item.num_comments}
                        </span>
                        <span style={smallColumn}>
                            {item.points}
                        </span>
                        <span style={smallColumn}>
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                            >
                                Dismiss
                            </Button>
                        </span>
                    </div>
                )
            }
        </div>
    )
}