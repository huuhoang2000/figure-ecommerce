/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
const ProductOfCart = ({ 
  index, product, prodId, handleDelete, productQuantity
}) => {
  const navigate = useNavigate();
  return (
    // <tr key={product.payload.id}>
    <tr key={index}>
      <td>{product.payload.id}</td>
      <td>{productQuantity}</td>
      <td>
        {product.payload.title}
      </td>
      <td><Button color="primary" onClick={() => navigate(`/admin/products/product-detail/${product.payload.id}`)}>Detail</Button></td>
      <td><Button color="primary" onClick={() => handleDelete(prodId)}>Delete</Button></td>
    </tr>
  );
}

export default ProductOfCart;
