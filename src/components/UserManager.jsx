import { FaTrash, FaArrowLeft } from 'react-icons/fa6';
import { FaSave, FaEdit } from 'react-icons/fa';
import Input from './Input';
import { LuCirclePlus } from 'react-icons/lu';
import { useContext, useEffect, useState } from 'react';
import { TbCancel } from 'react-icons/tb';

function UserManager() {
  const [blockedRoles, setBlockedRoles] = useState([]);
  const [addedRoles, setAddedRoles] = useState([]);

  const handleCheckboxChange = async (role) => {
    const blocked = blockedRoles.includes(role)
      ? blockedRoles.filter((r) => r !== role)
      : [...blockedRoles, role];

    const res = await fetch('http://localhost:8080/block', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blocked),
    });

    const result = await res.json();
    setBlockedRoles(result.data.blocked);
  };

  const handleRemoveRole = async (roleId, roleToRemove) => {
    if (blockedRoles.includes(roleToRemove.role)) {
      alert(`Please unblock, to remove ${roleToRemove.role}`);
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the role "${roleToRemove.role}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/role/${roleId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete role');
      setAddedRoles([...addedRoles].filter((r) => r._id !== roleId));
    } catch (err) {
      console.error(err);
    }
  };

  //////////////////////////////////////////////////////////////////////

  return (
    <div className="bg-white p-2 ">
      <table className="table-fixed mt-8   w-full">
        <thead>
          <tr className="shadow-sm">
            <th className="w-1/4  text-center py-2">Role</th>
            <th className="w-1/4 text-center py-2">Title</th>
            <th className="w-1/4  text-center py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {addedRoles.map((r, i) => (
            <tr key={i} className="shadow-sm  text-center  ">
              <td className="py-1.5">{r.role}</td>
              <td className="py-1.5">{r.title}</td>
              <td className="whitspace-normal break-words max-w-72 py-1.5">
                {r.description}
              </td>
              <td className="py-1.5">
                <button
                  onClick={() => handleRemoveRole(r._id, r)}
                  className="mr-2 p-1 px-8 shadow-md text-red-600 text-lg cursor-pointer rounded-md"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => editHandler(r._id)}
                  className="p-1 px-8 shadow-md text-green-600 text-lg cursor-pointer rounded-md"
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManager;
