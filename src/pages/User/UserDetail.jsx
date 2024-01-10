import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { fetchUserById } from '../../store/slices/user.slice'; // import the async thunk to fetch user by id
import { getLoading, getUserDetails } from '../../store/selector/user.selector'; // import the selector to get user details

const UserDetail = () => {
  const { id } = useParams(); // get the id from the URL
  const dispatch = useDispatch(); // get the dispatch function
  const navigate = useNavigate(); // get the navigate function
  
  useEffect(() => {
    dispatch(fetchUserById(Number(id))); // dispatch the action to fetch all users
  }, [id, dispatch]); // run the effect when the id or dispatch changes.

  const loading = useSelector(getLoading);
  const user = useSelector(getUserDetails);
  if (loading === 'loading' || !user) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h1>User Detail</h1>
        <div>
          <p><b>ID: </b>{user.id}</p>
          <p><b>Username: </b>{user.username}</p>
          <p><b>Password: </b>{user.password}</p>
          <p><b>Email: </b>{user.email}</p>
          <p><b>Name: </b> {user.name ? `${user.name.firstname} ${user.name.lastname}` : ''}
          {user.name ? (
          <>
            <br />First name: {user.name.firstname}
            <br />Last name: {user.name.lastname}
          </>
          ) : ''}
          </p>
          <p><b>Phone: </b>{user.phone}</p>
          <p>
            <b>Address:</b>
            {user.address ? (
              <>
                <br />City: {user.address.city}
                <br />Street: {user.address.street}
                <br />Number: {user.address.number}
                <br />Zipcode: {user.address.zipcode}
              </>
            ) : ''}
          </p>
          <Button color="primary" onClick={() => navigate('/admin/user/user-list')}>Back to user list</Button>
          <Button color="primary" onClick={() => navigate(`/admin/user/update-user/${user.id}`)}>Update user</Button>
        </div>

    </>
  );
}

export default UserDetail;
