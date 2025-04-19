import * as Yup from 'yup';

export const formValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z\s]+$/, 'First Name must contain only letters'),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Last Name must contain only letters'),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address',
    ),
  phone: Yup.string()
    .required('Phone is required')
    .min(10)
    .matches(/^\d+$/, 'Only digits are allowed'),
});
