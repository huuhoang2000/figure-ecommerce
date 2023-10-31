import { useNavigate } from "react-router-dom";
import User  from "../../models/User"
import AdminForm  from "../../components/AdminForm"
import { fetchUser } from "../../store/slices/user.slice";
import { createUser } from "../../redux/slices/user.slice";
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AddUser = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSubmit = (userDetail) => {
    //sử dụng một instance của user cho vào createUser
    const user = {
      ...userDetail,
      role: "user",
      isDeleted: false, 
    };
    dispatch(createUser(user));
    navigate('/admin/userList');
  }

  if (loading === 'loading') return <p>Loading...</p>;

  return (
    <>
      <AdminForm title="Add User" submitBtnText="Add" onSubmit={handleSubmit} />
      <Link component={RouterLink} to="/admin/userList">Go back to the List</Link>
    </>
  );
}

export default AddUser;
