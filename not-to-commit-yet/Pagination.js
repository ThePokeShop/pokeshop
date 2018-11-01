import React from 'react';

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const {products} = this.props;
const {currentPage} = this.state;

const pageLimit = 20;
const pageCount = 3;
const total = products.length;
const pages = Math.ceil(total / pageCount);
const offset = (currentPage - 1) * pageLimit;
let startCount = 0;

class Pagination extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 1
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };


    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
  }
}

export default Paginate;
