import React from 'react';
import { FaTrash, FaPencil } from 'react-icons/fa6';
function ProductTableCard({ header, data, edit, remove }) {
  return (
    <div>
      {data.length === 0 ? null : (
        <table className=" w-full text-xs bg-stone-300">
          <thead className="shadow-md">
            <tr>
              {header.map((en, i) => {
                return (
                  <th className=" p-2 1/2 bg-white " key={i}>
                    {en}
                  </th>
                );
              })}
              <th className="   bg-white "></th>
            </tr>
          </thead>
          <tbody className="bg-stone-300 text-xs border-r text-center border-r-white ">
            {data?.map((p, i) => {
              return (
                <tr key={p._id} className=" shadow text-xs">
                  <td className="w-1/2  ">
                    <div className="flex w-full flex-wrap p-1 gap-2 border-b border-b-white text-xs bg-black items-center">
                      {p.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={img.title}
                          className="w-15 h-15 object-fit rounded"
                        />
                      ))}

                      <p className=" text-white text-xs  ">{p.title}</p>
                    </div>
                  </td>
                  <td className="text-xs">{p.description}</td>
                  <td>{p.quantity}</td>
                  <td className="text-green-500 font-light  ">
                    &#8369;{p.price}
                  </td>
                  <td className=" w-1/4 ">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-0.5 px-2 bg-white flex justify-center cursor-pointer rounded-sm"
                        onClick={() => edit(p._id)}
                      >
                        <FaPencil className="text-green-600 " />
                      </button>
                      <button
                        className="p-0.5 px-2 bg-white flex justify-center cursor-pointer rounded-sm"
                        onClick={() => remove(p._id)}
                      >
                        <FaTrash className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductTableCard;
