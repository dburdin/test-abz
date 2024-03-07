import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./SignUpForm.module.scss";

import { isInputFocused } from "../../helpers/focusManager";

import { getTruncatedText } from "../../helpers/trimUtils";

import { FetchData, PostData } from "../../api/api";

import { Position } from "../../types/types";

import { POSITIONS_ENDPOINT, TOKEN_ENDPOINT, USERS_ENDPOINT } from "../../consts/consts";

import { validationSchema } from "../../schemas/signUpValidationSchema";

export const SignUpForm = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [token, setToken] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
    resetForm,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
      positionId: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await FetchData(POSITIONS_ENDPOINT);
        setPositions(data.positions);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    const getToken = async () => {
      try {
        const { data } = await FetchData(TOKEN_ENDPOINT);
        setToken(data.token);
      } catch (error) {
        toast.error("Error fetching token");
      }
    };

    getData();
    getToken();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
            setPhotoError("File must be a JPG or JPEG image.");
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            setPhotoError("File size must not exceed 5MB.");
            return;
          }
          if (img.width < 70 || img.height < 70) {
            setPhotoError("Image resolution must be at least 70x70px.");
            return;
          }

          setPhotoError(null);
          setSelectedFile(file);
          setFileName(file.name);
          setPreviewImage(URL.createObjectURL(file));
          setFieldValue("photo", file);
        };
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      setFieldValue("photo", null);
      setSelectedFile(null);
      setFileName("");
      setPreviewImage(null);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, phone, positionId, photo } = values;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position_id", positionId.toString());
    formData.append("photo", photo);
    try {
      const response = await PostData(USERS_ENDPOINT, token, formData);

      if (response.status === 200 || response.status === 201) {
        setIsSent(true);
        toast.success("Signup successful");
        resetForm();
        setIsSent(true);
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during signup");
    }
  };

  const handlePreviewClick = () => {
    setSelectedFile(null);
    setFileName("");
    setPreviewImage(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles.signUpForm}>
        <div className={styles.inputContainer}>
          <input
            className={
              errors["name"] && touched["name"]
                ? `${styles.input} ${styles.errorInput}`
                : styles.input
            }
            type="text"
            id="name"
            name="name"
            maxLength={50}
            placeholder=" "
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className={styles.placeholder} htmlFor="name">
            Your name
          </label>
          {errors.name && touched.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors["email"] && touched["email"]
                ? `${styles.input} ${styles.errorInput}`
                : styles.input
            }
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className={styles.placeholder} htmlFor="email">
            Email
          </label>
          {errors.email && touched.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={
              errors["phone"] && touched["phone"]
                ? `${styles.input} ${styles.errorInput}`
                : styles.input
            }
            type="phone"
            id="phone"
            name="phone"
            placeholder=" "
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className={styles.placeholder} htmlFor="phone">
            Phone
          </label>
          {errors.phone && touched.phone ? (
            <p className={styles.error}>{errors.phone}</p>
          ) : (
            !isInputFocused("phone") && <p className={styles.tip}>+38 (XXX) XXX - XX - XX</p>
          )}
        </div>

        <div className={styles.radioContainer}>
          <p className={styles.radioTitle}>Select your position</p>
          {positions.map(({ name, id }) => (
            <label key={id} className={styles.radioLabel}>
              <input
                className={styles.visuallyHidden}
                type="radio"
                name="positionId"
                value={id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className={styles.outerCircle}></span>
              <span className={styles.innerCircle}></span>
              <span className={styles.radioLabelText}>{name}</span>
            </label>
          ))}
        </div>

        <div className={styles.upload}>
          <div className={styles.uploadContainer}>
            <label
              className={`${styles.uploadLabel} ${photoError && styles.errorUploadInput}`}
              htmlFor="photo"
            >
              Upload
            </label>
            <div
              className={`${styles.uploadInputContainer} ${photoError && styles.errorUploadInput}`}
            >
              <label
                title={selectedFile ? getTruncatedText(fileName) : "Upload your photo"}
                className={styles.uploadInput}
                htmlFor="photo"
              >
                <input
                  onChange={handleFileChange}
                  hidden
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".jpg, .jpeg"
                />
              </label>
              {photoError && <p className={styles.error}>{photoError}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting && styles.disabled}`}
        >
          Sign Up
        </button>
      </form>

      {selectedFile && previewImage && (
        <div>
          <img
            onClick={handlePreviewClick}
            style={{ borderRadius: "4px", marginBottom: "10px", cursor: "pointer" }}
            src={previewImage}
            alt="Preview"
            width={200}
          />
        </div>
      )}

      {isSent && (
        <div>
          <h2 className={styles.registeredHeading}>User successfully registered</h2>
          <img width={328} src="/svg/success-image.svg" alt="registered successfully" />
        </div>
      )}
    </>
  );
};
