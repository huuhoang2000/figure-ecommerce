import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../store/selector/user.selector";
import { updateInfo, softDeleteUser } from "../store/slices/user.slice";
import { Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import Admin from "../models/User";

const UserList = () => {
  const dispatch = useDispatch();
  const users: Admin[] = useSelector(getAllUsers);

  const handleSoftDelete = (UserID: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');

    if (isConfirmed) {
      dispatch(softDeleteUser(UserID))
    }
  }

  const handleRoleChange = (id: number, targetStatus: string) => {
    dispatch(updateInfo({id, targetStatus}))
  }

  return (
    <>
      <h1>User List</h1>
{/* use Material-UI’s Link component with routing */}
      <Link component={RouterLink} to="/add-user">Add a new product</Link>

      <table className="text-center" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userid}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(Number(user.userid), e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>
                <Link component={RouterLink} to={`/DetailOfUser/${user.userid}`}>Detail</Link>
              </td>
              <td>
                <button onClick={() => handleSoftDelete(Number(user.userid))}>Delete</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
