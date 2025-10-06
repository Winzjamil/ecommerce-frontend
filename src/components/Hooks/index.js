import { useContext, useState } from 'react';
function useForm({ initialVal = {}, onSubmit }) {
  const [formData, setFormData] = useState(initialVal);
  const [errors, setErrors] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
    setFormData(initialVal);
  };
  ////////////////////////////////////////////////////////////////////////
  const validate = () => {
    const newErrors = {};
    if ('fullName' in formData) {
      if (!formData.fullName) {
        newErrors.fullName = 'Name is required';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        newErrors.fullName = 'Fullname must contain letters only';
      }
    }
    if ('email' in formData && !formData.email) {
      newErrors.email = 'Email is required';
    }
    if (
      'confirmPassword' in formData &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };
  ///////////////////////////////////////////////////////
  const changeHandler = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'fullName' && value) {
      processedValue = value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: null,
    }));
  };

  return {
    formData,
    submitHandler,
    changeHandler,
    errors,
  };
}
export default useForm;
