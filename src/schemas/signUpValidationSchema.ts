import * as Yup from "yup";

import { name, phone, email } from "../regex/regex";

export const validationSchema = Yup.object({
  name: Yup.string().min(2, "Too Short!").required("Required").matches(name, {
    message:
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),
  phone: Yup.string().min(5, "Too Short!").required("Required").matches(phone, {
    message: "Phone number must be digits and should start with +380",
  }),
  email: Yup.string().min(2, "Too Short!").required("Required").matches(email, {
    message:
      "Invalid email address format. Please enter a valid email address (e.g., name@example.com)",
  }),
  positionId: Yup.string().required("Required"),
  photo: Yup.string().required("Required"),
});
