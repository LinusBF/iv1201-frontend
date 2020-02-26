import * as yup from 'yup';

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .required('email is required')
    .email('email is not valid'),
  lastName: yup
    .string()
    .required('password is required')
    .min(6, 'password to short, must be at least 6 chars'),
});
