import { ChangeEvent, useState } from "react";
import User from "../models/User";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export interface UserFormDetail {
  userid: string;
  username: string;
  email: string;
  password: string;
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
    <form onSubmit={handleLogin} className="text-center" style={{ width: '100%' }}>
      <h1>{id ? "Edit new Account ": "CREATE A NEW ACCOUNT" }</h1>
      <div>
        <label htmlFor="id">User ID</label>
        <input type="text" name="userid" id="userid" value={userDetail.userid} onChange={handleUserChange} />
      </div>
      <div>
        <label htmlFor="name">User Name</label>
        <input type="text" name="username" id="username" value={userDetail.username} onChange={handleUserChange}/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={userDetail.email} onChange={handleUserChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={userDetail.password} onChange={handleUserChange} />
      </div>
      <button>{submitBtnText}</button>
    </form>
    
  )
}

export default AdminForm;
