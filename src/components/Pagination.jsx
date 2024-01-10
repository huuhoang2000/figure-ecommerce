import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Nav>
      <ul className='pagination d-flex mx-auto'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={(e) => {
              e.preventDefault(); 
              paginate(number)
            }} 
            className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </Nav>
  )
}

Pagination.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
