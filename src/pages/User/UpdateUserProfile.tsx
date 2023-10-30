import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { getUserDetails } from "../../redux/selector/user.selector";
import AdminForm from "../../components/AdminForm";
import { UserFormDetail }  from "../../components/AdminForm";
import User from "../../models/User";
import { setUserDetails, updateInfo } from "../../redux/slices/user.slice";
import { useEffect } from "react";
import { Button } from "reactstrap";

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

  const handleReturnUserList = () => {
    navigate(`/admin/userList`);
  }

  const handleReturnProductDetail = () => {
    navigate(`/admin/user-detail/${id}`);
  }

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
      <Button color="primary" onClick={handleReturnUserList}>Return to product list</Button>
    </>
  }

  return (
    <>
      <Button color="primary" onClick={handleReturnProductDetail}>back to product detail</Button>
      <Button color="primary" onClick={handleReturnUserList}>Return to product list</Button>
      <AdminForm title="Update task" submitBtnText="Save" productinfo={user} onSubmit={handleSubmit}></AdminForm>
   </>
  )
}

export default UpdateUserProfile;
