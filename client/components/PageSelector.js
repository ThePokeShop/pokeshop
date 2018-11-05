import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PageSelector = props => {
  const {page, limit, pageCount, key} = props.paginatedProducts
  if (pageCount < 1) return null
  let paramUrl = '/products?'
  if (key) paramUrl += `key=${key}&`;
  paramUrl += `limit=${limit}&page=`;
  const prevPageUrl = `${paramUrl}${page-1}`;
  const nextPageUrl = `${paramUrl}${page+1}`;
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      {page > 1 && (<Link to={prevPageUrl} className="pagination-previous">
        Previous
      </Link>)}
      {page < pageCount && (<Link to={nextPageUrl} className="pagination-next">
        Next
      </Link>)}
      <ul className="pagination-list">
        {new Array(pageCount).fill('').map((_, idx) => {
          const pageNum = idx + 1
          const isCurrent = (page === pageNum) ? 'is-current' : null;
          const ariaLabel = (isCurrent) ? `Page ${pageNum}` : `Goto page ${pageNum}`;
          const paramUrlWithNum = `${paramUrl}${pageNum}`
          return (
            <li key={pageNum}>
              <Link to={paramUrlWithNum} className={`pagination-link ${isCurrent}`} aria-label={ariaLabel}>
                {pageNum}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const mapStateToProps = ({paginatedProducts}) => ({
  paginatedProducts
})

export default connect(mapStateToProps)(PageSelector);
