import { usersListTabHead, roleOptions } from '../../../enums';
import {
  useGetUsersQuery,
  useGetActivityQuery,
} from '../../../features/shop/shopApi';
import { FaFilter } from 'react-icons/fa6';
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
const { Option } = Select;

function UserList() {
  const { data: users = [] } = useGetUsersQuery();
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [filteredUser, setFilteredUser] = useState([]);
  const selectRef = useRef(null);

  const formatDateTime = (date = new Date()) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
  };
  useEffect(() => {
    if (users.length <= 0) return;
    let result = [...users];
    if (selectedRole) {
      result = result.filter((user) => user.role === selectedRole);
    }
    setFilteredUser(result);
  }, [users, selectedRole]);

  return (
    <div className=" w-full flex flex-col pt-4 gap-5">
      <div className="text-end flex items-center gap-1 justify-end pr-2 ">
        <Select
          open={open}
          allowClear
          onChange={(value) => setSelectedRole(value)}
          ref={selectRef}
          className="min-w-30  !border-blue-600 shadow "
          placeholder="Filter By"
        >
          {roleOptions.map((r) => (
            <Option key={r.label} value={r.value}>
              {r.label.charAt(0).toUpperCase() + r.label.slice(1)}
            </Option>
          ))}
        </Select>
        <FaFilter
          className=" text-blue-600 cursor-pointer "
          onClick={() => setOpen(!open)}
        />
      </div>
      <table className="w-full  text-xs shadow  ">
        <thead>
          <tr className=" shadow">
            {usersListTabHead.map((tab) => (
              <th key={tab} className="p-1.5">
                {tab}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users
            ? filteredUser.map((user) => (
                <tr key={user.email} className="text-center shadow">
                  <td className="p-2 w-1/5">
                    <div className="flex flex-col">
                      <span>{user.userName}</span>
                      <span className="text-gray-400">{user.email} </span>
                    </div>
                  </td>
                  <td className="p-2 w-1/5">
                    <div className="flex flex-col items-center">
                      <span></span>
                      <div className="flex gap-2">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 w-1/5">{user.role}</td>
                  <td className="p-2 w-1/5 ">
                    <div className="flex items-center justify-center">
                      <span
                        className={
                          user.isOnline
                            ? 'rounded full bg-green-600 p-1 text-xs'
                            : 'rounded-full  bg-red-600 p-1'
                        }
                      >
                        {user.isOnline}
                      </span>
                    </div>
                  </td>
                  {user.isOnline ? (
                    <td>__</td>
                  ) : (
                    <td className="p-2 w-1/5 text-blue-500">
                      {formatDateTime(user.lastSeen)}
                    </td>
                  )}

                  <td>
                    <div className="flex items-center jystify-center gap-2 text-xs">
                      <button className="shadow p-1">View</button>
                      <button className="shadow p-1">Block</button>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
