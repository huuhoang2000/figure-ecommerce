import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
const CartForm = ( {onSubmit, submitBtnText}) => {
  const [cartDetail, setCartDetail] = useState({
    id: '',
    userId: '',
    date: '',
    products: { productId: '', productQuantity: ''} 
  });

  const handleCartChange = (e) => {
    const {name, value} = e.target;
    if (name.includes('.')) {
      const [field, subfield] = name.split('.');
      setCartDetail(prev => ({
        ...prev, [field]: {
          ...prev[field],
          [subfield]:value
        }
      })) 
    } else {
      setCartDetail(prev => ({ ...prev, [name]: value }))
    }
    
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(cartDetail);
  }

  return (
    <>
      <div>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label htmlFor="userid">User Id</Label>
            <Input type="text" name="userid" value={cartDetail.userId} onChange={handleCartChange} className="cart-input"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Date</Label>
            <Input type="text" name="date" value={cartDetail.date} onChange={handleCartChange} className="cart-input"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="productId">Product Id</Label>
            <Input type="text" name="productId" value={cartDetail.products.productId} onChange={handleCartChange} className="cart-input"/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="productQuantity">Product Quantity</Label>
            <Input type="number" name="productQuantity" value={cartDetail.products.productQuantity} onChange={handleCartChange} className="cart-input"/>
          </FormGroup>
          <Button className="btn-submit" color="primary">{submitBtnText}</Button>
        </Form>
      </div>
    </>
  )
}

export default CartForm;
