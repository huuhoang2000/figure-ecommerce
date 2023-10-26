import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { getUserDetails } from "../../redux/selector/user.selector";
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import AdminForm from "../../components/AdminForm";
import { UserFormDetail }  from "../../components/AdminForm";
import User from "../../models/User";
import { setUserDetails, updateInfo } from "../../redux/slices/user.slice";
import { useEffect } from "react";

const UpdateUserProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector(getUserDetails);

  useEffect(() => {
    if (id) {
    dispatch(setUserDetails((id)));
    }
  }, [dispatch, id])

  const handleSubmit = (adminFormDetail: UserFormDetail) => {
    if (id) {
      const user = new User(adminFormDetail.userid, adminFormDetail.username, adminFormDetail.email, adminFormDetail.password, adminFormDetail.name, adminFormDetail.phone, adminFormDetail.address);

      dispatch(updateInfo({id: id, adminFormDetail:user}));
      navigate(`/admin/user-detail/${adminFormDetail.userid}`)
    }
  }

  if (!user) {
    return <>
      <h1>404 | Product not found with id {id}</h1>
      <Link component={RouterLink} to={'/admin/userList'}>Back to product list</Link>
    </>
  }

  return (
    <>
      <div><Link component={RouterLink} to={`/admin/user-detail/${id}`}>back to product detail</Link></div>
      <div><Link component={RouterLink} to={'/admin/userList'}>Back to product list</Link></div>
      <AdminForm title="Update task" submitBtnText="Save" productinfo={user} onSubmit={handleSubmit}></AdminForm>
   </>
  )
}

export default UpdateUserProfile;
