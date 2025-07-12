import * as yup from 'yup';

export const semesterSchema = yup.object({
    semester_num: yup.number().required("Semester Number is  required."),
    semester_text: yup.string().min(3,"Must Contain 3 Character.").required("Semester Text is  required.")
})