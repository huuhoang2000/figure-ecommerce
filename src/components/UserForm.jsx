import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = ( {submitBtnText, onSubmit} ) => {
  const [userDetail, setUserFormUserDetail] = useState({
    username: '',
    email: '',
    password: '',
    name: { firstname: '', lastname: '' },
    phone: '',
    address: { city: '', street: '', number: 0, zipcode: ''},
  });

  const handleUserChange = (e) => {
    const {name, value} = e.target;
    if (name.includes('.')) {
      const [field, subfield] = name.split('.');
      setUserFormUserDetail(prev => ({
        ...prev, [field]: {
          ...prev[field],
          [subfield]: value
        }
      }));
    } else {
      setUserFormUserDetail(prev => ({ ...prev, [name]: value}))
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(userDetail);
  }
    return (
      <Form onSubmit={handleFormSubmit} className="row my-5 p-5">
          <FormGroup>
            <Label htmlFor="name">User Name</Label>
            <Input type="text" name="username" id="username" value={userDetail.username} onChange={handleUserChange}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" id="email" value={userDetail.email} onChange={handleUserChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" value={userDetail.password} onChange={handleUserChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <div className="row">
              <div className="col">
                <Input type="text" className="form-control" name="name.firstname" placeholder="First name" value={userDetail.name.firstname} onChange={handleUserChange} aria-label="First name"/>
              </div>
              <div className="col">
                <Input type="text" className="form-control" name="name.lastname" placeholder="Last name" value={userDetail.name.lastname} onChange={handleUserChange} aria-label="Last name" />
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input type="text" name="phone" id="phone" value={userDetail.phone} onChange={handleUserChange} />
          </FormGroup>
          <FormGroup>
            <div className="row g-3">
              <label htmlFor="por-address">Address</label>
              <div className="col-sm" id="por-address">
                <Input type="text" className="form-control" name="address.city" id="inputCity" placeholder="City" value={userDetail.address.city} onChange={handleUserChange}/>
              </div>
              <div className="col-sm" id="por-address">
                <Input type="text" className="form-control" name="address.street" id="inputStreet" placeholder="Street" value={userDetail.address.street} onChange={handleUserChange}/>
              </div>
              <div className="col-sm" id="por-address">  
                <Input type="text" className="form-control" name="address.number" id="inputNumber" placeholder="Number" value={userDetail.address.number} onChange={handleUserChange}/>
              </div> 
              <div className="col-sm" id="por-address"> 
                <Input type="text" className="form-control" name="address.zipcode" id="inputZipcode" placeholder="Zipcode" value={userDetail.address.zipcode} onChange={handleUserChange}/>
              </div>
            </div>
          </FormGroup>  
        <Button color="primary">{submitBtnText}</Button>
      </Form> 
    )
  }
export default UserForm;