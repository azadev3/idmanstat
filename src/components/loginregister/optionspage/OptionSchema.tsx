import * as yup from 'yup';

export const OptionSchema = yup.object().shape({
     username: yup
     .string().required("Ad boş qala bilməz!")
     .min(3, "Adınız minimum 3 hərf olmalıdır")
     .max(20, "Adınız çox uzundur!")
     .matches(/^[\w.]*$/, "Adda özəl işarələr olmaz. Yalnız rəqəm, alt xətt və nöqtə istifadə edə bilərsiniz.")
})