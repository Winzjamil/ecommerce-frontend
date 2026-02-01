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
      // to skip if form has no key in rules key
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
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');
    } else if (name === 'size' && value) {
      processedValue = value
        .split(',')
        .map((word) => word.trim().toUpperCase());
    } else if (type === 'file') {
      const selectedFiles = Array.from(files);
      const reviews = await Promise.all(
        selectedFiles.map((file) => fileToBase64(file)),
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
// import React, { useState } from 'react';
// import { Modal, Button, Form, Input, Checkbox, Select, Radio } from 'antd';
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const { Option } = Select;

// export default function FormikAntModal() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Initial values for Formik
//   const initialValues = {
//     name: '',
//     email: '',
//     gender: '',
//     country: '',
//     agree: false,
//   };

//   // Validation schema using Yup
//   const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     gender: Yup.string().required('Gender is required'),
//     country: Yup.string().required('Country is required'),
//     agree: Yup.boolean().oneOf([true], 'You must agree'),
//   });

//   // Submit handler
//   const onSubmit = (values, { resetForm }) => {
//     console.log('Form submitted:', values);
//     setIsModalOpen(false);
//     resetForm();
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         Open Form Modal
//       </Button>

//       <Modal
//         title="Signup Form"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null} // We'll use Formik submit button
//       >
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({ values, setFieldValue }) => (
//             <FormikForm>
//               {/* Name */}
//               <div style={{ marginBottom: 12 }}>
//                 <label>Name:</label>
//                 <Field name="name" as={Input} />
//                 <div style={{ color: 'red' }}>
//                   <ErrorMessage name="name" />
//                 </div>
//               </div>

//               {/* Email */}
//               <div style={{ marginBottom: 12 }}>
//                 <label>Email:</label>
//                 <Field name="email" as={Input} />
//                 <div style={{ color: 'red' }}>
//                   <ErrorMessage name="email" />
//                 </div>
//               </div>

//               {/* Gender (Radio) */}
//               <div style={{ marginBottom: 12 }}>
//                 <label>Gender:</label>
//                 <Field name="gender">
//                   {({ field }) => (
//                     <Radio.Group
//                       {...field}
//                       onChange={(e) => setFieldValue('gender', e.target.value)}
//                     >
//                       <Radio value="male">Male</Radio>
//                       <Radio value="female">Female</Radio>
//                     </Radio.Group>
//                   )}
//                 </Field>
//                 <div style={{ color: 'red' }}>
//                   <ErrorMessage name="gender" />
//                 </div>
//               </div>

//               {/* Country (Select) */}
//               <div style={{ marginBottom: 12 }}>
//                 <label>Country:</label>
//                 <Field name="country">
//                   {({ field }) => (
//                     <Select
//                       {...field}
//                       style={{ width: '100%' }}
//                       onChange={(value) => setFieldValue('country', value)}
//                     >
//                       <Option value="usa">USA</Option>
//                       <Option value="uk">UK</Option>
//                       <Option value="philippines">Philippines</Option>
//                     </Select>
//                   )}
//                 </Field>
//                 <div style={{ color: 'red' }}>
//                   <ErrorMessage name="country" />
//                 </div>
//               </div>

//               {/* Agree (Checkbox) */}
//               <div style={{ marginBottom: 12 }}>
//                 <Field name="agree">
//                   {({ field }) => (
//                     <Checkbox
//                       checked={field.value}
//                       onChange={(e) => setFieldValue('agree', e.target.checked)}
//                     >
//                       I agree to terms
//                     </Checkbox>
//                   )}
//                 </Field>
//                 <div style={{ color: 'red' }}>
//                   <ErrorMessage name="agree" />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <Button type="primary" htmlType="submit" block>
//                 Submit
//               </Button>
//             </FormikForm>
//           )}
//         </Formik>
//       </Modal>
//     </div>
//   );
// }
