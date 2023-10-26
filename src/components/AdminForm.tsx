import { ChangeEvent, useState } from "react";
import User from "../models/User";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


export interface UserFormDetail {
  userid: string;
  username: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}

interface AdminFormProps {
  title: string;
  productinfo?: User;
  submitBtnText: string;
  onSubmit: (userDetail: UserFormDetail) => void;
}

const AdminForm = ( {submitBtnText, onSubmit: submit}: AdminFormProps ) => {
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

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setAdminFormUserDetail(prev  => ({...prev, [name]: value}));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(userDetail);
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
      </FormGroup>
      <Button color="primary">{submitBtnText}</Button>
    </Form>
    
  )
}

export default AdminForm;
