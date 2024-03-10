import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./SignUpForm.module.scss";

import { Loader } from "../Loader";

import { getTruncatedText } from "../../helpers/trimUtils";

import { FetchData, PostData } from "../../api/api";

import { Position } from "../../types/types";

import { POSITIONS_ENDPOINT, TOKEN_ENDPOINT, USERS_ENDPOINT } from "../../consts/consts";

import { validationSchema } from "../../schemas/signUpValidationSchema";

export const SignUpForm = ({ setStatus }: { setStatus: (status: boolean) => void }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    resetForm,
    isSubmitting,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
      positionId: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async () => {
      const { name, email, phone, positionId, photo } = values;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("position_id", positionId.toString());
      formData.append("photo", photo);
      try {
        setIsLoading(true);
        const response = await PostData(USERS_ENDPOINT, token, formData);

        if (response.status === 200 || response.status === 201) {
          toast.success("Signup successful");
          resetForm();
          setStatus(true);
          handlePreviewRemove();
        } else {
          toast.error("Signup failed");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error during signup");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionsResponse = await FetchData(POSITIONS_ENDPOINT);
        setPositions(positionsResponse.data.positions);

        const tokenResponse = await FetchData(TOKEN_ENDPOINT);
        setToken(tokenResponse.data.token);
      } catch (error) {
        toast.error("Error fetching data or token");
      }
    };

    fetchData();
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
          setPreviewImage(URL.createObjectURL(file));
          setFieldValue("photo", file);
        };
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
      setFieldValue("photo", "");
    }
  };

  const handlePreviewRemove = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setFieldValue("photo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
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
            <p className={styles.tip}>+38 (XXX) XXX - XX - XX</p>
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
                title={selectedFile ? getTruncatedText(selectedFile.name) : "Upload your photo"}
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

        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className={`${styles.submitButton}  ${(!isValid || isSubmitting) && styles.disabled}`}
          >
            Sign Up
          </button>
        )}
      </form>

      {selectedFile && previewImage && (
        <div>
          <img
            onClick={handlePreviewRemove}
            style={{ borderRadius: "4px", marginTop: "40px", cursor: "pointer" }}
            src={previewImage}
            alt="Preview"
            width={200}
          />
        </div>
      )}
    </>
  );
};
