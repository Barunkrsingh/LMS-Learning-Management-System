import * as yup from 'yup';

export const registerSchema = yup.object({
    department_name: yup.string().min(8, "Department name must contain 8 characters.").required("Department Name is required."),
    email:yup.string().email("It must be an Email.").required("Email is required"),
    Owner_name:yup.string().min(3, "Owner name must have 8 characters.").required("It is required filed."),
    password:yup.string().min(8,"Password must contain 8 characters.").required("Password is a required field."),
    confirm_password:yup.string().oneOf([yup.ref('password')],"Confirm Password Must Match With Password.").required("Conform password is required field.")
})