import { useDispatch, useSelector } from "react-redux"
import { updateInfo, softDeleteUser } from "../../redux/slices/user.slice";
import { useNavigate } from 'react-router-dom';
import {Table, Button} from 'reactstrap' ;
import User from "../../models/User.js";
import { getAllUsers } from "../../redux/selector/user.selector";
import { useAppSelector } from "../../redux/hooks";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(getAllUsers);
  
  const handleSoftDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      dispatch(softDeleteUser({id, value: true})); 
    }
  }

  const handleRoleChange = (id, newRole) => {
    const user = users.find(user => user.userid === id);

    if (user) {

      const updatedUser = new User(user.userid, user.username, user.email, user.password, user.name, user.phone, user.address);
      updatedUser.role = newRole;
      dispatch(updateInfo({id, adminFormDetail: updatedUser}))
    }
    
  }

  const navigate = useNavigate();
  
  const navigateToAddUser = () => {
    navigate("/admin/add-user")
  }

  const navigateToTrash = () => {
    navigate("/admin/trash")
  }

  const handleShowingDetail = (id) => {
    navigate(`/admin/user-detail/${id}`)
  }

  return (
    <>
      <h1 className="text-center">User List</h1>
      <Button color="primary" onClick={navigateToAddUser}>Add a new product</Button>
        {/* bắt eventclick -> useRouter -> u */}
      <Button color="primary" onClick={navigateToTrash}>Deleted User List</Button>
      <Table className="text-center" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Password</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userid}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user.userid, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>
                <Button color="primary" onClick={() => handleShowingDetail(user.userid)}>Detail</Button>
              </td>
              <td>
                <Button color="primary" onClick={() => handleSoftDelete(user.userid)}>Delete</Button>
              </td>
            </tr>

          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserList;
