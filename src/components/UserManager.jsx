import { FaTrash, FaArrowLeft } from 'react-icons/fa6';
import { FaSave, FaEdit } from 'react-icons/fa';
import Input from './Input';
import { LuCirclePlus } from 'react-icons/lu';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TbCancel } from 'react-icons/tb';
import Select from 'react-select';

function UserManager() {
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [newRole, setNewRole] = useState({
    role: '',
    title: '',
    description: '',
  });

  const [blockedRoles, setBlockedRoles] = useState([]);
  const [addedRoles, setAddedRoles] = useState([]);

  useEffect(() => {
    const fetchRolesData = async () => {
      const storedRoles = await fetch('http://localhost:8080/roles');
      const roles = await storedRoles.json();
      setAddedRoles(roles.data);

      const res = await fetch('http://localhost:8080/block');
      const result = await res.json();
      const blockedRoles = result.data[0].blocked;
      if (!blockedRoles) {
        alert('soemething went wrong');
      }
      setBlockedRoles(blockedRoles);
    };
    fetchRolesData();
  }, []);

  const handleCheckboxChange = async (role) => {
    const blocked = blockedRoles.includes(role)
      ? blockedRoles.filter((r) => r !== role)
      : [...blockedRoles, role];

    const res = await fetch('http://localhost:8080/block', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocked }),
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
      alert('Error deleting role from database');
      console.error(err);
    }
  };

  //////////////////////////////////////////////////////////////////////
  const addHandler = async () => {
    const { role, title, description } = newRole;

    if ((!role.trim(), !title.trim(), !description.trim())) {
      alert('all fields are required');
      return;
    }

    if (edit !== null) {
      const updated = [...addedRoles];
      updated[edit] = { ...updated[edit], ...newRole };

      if (blockedRoles.includes(updated[edit].role)) {
        alert(`Blocked ${updated[edit].role} Cannot Update`);
        setEdit(null);
        setNewRole([]);
        setModalOpen(false);
        return;
      }

      const res = await fetch(
        `http://localhost:8080/role/${updated[edit]._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRole),
        }
      );

      if (!res.ok) {
        console.error('Failed to update role:', res.statusText);
        alert(`failed to update${updated[edit]}`);
        return;
      }
      const savedEdit = await res.json();
      setAddedRoles((prev) =>
        prev.map((roleItem) =>
          roleItem._id === savedEdit.data._id ? savedEdit.data : roleItem
        )
      );
    } else {
      const isDuplicate = [...addedRoles].some((r) => r.role === role);
      if (isDuplicate) {
        alert('Role already exists!');
        setNewRole({ role: '', title: '', description: '' });
        return;
      }

      const res = await fetch('http://localhost:8080/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      });
      const result = await res.json();
      setAddedRoles(result.data);
    }
    setNewRole({ role: '', title: '', description: '' });
    // setModalOpen(false);
  };

  const editHandler = (roleId) => {
    const selectedRole = [...addedRoles].find((role) => role._id === roleId);
    if (!selectedRole) {
      alert('role not found');
    }

    setNewRole(selectedRole);
    setEdit(roleId);
    setModalOpen(true);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewRole({
      ...newRole,
      [name]: value.trim().toLowerCase(),
    });
  };

  const role = ['user', 'editor', 'business affiliate', 'huhuuhuhu'];

  const optionsData = role.map((r) => ({
    value: r,
    label: r.charAt(0).toUpperCase() + r.slice(1),
  }));

  return (
    <div className="bg-white p-2 ">
      <div className="mb-4">
        <NavLink to={'/adminDashboard'}>
          <FaArrowLeft />
        </NavLink>
      </div>
      {addedRoles &&
        addedRoles.map((r, i) => {
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-1  bg-blue-400  gap-1.5  "
            >
              <div className="flex gap-1 flex-col rounded-md  text-white justify-center items-center">
                <label className="bg-red-600">
                  <input
                    type="checkbox"
                    value={r.role}
                    onChange={() => handleCheckboxChange(r.role)}
                    checked={blockedRoles.includes(r.role)}
                  />

                  {r.role.charAt(0).toUpperCase() + r.role.slice(1)}
                </label>
              </div>
            </div>
          );
        })}

      <table className="table-fixed mt-8   w-full">
        <thead>
          <tr className="shadow-sm">
            <th className="w-1/4  text-center py-2  ">Role</th>
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

      {!modalOpen ? (
        <div className="flex items-center justify-center  p-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
          >
            <LuCirclePlus />
          </button>
        </div>
      ) : (
        <div className="p-4 flex items-center justify-center bg-black/20  fixed inset-0">
          <div className=" absolute h-full right-0 p-4 rounded-md flex flex-col items-center justify-center gap-4 shadow-md ">
            <div className="absolute top-6 left-3">
              {edit !== null ? null : (
                <button
                  onClick={() => setModalOpen(false)}
                  className=" cursor-pointer"
                >
                  <FaArrowLeft />
                </button>
              )}
            </div>
            <div className="bg-white p-4 rounded-md flex gap-3 flex-col ">
              <div>
                <label htmlFor="Role" className="block font-bold ">
                  Role
                </label>
                <Select
                  id="Role"
                  name="role"
                  value={
                    optionsData.find((opt) => opt.value === newRole.role) ||
                    null
                  }
                  onChange={(selectedOption) =>
                    changeHandler({
                      target: {
                        name: 'role',
                        value: selectedOption ? selectedOption.value : '',
                      },
                    })
                  }
                  options={optionsData}
                  placeholder="Select Role"
                  isClearable
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: 'blue',
                      boxShadow: 'none',
                      '&:hover': { borderColor: 'orange' },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#DED3C4'
                        : 'transparent',
                      color: state.isSelected ? '#5EABD6' : 'black',
                      '&:hover': {
                        backgroundColor: '#91C8E4',
                        cursor: 'pointer',
                      },
                    }),
                  }}
                />
              </div>

              <Input
                id="Title"
                name="title"
                required
                value={newRole.title || ''}
                onChange={changeHandler}
                label="Title"
                className="border border-blue-700 p-1.5 text-center rounded-sm outline-none bg-white focus:border-orange-400  w-72"
              />

              <div className="w-full">
                <label className="block mt-1 font-bold" htmlFor="Description">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  id="Description"
                  value={newRole.description || ''}
                  placeholder="Enter Product Description Here.."
                  onChange={changeHandler}
                  className="max-w-96 w-full  text-base h-24 p-2.5 rounded-md  outline-none text-center border border-blue-700 focus:border-orange-400  "
                ></textarea>
              </div>

              {edit !== null ? (
                <div className="flex gap-4 items-center justify-center">
                  <button
                    onClick={addHandler}
                    className="shadow-md px-4 py-1.5 text-lg text-green-600 cursor-pointer rounded-md bg-white hover:bg-green-100"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={() => {
                      setEdit(null);
                      setModalOpen(false);
                      setNewRole([]);
                    }}
                    className="shadow-md px-4 py-1.5 rounded-md  cursor-pointer cursor-pointe text-2xl text-orange-300 hover:bg-green-100"
                  >
                    <TbCancel />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={addHandler}
                    className="shadow-md px-4 py-1.5 rounded-md bg-white hover:bg-green-100"
                  >
                    <LuCirclePlus />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManager;
