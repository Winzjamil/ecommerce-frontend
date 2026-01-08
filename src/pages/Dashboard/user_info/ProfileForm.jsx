import React from 'react';
import Form from 'antd/es/form/Form';
import Input from 'antd/es/input/Input';
import { useForm } from '../../../components/Hooks';

function ProfileForm() {
  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: {
      profile: null,
      bio: '',
    },
  });

  return (
    <div className=" bg-slate-500 w-full p-2 rounded  max-w-80 mr-2  text-xs">
      <Form onSubmit={submitHandler} header="hey im header">
        <label className="text-white">
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            placeholder="enter bio here..."
            className="h-10 text-base w-full outline-none max-w-100 rounded placeholder:text-white p-1 bg-black "
            onChange={changeHandler}
          ></textarea>
        </label>
        <div className="text-center flex ">
          <label
            className="bg-black p-1 rounded cursor-pointer text-white"
            htmlFor="profile"
          >
            profile
          </label>
          <input
            className="hidden block"
            type="file"
            id="profile"
            value={formData.profile}
            name="profile"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full flex items-center text-sm text-white mt-4 justify-center">
          <button
            type="submit"
            className="  bg-blue-800 px-2  cursor-pointer border-b border-b-white py-0.5 rounded "
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default ProfileForm;
