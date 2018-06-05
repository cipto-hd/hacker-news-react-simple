import React from 'react';

export default ({ onQueryChange, queryKey, children, onQuerySubmit, localFilter = true }) => {
    const inputName = localFilter ? 'filter' : 'search'
    return (
        <form {...(!localFilter ? { onSubmit: onQuerySubmit } : null)}>
            <div className="table">
                <div className="table-row">
                    <span style={{ width: '40%', textAlign: 'right' }}>
                        <label htmlFor={inputName}>{children} : </label>
                    </span>
                    <span style={{ width: '30%', textAlign: 'left' }}>
                        <input style={{ width: '100%', boxSizing: 'border-box' }}
                            name={inputName}
                            type="text"
                            value={queryKey}
                            onChange={onQueryChange}
                        />
                    </span>
                    <span style={{ width: '30%', textAlign: 'left', marginLeft: '.3em' }}>
                        {!localFilter ? <button type="submit" style={{
                            fontWight: 'bolder',
                            backgroundColor: '#1616cc',
                            color: 'azure'
                        }}>Submit</button> : null}
                    </span>
                </div>
            </div>
        </form>
    )
}