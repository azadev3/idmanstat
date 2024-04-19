import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
     email: 
     yup.string().required("Email boş qala bilməz!")
     .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email'də bu cür özəl ifadələr işlədilə bilməz!"),

     password: yup
     .string().required("Şifrəniz boşdur. Şifrə yazın.")
     .min(10, "Şifrə ən azı 10 simvoldan ibarət olmalıdır!")
     .matches(/^(?=.*\d)/, "Şifrənizdə ən azı bir rəqəm olmalıdır! Bu hesabınızın təhlükəsizliyi üçün önəmlidir."),
});