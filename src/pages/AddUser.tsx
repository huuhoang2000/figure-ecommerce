import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User  from "../models/User"
import AdminForm  from "../components/AdminForm"
import { UserFormDetail }  from "../components/AdminForm"
import { createUser } from "../store/slices/user.slice";

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
    navigate('/user');
  }

  return (
    <>
      <AdminForm title="Add User" submitBtnText="Add" onSubmit={handleSubmit} />
    </>
  );
}

export default AddUser;
