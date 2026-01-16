import { useRef } from 'react';
import Form from 'antd/es/form/Form';
import { useForm } from '../../../components/Hooks';

function ProfileForm() {
  const { formData, changeHandler, submitHandler, errors } = useForm({
    initialVal: {
      profile: null,
      bio: '',
    },
  });
  const profileRef = useRef(null);

  return (
    <Form onSubmit={submitHandler}>
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

      <label
        className="bg-black p-1  rounded cursor-pointer text-white "
        htmlFor="profile"
      >
        Choose Profile
      </label>
      <input
        type="file"
        id="profile"
        name="profile"
        onChange={changeHandler}
        accept="image/*"
        ref={profileRef}
        className="!hidden"
      />

      <div className="w-full flex items-center text-sm text-white mt-4 justify-center">
        <button
          type="submit"
          className="  bg-blue-800 px-2  cursor-pointer border-b border-b-white py-0.5 rounded "
        >
          Submit
        </button>
      </div>
    </Form>
  );
}

export default ProfileForm;
