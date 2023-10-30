import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "@mui/material";
import { Button } from "reactstrap";
import { useEffect } from "react";
import { getUserDetails } from "../../redux/selector/user.selector";
import { setUserDetails } from "../../redux/slices/user.slice";

const UserDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const dispatch = useDispatch();
  
  const user = useSelector(getUserDetails);


  if (id != undefined) {
    useEffect(() => {
    dispatch(setUserDetails(id))
    }, [id, dispatch]);
  }



  const navigateToUpdateScreen = () => {
    navigate(`/admin/update-user/${user?.userid}`);
  }

  if (!user) {
    return <>
      <h1>404 | user not found with the ID {id} </h1>
      <Link component={RouterLink} to={'/admin/userList'}>Back the the User list</Link>
    </>
  }

  const handleReturnUserlist = () => {
    navigate(`/admin/userList`);
  }

  return (
    <>
      <h1>Account: {user?.username}</h1>
      <Button color="primary" onClick={navigateToUpdateScreen}>Update</Button>
      <p><b>ID: </b>{user?.userid}</p>
      <p><b>Username: </b>{user?.username}</p>
      <p><b>Password: </b>{user?.password}</p>
      <p><b>Email: </b>{user?.email}</p>
      <p><b>Role: </b>{user?.role}</p>
      <Button color="primary" onClick={handleReturnUserlist}> Return to user list </Button>
      
    </>
  )
}

export default UserDetail;
