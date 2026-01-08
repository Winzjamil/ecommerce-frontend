import { useState } from 'react';
import ProfileForm from './ProfileForm';
import { RxAvatar } from 'react-icons/rx';
import { getAuthData } from '../../../enums';

function Profile() {
  const user = getAuthData('user');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-gray-300 w-full pt-5 h-screen">
      <div className="bg-gray-200 w-full flex flex-col gap-20 items-center text-white text-xs">
        <div className="bg-gray-400 w-full flex items-center  justify-center">
          {user ? (
            <img
              src={user.coverPhoto}
              alt=""
              className="w-full h-100 object-fit"
            />
          ) : null}
        </div>
        {user.profile ? (
          <img
            src={user.profile}
            alt={user.userName}
            className="h-30 w-30 rounded-full absolute top-[65%] p-1 bg-sky-200 "
          />
        ) : (
          <RxAvatar className="h-30 w-30 rounded-full absolute top-[65%] bg-gray-300 text-black" />
        )}
        <button
          className="p-1 bg-black rounded cursor-pointer shadow"
          onClick={() => setIsOpen(true)}
        >
          add profile
        </button>
      </div>
      {isOpen && (
        <div className=" w-full fixed top-0 right-0 text-xs flex text-white items-center h-screen bg-black/40 justify-center ">
          <button
            onClick={() => setIsOpen(false)}
            className=" p-1 self-start translate-y-40 translate-x-2 rounded bg-black/60 cursor-pointer hover:bg-red-500"
          >
            X
          </button>
          <ProfileForm />
        </div>
      )}
    </div>
  );
}

export default Profile;
