/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Button } from 'reactstrap';
import { getProductDetailsId } from '../../store/selector/product.selector';
const ProductCart = ({ product, cartId, handleDelete }) => {
  const navigate = useNavigate();
  // const productOfId = useAppSelector(state => getProductDetailsId(state, product.productId));

  return (
    <tr key={product.productId}>
      <td>{product.productId}</td>
      <td>{product.quantity}</td>
      <td>
        {/* {productOfId.title} */}
      </td>
      <td><Button color="primary" onClick={() => navigate(`/admin/products/product-detail/${product.productId}`)}>Detail</Button></td>
      <td><Button color="primary" onClick={() => handleDelete(cartId)}>Delete</Button></td>
    </tr>
  );
}

export default ProductCart;
