import { usersListTabHead } from '../../../enums';
import { useGetUsersQuery } from '../../../features/shop/shopApi';
import { SELLER_ACCESS } from '../../../enums';
import { FaUsersViewfinder } from 'react-icons/fa6';
function UserList() {
  const { data: users = [] } = useGetUsersQuery();
  // const filteredUsers=[...users].filter((user)=>user!==user.approve=false)
  return (
    <div className="p-2 w-full flex">
      <table className="w-full  text-xs shadow">
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
            ? users.map((user) => (
                <tr key={user.email} className="text-center shadow">
                  <td className="p-2 w-1/5">
                    <div className="flex flex-col">
                      <span>{user.userName}</span>
                      <span>{user.email} </span>
                    </div>
                  </td>
                  <td className="p-2 w-1/5">
                    <div className="flex flex-col items-center">
                      <span>BARMM</span>
                      <div className="flex gap-2">
                        <span>Lakit</span>
                        <span>Old Panamao</span>
                        <span>Sulu</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 w-1/5">{user.role}</td>
                  <td className="p-2 w-1/5 text-blue-500">{user.date} </td>
                  <td className="p-2 w-1/5 ">
                    <div className="flex items-center justify-center">
                      {user.role === SELLER_ACCESS && user.pending === true ? (
                        <span>pending</span>
                      ) : (
                        <span
                          className={
                            user.isOnline
                              ? 'rounded full bg-green-600 p-1 text-xs'
                              : 'rounded-full  bg-red-600 p-1'
                          }
                        >
                          {user.isOnline}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center jystify-center gap-2 text-xs">
                      <button className="shadow p-1">
                        {/* <FaUsersViewfinder /> */}View
                      </button>
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
