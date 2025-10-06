import { useState } from 'react';

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    setIsOpen(false); // close after selection
  };

  return (
    <div>
      <span
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button>
          {isOpen ? <span> Menu &#9660;</span> : <span> Menu &#9650;</span>}
        </button>
        {isOpen && (
          <ul className=" p-2 block">
            <li onClick={() => handleOptionClick('Profile')}>Profile</li>
            <li onClick={() => handleOptionClick('Settings')}>Settings</li>
            <li onClick={() => handleOptionClick('Logout')}>Logout</li>
          </ul>
        )}
      </span>
    </div>
  );
}

export default DropDown;
