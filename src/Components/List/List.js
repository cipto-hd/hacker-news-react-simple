import React from 'react';
import Button from '../Button';
import { SORTS } from '../../Constants';
import classNames from 'classnames';

const Sort = ({
    sortKey,
    activeSortKey,
    onSort,
    children
}) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    );

    return (
        <Button
            onClick={() => onSort(sortKey)}
            className={sortClass}
        >
            {children}
        </Button>
    );
}

export default ({ list, onDismiss, filterQuery,
    sortKey, isSortReverse, onSort, }) => {
    /** Sorting on columns */
    const sortedList = SORTS[sortKey](list);
    const finalList = isSortReverse
        ? sortedList.reverse()
        : sortedList;

    /** Filtering on title */
    const isTitleIncudeFilterQuery = (item) => filterQuery ?
        (item.title ?
            item.title.toLowerCase().includes(filterQuery.trim().toLowerCase()) : null
        )
        : item;

    /** Style as an object for the value of a Jsx tag atrribute or 
     *  the value of an object key on second argument of React.CreateElement */
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
            <div className="table-header">
                <span style={{ width: '40%' }}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Title
          </Sort>
                </span>
                <span style={{ width: '30%' }}>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Author
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Comments
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}
                    >
                        Points
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    Archive
        </span>
            </div>
            {
                finalList.filter(isTitleIncudeFilterQuery).map(item =>
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