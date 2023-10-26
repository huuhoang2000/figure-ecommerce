import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { getAllUsersFromBinSelector } from "../../redux/selector/user.selector";
import { hardDeleteUser, softDeleteUser } from "../../redux/slices/user.slice";
import { Button } from "reactstrap";

interface userBinProps {
  
}

const Bin: React.FunctionComponent<userBinProps> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector(getAllUsersFromBinSelector);

  const handleRestore = (id: string) => {
    dispatch(softDeleteUser({id , value: false}));
  }

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user? This is not reversible!!!")
    if (isConfirmed) {
      dispatch(hardDeleteUser(id));
    }
  }

  const handleReturnUserList = () => {
    navigate(`/admin/userList`);
  }

  return (
    <>
      <h1>List of user accounts get deleted bin</h1>
      <br />
      <Button color="primary" onClick={handleReturnUserList}>Return to User List</Button>
      <br />
      <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
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
            <td>{users?.username}</td>
            <td>{users?.password}</td>
            <td>{users?.email}</td>
            <td>{users?.name}</td>
            <td>{users?.phone}</td>
            <td>{users?.address}</td>
            <td>{users?.role}</td>
            <td>
              {users?.userid && <button onClick={() => handleRestore(users.userid)}>Restores</button>}
            </td>
            <td>
              {users?.userid && <button onClick={() => handleDelete(users.userid)}>Delete</button>}
            </td>
        </tbody>
      </table>
    </>
  )
}

export default Bin;
