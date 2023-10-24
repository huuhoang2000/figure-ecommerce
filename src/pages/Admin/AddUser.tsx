import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User  from "../../models/User"
import AdminForm  from "../../components/AdminForm"
import { UserFormDetail }  from "../../components/AdminForm"
import { createUser } from "../../store/slices/user.slice";
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (userDetail: UserFormDetail) => {
    //sử dụng một instance của user cho vào createUser
    const user: User = {
      ...userDetail,
      role: "user",
      isDeleted: false, 
    };
    dispatch(createUser(user));
    navigate('/admin/userList');
  }

  return (
    <>
      <AdminForm title="Add User" submitBtnText="Add" onSubmit={handleSubmit} />
      <Link component={RouterLink} to="/admin/userList">Go back to the List</Link>

    </>
  );
}

export default AddUser;
