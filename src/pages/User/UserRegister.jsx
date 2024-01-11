import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { getAllUsers } from '../../store/selector/user.selector';
import HeaderLayout from '../../layout/HeaderLayout';
import FooterLayout from '../../layout/FooterLayout';
import UserForm from '../../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchUser } from '../../store/slices/user.slice';

function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useAppSelector(getAllUsers);

  const handleCreateNewUser = (userDetail) => {
    let newId = userDetail.id;

    if (userDetail.id === null) {
      const maxId = Math.max(...users.map(user => user.id));
      newId = maxId + 1;
    }
    const newUser = {
      id: newId,
      ...userDetail,
      role: "user",
      isDeleted: false, 
    };

    dispatch(createUser(newUser)).then(() => {
      dispatch(fetchUser());
      navigate('/user/user-list');
    });  
  }

  return (
    <>
      <div><HeaderLayout></HeaderLayout></div>
      <UserForm title="Add User" submitBtnText="Add" onSubmit={handleCreateNewUser} autoComplete="new-password"/>
      <div><FooterLayout></FooterLayout></div>
    </>
    
  );
}

export default UserRegister;
