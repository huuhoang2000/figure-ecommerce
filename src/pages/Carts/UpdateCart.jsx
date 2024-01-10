import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { getCartByCartId, getLoading } from '../../store/selector/cart.selector';
import { fetchACartById } from '../../store/slices/cart.slice';
import { useEffect } from 'react';

const UpdateCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getLoading);
  const cartDetail = useAppSelector(getCartByCartId);

  useEffect(() => {
    dispatch(fetchACartById(Number(id)));
  }, [dispatch, id])

  if (loading === 'loading' || !user) {
    return <div>Loading...</div>
  }

  if (!cartDetail) {
    return (
      <>
        <h1>404 | User with {id} is not found</h1>
        <Button color="primary" onClick={() => navigate(`/admin/carts/cart-list`)}>Return to cart list</Button>
      </> 
    )
    
  }

  return (
    <>
      <div>
        <h2>Changes to card</h2>
        <Button color="primary" onClick={() => navigate(`/admin/carts/cart-detail/${id}`)}>Back to Cart Detail</Button>  
        <Button color="primary" onClick={() => navigate(`/admin/carts/cart-list`)}>Return to the cart List</Button>  
        <CartForm title="Update Cart" submitBtnText="Save" cartinfo={cartDetail} onSubmit={handleSubmit}></CartForm>
      </div>

    </> 
  ) 
}
  
export default UpdateCart;
