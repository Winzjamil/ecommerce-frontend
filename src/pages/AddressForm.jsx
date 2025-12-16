import { useEffect, useState } from 'react';
import Form from '../components/Form';
import Input from '../components/Input';
import { Select } from 'antd';
import { useForm } from '../components/Hooks';
import { FaAsterisk } from 'react-icons/fa6';
import { userAuth } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { tabHead, USER_ADDRESS } from '../enums';
export default function AddressForm() {
  const address = useSelector((state) => state.user.address);
  const user = useSelector((state) => state.user.user);
  console.log('ADDRESS', address);

  const [isOpen, setIsopen] = useState(false);
  const [step, setStep] = useState('region');
  const [activeCodes, setActiveCodes] = useState({
    region: null,
    province: null,
    city: null,
    barangay: null,
  });
  const [region, setRegion] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [barangay, setBarangay] = useState([]);
  const dispatch = useDispatch();
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
          postalCode: Number(formData.postalCode),
          id: user.id,
        };
        await dispatch(userAuth({ type: 'address', credentials: updatedData }));
      },
    });

  async function fetchData(url, setData) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setData(data);
      } else {
        console.error(res.message);
      }
    } catch (err) {
      console.error('PSGC fetch error:', err);
      setData([]);
    }
  }
  useEffect(() => {
    // Determine what to fetch based on step
    let url = null;
    let setter = null;

    if (step === USER_ADDRESS.GET_PROVINCE && activeCodes.region) {
      url = `https://psgc.cloud/api/regions/${activeCodes.region}/provinces`;

      setter = setProvince;
    } else if (step === USER_ADDRESS.GET_CITY && activeCodes.province) {
      url = `https://psgc.cloud/api/provinces/${activeCodes.province}/cities-municipalities`;
      setter = setCity;
    } else if (step === USER_ADDRESS.GET_BARANGAY && activeCodes.city) {
      url = `https://psgc.cloud/api/cities-municipalities/${activeCodes.city}/barangays`;
      setter = setBarangay;
    }

    if (url && setter) {
      fetchData(url, setter);
    }
  }, [activeCodes, step]);

  useEffect(() => {
    const url = 'https://psgc.cloud/api/regions';
    fetchData(url, setRegion);
  }, []);

  const selectAddressHandle = (addObj, key) => {
    setActiveCodes((prev) => ({
      ...prev,
      [key]: addObj.code,
    }));

    setFormData((prev) => ({
      ...prev,
      [key]: addObj.name,
    }));

    key === 'city' &&
      setFormData((prev) => ({
        ...prev,
        postalCode: addObj.zip_code || 'yruun',
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
  //////////////////////////////////////////////////
  const renderList = () => {
    switch (step) {
      case 'region':
        return region.map((r) => (
          <p
            key={r.code}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_REGION)}
            className={
              r.code === activeCodes
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
            key={r.code}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_PROVINCE)}
            className={
              r.code === activeCodes
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
            key={r.code}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_CITY)}
            className={
              r.code === activeCodes
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
            key={r.code}
            onClick={() => selectAddressHandle(r, USER_ADDRESS.GET_BARANGAY)}
            className={
              r.code === activeCodes
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
    <div className="   min-h-screen flex justify-center   bg-black">
      <Form onSubmit={submitHandler} header="Complete the form to proceed">
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
          <div className="w-full flex flex-col items-center text-white text-xs mt-2">
            <label
              className="block font-extralight absolute top-[47%] text-stone-400 backdrop-blur  leading-none text-xs flex items-center text-white "
              htmlFor="address"
            >
              <span className=" text-xs  mr-0.5 text-red-600">
                <FaAsterisk />
              </span>
              Region Province city Barangay
            </label>
            <input
              type="text"
              id="address"
              className="w-full border border-white/20 text-xs placeholder:text-xs outline-none p-2 rounded-t-sm bg-transparent placeholder:text-white/70 placeholder:font-light"
              onClick={() => setIsopen(!isOpen)}
              placeholder="Ragion City Province Barangay"
              readOnly
              value={fullAddress}
            />
            {isOpen && (
              <div className="max-h-64 absolute w-full max-w-104 top-[52%] overflow-y-auto flex flex-col items-center backdrop-blur  ">
                <div className="sticky top-0 bg-stone-500 flex justify-between items-center w-full pt-1 px-2 border-b border-b-white ">
                  {tabHead.map((t, i) => (
                    <h3 key={i}>{t}</h3>
                  ))}
                </div>

                <div className="  text-white flex flex-col w-full p-2 bg-stone-600 border-x-white border-x ">
                  {renderList()}
                </div>
              </div>
            )}
          </div>
          <Input
            label="Postal Code"
            placeholder={formData.postalCode}
            name="street"
            value={formData.postalCode}
            readOnly
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
    </div>
  );
}
