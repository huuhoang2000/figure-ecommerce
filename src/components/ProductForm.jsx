import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const productForm = ( {submitBtnText, onSubmit} ) => {
  const [productDetail, setProductDetail] = 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  const handleProductChange = (event) => {
    const {name, value} = event.target;
    setProductDetail({
      ...productDetail,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(productDetail);
  }

  return (
    <>
      <div>
         <Form onSubmit={handleFormSubmit} className="row my-5 p-5">
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" id="title" value={productDetail.title} onChange={handleProductChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input type="text" name="price" id="price" value={productDetail.price} onChange={handleProductChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input type="text" name="description" id="description" value={productDetail.description} onChange={handleProductChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Image</Label>
            <Input type="text" name="image" id="image" value={productDetail.image} onChange={handleProductChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="title">Category</Label>
            <Input type="select" name="category" id="category" value={productDetail.category} onChange={handleProductChange}>
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">{'Men\'s Clothing'}</option>
            <option value="women's clothing">{'Women\'s Clothing'}</option>
          </Input>            
          </FormGroup>
          <Button color="primary">{submitBtnText}</Button>
        </Form>
      </div>
    </>
  )
}

export default productForm;
