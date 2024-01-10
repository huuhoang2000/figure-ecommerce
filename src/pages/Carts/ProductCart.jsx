/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Button } from 'reactstrap';
import { getProductDetailsById } from '../../store/selector/product.selector';

const ProductCart = ({ product, cartId, handleDelete }) => {
  const navigate = useNavigate();
  const productOfId = useAppSelector(state => getProductDetailsById(state, product.meta.arg.productId));
  
  if (!productOfId || !productOfId.title) {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    )
  }


  return (
    <tr key={product.meta.arg.productId}>
      <td>{product.meta.arg.productId}</td>
      <td>{product.meta.arg.quantity}</td>
      <td>
        {productOfId.title}
      </td>
      <td><Button color="primary" onClick={() => navigate(`/admin/products/product-detail/${product.meta.arg.productId}`)}>Detail</Button></td>
      <td><Button color="primary" onClick={() => handleDelete(cartId)}>Delete</Button></td>
    </tr>
  );
}


export default ProductCart;
