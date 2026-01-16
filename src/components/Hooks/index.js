import { useState } from 'react';

export const useForm = ({ initialVal = {}, onSubmit, type = 'login' }) => {
  const [formData, setFormData] = useState(initialVal);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ formData, type });
    setFormData(initialVal);
  };

  const validate = () => {
    const regex = /^[a-zA-Z\s]+$/;

    const rules = {
      userName: {
        required: 'User name is required',
        // pattern: [regex, 'Invalid fullName'],
      },
      storeName: {
        required: 'Store name is required',
      },

      size: {
        required: 'Size is required',
        pattern: [regex, 'Invalid size'],
      },
      password: {
        required: 'Password is required',
      },
      confirmPassword: {
        required: 'Password is required',
        match: ['password', 'Passwords do not match'],
      },
      email: {
        required: 'Email is required',
      },
      quantity: {
        required: 'Quantity is required',
      },
      category: {
        required: 'Cetogery is required',
      },
      size: {
        required: 'Size is required',
      },
      description: {
        required: 'Description is required',
      },
      price: { required: 'price is required' },
      title: {
        required: 'Name  is required',
      },
    };

    const errors = {};

    for (const key in rules) {
      if (!(key in formData)) continue;

      const value = formData[key];
      const rule = rules[key];

      // Required
      if (rule.required && !value) {
        errors[key] = rule.required;
        continue;
      }

      // Pattern matching
      if (rule.pattern && !rule.pattern[0].test(value.trim())) {
        errors[key] = rule.pattern[1];
        continue;
      }

      // Matching fields (password confirmation)
      if (rule.match) {
        const [target, msg] = rule.match;
        if (value !== formData[target]) errors[key] = msg;
      }
    }

    return errors;
  };
  //bs 64 converter
  const fileToBase64 = (objFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(objFile);
    });

  const changeHandler = async (e) => {
    const { name, value, type, files } = e.target;
    const nameValue = ['userName', 'storeName', 'title'];
    let processedValue = value;
    if (nameValue.includes(name) && value) {
      processedValue = value
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
    } else if (name === 'size' && value) {
      processedValue = value
        .split(',')
        .map((word) => word.trim().toUpperCase());
    } else if (type === 'file') {
      const selectedFiles = Array.from(files);
      const reviews = await Promise.all(
        selectedFiles.map((file) => fileToBase64(file))
      );

      setFormData((prev) => ({
        ...prev,
        [name]: selectedFiles ? selectedFiles : null,
      }));

      setPreview((prev) => ({
        ...prev,
        [name]: reviews || null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    setErrors((err) => ({
      ...err,
      [name]: null,
    }));
  };

  return {
    formData,
    submitHandler,
    changeHandler,
    errors,
    setErrors,
    setFormData,
    preview,
    setPreview,
  };
};
