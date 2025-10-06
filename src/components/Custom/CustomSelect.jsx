import Select from 'react-select';

const CustomSelect = ({
  options,
  onChange,
  placeholder = '',
  isClearable = true,
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#9ECAD6',
    }),
    placeholder: (base) => ({
      ...base,
      textAlign: 'center',
      color: 'black',
    }),
    option: (base, state) => ({
      ...base,
      textAlign: 'center',
      backgroundColor: state.isSelected ? '#DED3C4' : 'transparent',
      color: state.isSelected ? '#2198ddff' : 'black',
      '&:hover': {
        backgroundColor: '#b8e5fcff',
        cursor: 'pointer',
      },
    }),
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
