import { useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const AdminForm = ( {submitBtnText, onSubmit} ) => {
  const {id} = useParams();

  const [userDetail, setAdminFormUserDetail] = useState({
    userid: '',
    username: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });

  const handleUserChange = (e) => {
    const {name, value} = e.target;
    setAdminFormUserDetail(prev  => ({...prev, [name]: value}));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(userDetail);
  }

  return (
    <Form onSubmit={handleLogin} className="text-center" style={{ width: '100%' }}>
      <h1>{id ? "Edit new Account ": "CREATE A NEW ACCOUNT" }</h1>
      <FormGroup>
        <div>
          <Label htmlFor="id">User ID</Label>
          <Input type="text" name="userid" id="userid" value={userDetail.userid} onChange={handleUserChange} />
        </div>
        <div>
          <Label htmlFor="name">User Name</Label>
          <Input type="text" name="username" id="username" value={userDetail.username} onChange={handleUserChange}/>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email" value={userDetail.email} onChange={handleUserChange} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" value={userDetail.password} onChange={handleUserChange} />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" value={userDetail.name} onChange={handleUserChange} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" value={userDetail.phone} onChange={handleUserChange} />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input type="text" name="address" id="address" value={userDetail.address} onChange={handleUserChange} />
        </div>
      </FormGroup>
      <Button color="primary">{submitBtnText}</Button>
    </Form> 
  )
}

export default AdminForm;
