import React, { Component } from 'react';
import './App.css';
import {
  DEFAULT_QUERY, PATH_BASE,
  PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE,
  DEFAULT_HPP, PARAM_HPP
} from '../../Constants';
import SearchBox from '../SearchBox';
import FilterBox from '../FilterBox';
import List from '../List';
import Button from '../Button';
import axios from 'axios';

class App extends Component {
  _isMounted = false; // var which is used to help prevent setState on unmounted

  state = {
    results: null,
    searchKey: '',
    searchQuery: DEFAULT_QUERY,
    filterQuery: '',
    error: null,
    isLoading: false,
    sortKey: 'NONE',
    isSortReverse: false
  };

  /** lifecycle methods */
  componentDidMount() {
    this._isMounted = true;
    const { searchQuery } = this.state;
    this.setState({ searchKey: searchQuery });
    this.searchHN(searchQuery);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // only useful in error boundary component, the error is from its children
  componentDidCatch(error, errorInfo) {
    console.log(error); // not executed bcoz error is from this component, not from its  children
  }

  /** custom methods */
  setSearchResults = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results &&
      results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  isResultsExistForAQuery = (searchQuery) => {
    const { results } = this.state;
    return results && results[searchQuery];
  }

  searchHN = (searchQuery, page = 0) => {
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchQuery}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => {
        this._isMounted && this.setSearchResults(result.data);
        this.setState({ isLoading: false });
      })
      .catch(error => this._isMounted && this.setState({ error }));

    /* fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchQuery}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchResults(result))
      .catch(error => this.setState({ error })); */
  }

  onQuerySubmit = (e) => {
    e.preventDefault();
    this.state.error && this.setState({ error: null });
    const { searchQuery } = this.state;
    this.setState({ searchKey: searchQuery });
    if (!this.isResultsExistForAQuery(searchQuery)) {
      this.searchHN(searchQuery);
    }
  }

  onDismiss = (objectID) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotDismissed = item => item.objectID !== objectID;
    const updatedHits = hits.filter(isNotDismissed);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onQueryChange = (e) => {
    const query = `${e.target.name}Query`
    // dinamically setState depending on text input function [searh or filter]
    this.setState({
      [query]: e.target.value
    })
  }

  returnErrorMessage = (error) => {
    const { message } = error;
    return (
      <div className="interactions">
        <p>{message}</p>
      </div>
    );
  }

  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { filterQuery, searchQuery, searchKey, results,
      error, isLoading, sortKey, isSortReverse } = this.state;

    let filterBoxProps, searchBoxProps, listProps,
      onQueryChange = this.onQueryChange, onQuerySubmit = this.onQuerySubmit,
      onDismiss = this.onDismiss, onSort = this.onSort;

    filterBoxProps = { onQueryChange, queryKey: filterQuery };
    searchBoxProps = { onQueryChange, queryKey: searchQuery, onQuerySubmit, localFilter: false };

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    results && (listProps = { list, onDismiss, filterQuery, sortKey, onSort, isSortReverse });

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    // high-order component
    const withLoading = (Component) =>
      (props) =>
        <Button {...props}>
          {isLoading ? 'Loading...' : 'More...'}
        </Button>

    const ButtonWithLoading = withLoading(Button);

    return (
      <div className="page">
        <div className="interactions">
          <SearchBox {...searchBoxProps}> Search on HN </SearchBox>
        </div>
        <div className="interactions">
          <FilterBox {...filterBoxProps}> Filter on title </FilterBox>
        </div>

        {
          error ?
            this.returnErrorMessage(error)
            :
            results ? (
              <section>
                <List {...listProps} />

                <div className="interactions">
                  <ButtonWithLoading onClick={() => this.searchHN(searchKey, page + 1)} disabled={isLoading} />
                  {/* <Button onClick={() => this.searchHN(searchKey, page + 1)} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'More...'}
                  </Button> */}
                </div>
              </section>) :
              <div className="interactions">
                <p style={{ fontSize: '2em', fontWeight: 'bolder' }}>Loading</p>
              </div>

        }
      </div>
    );
  }
}

export default App;

export { FilterBox, SearchBox, List, Button };