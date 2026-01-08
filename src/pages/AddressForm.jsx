import Form from '../components/Form';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import { FaAsterisk } from 'react-icons/fa6';
import { useForm } from '../components/Hooks';
import { tabHead, USER_ADDRESS } from '../enums';
import {
  useAddAddressMutation,
  useGetPsgcQuery,
} from '../features/shop/shopApi';

export default function AddressForm({ onClose, isEdit, editedAddress }) {
  const [step, setStep] = useState('region');
  const [isOpen, setIsopen] = useState(false);
  const [activeCodes, setActiveCodes] = useState({
    region: null,
    province: null,
    city: null,
    barangay: null,
  });

  const { data: region = [] } = useGetPsgcQuery({ type: 'regions' });
  const { data: province = [] } = useGetPsgcQuery(
    {
      type: 'provinces',
      regionCode: activeCodes.region,
    },
    {
      skip: !activeCodes.region, // skip if region not selected
    }
  );
  const { data: city = [] } = useGetPsgcQuery(
    {
      type: 'cities',
      provinceCode: activeCodes.province,
    },
    {
      skip: !activeCodes.province,
    }
  );

  const { data: barangay = [] } = useGetPsgcQuery(
    {
      type: 'barangays',
      cityCode: activeCodes.city,
    },
    {
      skip: !activeCodes.city,
    }
  );
  const [addAddress] = useAddAddressMutation();

  const { formData, submitHandler, changeHandler, setFormData, errors } =
    useForm({
      initialVal: {
        fullName: '',
        region: '',
        province: '',
        city: '',
        barangay: '',
        postalCode: '',
        street: '',
        phone: '',
      },

      onSubmit: async ({ formData }) => {
        const updatedData = {
          ...formData,
          phone: Number(formData.phone),
          postalCode: formData.postalCode,
        };

        await addAddress(updatedData).unwrap();
        onClose();
      },
    });

  const selectAddressHandle = (addObj, key) => {
    setActiveCodes((prev) => ({
      ...prev,
      [key]: addObj.psgc_id,
    }));

    setFormData((prev) => ({
      ...prev,
      [key]: addObj.name,
    }));

    key === 'city' &&
      setFormData((prev) => ({
        ...prev,
        postalCode: addObj.zip_code,
      }));

    key === USER_ADDRESS.GET_REGION
      ? setStep(USER_ADDRESS.GET_PROVINCE)
      : key === USER_ADDRESS.GET_PROVINCE
      ? setStep(USER_ADDRESS.GET_CITY)
      : key === USER_ADDRESS.GET_CITY
      ? setStep(USER_ADDRESS.GET_BARANGAY)
      : //to close the drop down, and reset the data rendered to region when user open dropdown again
        (() => {
          setIsopen(false);
          setStep('region');
        })();
  };

  const renderList = () => {
    switch (step) {
      case 'region':
        return region.map((r) => (
          <p
            key={r.name}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_REGION)}
            className={
              r.psgc_id === activeCodes
                ? 'border-b  text-xs cursor-pointer  '
                : '  text-xs cursor-pointer '
            }
          >
            {r.name}
          </p>
        ));

      case 'province':
        return province.map((r) => (
          <p
            key={r.name}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_PROVINCE)}
            className={
              r.psgc_id === activeCodes
                ? 'border-b  text-xs cursor-pointer  '
                : '  text-xs cursor-pointer '
            }
          >
            {r.name}
          </p>
        ));
      case 'city':
        return city.map((r) => (
          <p
            key={r.psgc_id}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_CITY)}
            className={
              r.psgc_id === activeCodes
                ? 'border-b  text-xs cursor-pointer  '
                : '  text-xs cursor-pointer '
            }
          >
            {r.name}
          </p>
        ));
      case 'barangay':
        return barangay.map((r) => (
          <p
            key={r.name}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_BARANGAY)}
            className={
              r.psgc_id === activeCodes
                ? 'border-b  text-xs cursor-pointer  '
                : '  text-xs cursor-pointer  '
            }
          >
            {r.name}
          </p>
        ));
    }
  };

  const fullAddress = [
    formData.region,
    formData.province,
    formData.city,
    formData.barangay,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Form
      onSubmit={submitHandler}
      header="Complete the form to proceed"
      isAddress
    >
      <div className="flex gap-2 flex-wrap">
        <Input
          label="Name"
          placeholder="Enter name here..."
          name="fullName"
          value={formData.fullName}
          onChange={changeHandler}
          autoComplete="fullName"
        />
        <Input
          label="Contact No."
          placeholder=" Enter phone# here..."
          type="number"
          onChange={changeHandler}
          name="phone"
          value={formData.phone}
          autoComplete="tel"
        />
        <div className="w-full flex flex-col  text-xs font-light text-stone-300 gap-1   mt-2">
          <label
            htmlFor="address"
            className="flex items-center gap-1 text-xs leading-none"
          >
            <FaAsterisk size={8} color="red" />
            Region Province City Barangay
          </label>
          <input
            type="text"
            id="address"
            className="w-full bg-black cursor-pointer placeholder:text-xs outline-none p-1.5 rounded placeholder:text-white/70 placeholder:font-light"
            onClick={() => setIsopen(!isOpen)}
            placeholder="Ragion City Province Barangay"
            readOnly
            value={fullAddress}
          />
          {isOpen && (
            <div className="max-h-64 absolute w-full max-w-84 top-[53%] overflow-y-auto flex flex-col items-center backdrop-blur  ">
              <div className="sticky top-0 bg-gray-500 flex justify-between items-center w-full pt-1 px-2 border-b border-b-white ">
                {tabHead.map((t, i) => (
                  <h3
                    key={i}
                    className={
                      t === step.charAt(0).toUpperCase() + step.slice(1)
                        ? 'border-b border-b-sky-200'
                        : ''
                    }
                  >
                    {t}
                  </h3>
                ))}
              </div>

              <div className="  text-white flex flex-col w-full p-2 bg-stone-400 border-x-white border-x ">
                {renderList()}
              </div>
            </div>
          )}
        </div>
        <Input
          label="Postal Code"
          placeholder={formData.postalCode || 'postal code'}
          name="postalCode"
          value={formData.postalCode}
          onChange={changeHandler}
        />
        <Input
          label="Street"
          placeholder="Enter street here..."
          name="street"
          value={formData.street}
          onChange={changeHandler}
        />
      </div>
      <div className="w-full text-center text-white text-xs mt-2">
        <button
          type="submit"
          className=" bg-black   px-4 cursor-pointer  py-1 rounded-xl transform transition duration-600  shadow-[0_4px_6px_0_rgba(255,255,255,0.5)] hover:scale-90 "
        >
          Submit
        </button>
      </div>
    </Form>
  );
}
