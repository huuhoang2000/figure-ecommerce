import HeaderLayout from "../../layout/HeaderLayout";
import FooterLayout from "../../layout/FooterLayout";
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCartByCartId} from "../../store/selector/cart.selector";
import { fetchACartById } from "../../store/slices/cart.slice";
import { Table } from "reactstrap";
import { useAppSelector } from "../../store/hooks";
import { deleteProduct, fetchProductsById } from "../../store/slices/product.slice";
import ProductOfCart from "./ProductOfCart";
import { Button } from 'reactstrap';


export const CartDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useAppSelector(getCartByCartId);
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
      dispatch(fetchACartById(Number(id)));
    }, [id, dispatch]);

  useEffect(() => {
    if (cart && cart.products) {
      const productPromises = cart.products.map(product => {
        return dispatch(fetchProductsById(Number(product.productId))); 
      });

      Promise.all(productPromises)
        .then(details => {
          setProductDetails(details);
        })
        .catch(error =>  {
          console.error(error);
        })
    }
  }, [cart, dispatch]); 

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Product?')) {
      dispatch(deleteProduct(id));
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div>
        <HeaderLayout></HeaderLayout>
        <h2><b>Shopping Cart {id}</b></h2>
        <Button color="primary" onClick={() => navigate(`/admin/carts/cart-list`)}>Go back to Cart List</Button>
        <Table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Quantity</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((product, index) => (
              <ProductOfCart
                key={index}
                product={product}
                prodId={product.id}
                handleDelete={handleDelete} 
                productQuantity = {cart.products[index].quantity}
                />
            ))}
          </tbody>
        </Table>
        <FooterLayout></FooterLayout>
      </div>
    </>
  );
}

export default CartDetail;
