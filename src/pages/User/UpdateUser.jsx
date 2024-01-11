import { useDispatch} from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { useParams, useNavigate } from "react-router-dom"
import { getLoading, getUserDetails } from "../../store/selector/user.selector";
import UserForm from "../../components/UserForm";
import { editUser, fetchUserById, updateUserById } from "../../store/slices/user.slice";import { useEffect } from "react";
import { Button } from "reactstrap";

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getLoading);
  const user = useAppSelector(getUserDetails);

  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [dispatch, id])

  if (loading === 'loading' || !user) {
    return <div>Loading...</div>
  }

  const handleSubmit = (userFormDetail) => {
    if (id && !isNaN(id)) {
      const updatedUser = {
        id: userFormDetail.id, 
        username: userFormDetail.username, 
        email: userFormDetail.email, 
        password: userFormDetail.password, 
        name: `${userFormDetail.name.firstname} ${userFormDetail.name.lastname}`, 
        phone: userFormDetail.phone, 
        address: `${userFormDetail.address.city}, ${userFormDetail.address.street}, ${userFormDetail.address.number}, ${userFormDetail.address.zipcode}`
      };

      dispatch(updateUserById({id: Number(id), userData: updatedUser}))
      dispatch(editUser({id: Number(id), userFormDetail:updatedUser}));
      navigate(`/user/user-detail/${user.id}`)
    }
  }
  if (!user) {
    return (
      <>
        <h1>404 | User with {id} is not found</h1>
        <Button color="primary" onClick={() => navigate(`/user/user-list`)}>Return to user list</Button>
      </>
    ) 
  }

  return (
    <>
      <div>
        <h2>Update User Information</h2>
        <Button color="primary" onClick={() => navigate(`/user/user-detail/${id}`)}>Back to user detail</Button>
        <Button color="primary" onClick={() => navigate(`/user/user-list`)}>Return to user list</Button>
        <UserForm title="Update task" submitBtnText="Save" productinfo={user} onSubmit={handleSubmit}></UserForm>
      </div> 
   </>
  )
}

export default UpdateUser;
