import { useDispatch } from "react-redux"
import { deleteUser, editUser, fetchUser } from "../../store/slices/user.slice";
import { useNavigate } from 'react-router-dom';
import {Table, Button, Input} from 'reactstrap' ;
import User from "../../models/User.js";
import { getAllUsers } from "../../store/selector/user.selector";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(getAllUsers);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleRoleChange = (id, newRole) => {
    const user = users.find(user => user.id === id);

    if (user) {
      const updatedUser = new User(
        user.id, 
        user.username, 
        user.email, 
        user.password, 
        `${user.name.firstname} ${user.name.lastname}`, 
        user.phone, 
        `${user.address.city}, ${user.address.street}, ${user.address.number}, ${user.address.zipcode}` 
      );
      updatedUser.role = newRole;
      dispatch(editUser({id, userFormDetail: updatedUser.toPlainObject()}))
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      dispatch(deleteUser(id));
    }
  }
  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  }
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  })

  return (
    <>
      <h1 className="text-center">User List</h1>
        <div>
          <Button color="primary" onClick={() => navigate(`/admin/user/add-user`)}>Add a new user account</Button>
        </div>
        <div className="col-sm-3">
          <Input type="number" placeholder="View Limit" value={limit} onChange={e => setLimit(e.target.value)} />
        </div>
        
      <Table className="text-center" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('username')}>UserName</th>
            <th onClick={() => handleSort('password')}>Password</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('phone')}>Phone</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('role')}>Role</th>
            <th>Detail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.slice(0, limit).map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.name ? `${user.name.firstname} ${user.name.lastname}` : ''}</td>              
              <td>{user.phone}</td>
              <td>{user.address ? `${user.address.city}, ${user.address.street}, ${user.address.number}, ${user.address.zipcode}` : ''}</td>
              <td>
                <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td>
                <Button color="primary" onClick={() => navigate(`/admin/user/user-detail/${user.id}`)}>Detail</Button>
              </td>
              <td>
                <Button color="primary" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserList;
