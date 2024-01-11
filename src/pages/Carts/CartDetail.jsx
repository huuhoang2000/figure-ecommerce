import HeaderLayout from "../../layout/HeaderLayout";
import FooterLayout from "../../layout/FooterLayout";
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCartByCartId} from "../../store/selector/cart.selector";
import { fetchACartById } from "../../store/slices/cart.slice";
import { Table } from "reactstrap";
import { useAppSelector } from "../../store/hooks";
import { fetchProductsById } from "../../store/slices/product.slice";
import ProductCart from "./ProductCart";

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
      const productPromises = cart.products.map(product => 
        dispatch(fetchProductsById(product.productid))
      );

      Promise.all(productPromises)
        .then(details => {
          setProductDetails(details);
        })
        .catch(error =>  {
          console.error(error);
        });

    }
  }, [cart, dispatch]); 

  return (
    <>
      <div>
        <HeaderLayout></HeaderLayout>
        <h2><b>Shopping Cart</b></h2>
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
              // console.log(product),
              <ProductCart key={index} product={product} quantity={cart.products[index].quantity} />
            ))}
          </tbody>
        </Table>
        <FooterLayout></FooterLayout>
      </div>
    </>
  );
}

export default CartDetail;
