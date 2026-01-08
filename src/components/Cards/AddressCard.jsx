import { FaTrash, FaPencil } from 'react-icons/fa6';

function AddressCard({ data, remove, selected, setSelected }) {
  const header = ['Name', 'Region', 'Province', 'City', 'Barangay'];
  return (
    <div className="p-1 rounded">
      {data.length === 0 ? (
        <div className="flex w-full justify-center p-1  bg-white">
          <span className="p-2 bg-slate-300 rounded">
            your address is empty
          </span>
        </div>
      ) : (
        <table className="w-full bg-white text-xs rounded  ">
          <thead>
            <tr className="shadow">
              {header.map((h, i) => (
                <th key={i} className="w-1/6 p-1 bg-white ">
                  {h}
                </th>
              ))}
              <th className="w-1/6 p-1 bg-white"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d._id} className="text-center  shadow ">
                <td className="w-1/8 text-center p-2 ">
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="radio"
                      value={d._id}
                      checked={selected === d._id}
                      onChange={() => setSelected(d._id)}
                      className="accent-green-500 border-white"
                    />

                    <div className="flex flex-col px-2 ">
                      <span>{d.fullName}</span>
                      <span>{d.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p">
                  <div>{d.region}</div>
                </td>
                <td className="p">{d.province} </td>
                <td className="p">{d.city} </td>
                <td className="p">{d.barangay} </td>
                <td className="p">
                  <div className="flex gap-2 items-center justify-center">
                    <button className="px-2 py-0.5 shadow cursor-pointer hover:bg-gray-200 hover:rounded">
                      <FaPencil className="text-green-500" />
                    </button>
                    <button
                      onClick={() => remove(d._id)}
                      className="px-2 py-0.5 shadow cursor-pointer hover:bg-gray-200 hover:rounded"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddressCard;
