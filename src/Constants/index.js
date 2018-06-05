/**
 * constant vars
 */
import { sortBy } from 'lodash';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '10';
const PARAM_HPP = 'hitsPerPage=';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

export {
  DEFAULT_QUERY, PATH_BASE, PATH_SEARCH,
  PARAM_SEARCH, PARAM_PAGE, DEFAULT_HPP, PARAM_HPP, SORTS
}