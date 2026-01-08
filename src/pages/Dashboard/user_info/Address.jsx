import {
  useFetchAddressQuery,
  useSetDefaultAddMutation,
  useRemoveAddressMutation,
} from '../../../features/shop/shopApi';
import AddressForm from '../../AddressForm';
import { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaCirclePlus } from 'react-icons/fa6';
import AddressCard from '../../../components/Cards/AddressCard';

function Address() {
  const { data: address = [] } = useFetchAddressQuery();
  const [remove] = useRemoveAddressMutation();
  const [setDefault] = useSetDefaultAddMutation();
  const [isFormAddOpen, setIsFormAddOpen] = useState(false);
  const [selectedAddress, setSelecteddAdress] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});

  // to stay defalt address checked
  useEffect(() => {
    const defaultAddress = address.find((a) => a.isDefault);
    if (defaultAddress) setSelecteddAdress(defaultAddress._id);
  }, [address]);

  const handleRemove = async (id) => {
    const toRemove = [...address].find((add) => add._id === id);
    if (!toRemove) {
      alert('item not found');
      return;
    }
    const confirRemove = window.confirm('are you sure to delete this item');
    if (!confirRemove) {
      return;
    } else {
      await remove(id);
    }
  };

  const closeModal = () => {
    setIsFormAddOpen(false);
  };

  const handleDefaultAdd = async () => {
    if (!selectedAddress) return;
    await setDefault(selectedAddress);
  };
  // const editAddressHandle = (id) => {
  //   const addressToEdit = address.find((add) => add._id === id);

  //   if (!address) {
  //     alert('no address found');
  //     return;
  //   }
  //   setIsFormAddOpen(true);
  //   setEditedAddress(addressToEdit);

  //   setEdit(id);
  // };
  console.log(address);

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gray-300  pt-8 w-full">
      <div className="flex items-center pl-2 text-sm text-white">
        <button
          onClick={() => setIsFormAddOpen(true)}
          className="py-1 px-2 shadow bg-stone-500 cursor-pointer rounded shadow flex gap-1 items-center"
        >
          <FaCirclePlus />
          Address
        </button>
      </div>
      {isFormAddOpen ? (
        <div className=" w-full fixed text-xs flex  items-center top-0  min-h-screen bg-black/40 justify-end right-0">
          <button
            onClick={() => closeModal()}
            className="bg-gray-200/50 p-1 self-start translate-x-7  cursor-pointer translate-y-20 border-stone-300  rounded"
          >
            <FaArrowLeft className="text-sm text-sky-200" />
          </button>
          <AddressForm onClose={() => closeModal()} />
        </div>
      ) : null}
      <AddressCard
        data={address}
        remove={handleRemove}
        selected={selectedAddress}
        setSelected={setSelecteddAdress}
      />
      {selectedAddress &&
        !address.find((add) => add._id === selectedAddress)?.isDefault && (
          <div className="text-center text-sm text-white">
            <button
              onClick={() => handleDefaultAdd()}
              className="bg-blue-500 py-0.5 px-2 border-b-2 border-b-stone-400 rounded shadow cursor-pointer"
            >
              Set Default
            </button>
          </div>
        )}
    </div>
  );
}

export default Address;
