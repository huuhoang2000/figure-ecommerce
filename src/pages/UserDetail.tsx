import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "@mui/material";
import { useEffect } from "react";
import { getUserDetails } from "../store/selector/user.selector";
import { setUserDetails } from "../store/slices/user.slice";

const UserDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();
  
  const user = useSelector(getUserDetails);

  useEffect(() => {
    dispatch(setUserDetails(Number(id)))
  }, [id, dispatch]);

  const navigateToUpdateScreen = () => {
    navigate(`/update-user/${user?.userid}`);
  }

  if (!user) {
    return <>
      <h1>404 | user not found with the ID {id} </h1>
      <Link component={RouterLink} to={'/user'}>Back the the User list</Link>
    </>
  }

  return (
    <>
      <h1>Account: {user?.username}</h1>
      <button onClick={navigateToUpdateScreen}>Update</button>
      <p><b>ID: </b>{user?.userid}</p>
      <p><b>Username: </b>{user?.username}</p>
      <p><b>Password: </b>{user?.password}</p>
      <p><b>Email: </b>{user?.email}</p>
      <p><b>Role: </b>{user?.role}</p>
    </>
  )
}

export default UserDetail;
