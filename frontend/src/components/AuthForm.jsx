// AuthForm.jsx - IMPROVED: Pure UI Component
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { toast } from "react-toastify";

const AuthForm = forwardRef(
  ({ mode = "login", fields = [], onSubmit, footer, loading = false }, ref) => {
    const dialogRef = useRef();
    const inputRef = useRef();
    const [formData, setFormData] = useState({});
    const [validationError, setValidationError] = useState(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
        // Reset form when opening
        setFormData({});
        setValidationError("");
      },
      close: () => dialogRef.current?.close(),
      reset: () => {
        setFormData({});
        setValidationError(null);
      },
    }));

    const validateForm = () => {
      const newErrors = {};

      // ✅ UI Logic: Client-side validation

      if (mode === "signup") {
        const isOnlyDigits = /^\d{10}$/.test(formData.phone);

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        if (formData.password.length < 6) {
          newErrors.password = "Password should be at least 6 characters long";
        }
        if (formData.phone.length !== 10 || !isOnlyDigits) {
          newErrors.phone =
            "Phone number should be only numbers and consist of exactly 10 digits";
        }
      }

      setValidationError(newErrors);
      return Object.keys(newErrors).length === 0; // ✅ Returns true if no errors
    };

    useEffect(() => {
      if (dialogRef.current?.open) {
        inputRef.current?.focus();
      }
    }, [dialogRef.current?.open]);

    const handleChange = (e) => {
      const { name, value } = e.target;

      const updatedErrors = { ...validationError };

      if ((mode === "signup") || (mode=== "login")) {
        if (
          name === "phone" &&
          updatedErrors.phone &&
          value.length === 10 &&
          /^\d{10}$/.test(value)
        ) {
          updatedErrors.phone = null;
        }
        if (
          name === "confirmPassword" &&
          updatedErrors.confirmPassword &&
          value === formData.password
        ) {
          updatedErrors.confirmPassword = null;
        }
        if (
          name === "password" &&
          updatedErrors.password &&
          value.length >= 6
        ) {
          updatedErrors.password = null;
        }
      }

      setValidationError(updatedErrors);
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log(validationError);

      if (!validateForm()) {
        toast.error("All required fields must be filled correctly.");
        return; // ❗ This stops submission when validation fails
      }

      // const requiredFields = fields.filter((field) => field.required !== false);

      // const missingFields = requiredFields.filter(
      //   (field) => !formData[field.name]?.trim()
      // );

      // if (missingFields.length > 0) {
      //   setValidationError(`Please fill in all required fields`);
      //   return;
      // }

      // setValidationError("")

      // ✅ Pass data to parent for business logic
      onSubmit?.(formData);
    };

    const displayError = validationError;

    return (
      <dialog
        ref={dialogRef}
        className="w-80 rounded-md p-0 border shadow-xl backdrop:bg-black/50"
        onCancel={(e) => e.preventDefault()}
      >
        <div className="bg-white p-6 w-80 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold text-center text-primary">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              disabled={loading}
              className="py-1/2 px-2 rounded-full border border-white absolute top-1.5 right-2 text-gray-500 hover:text-red-700 hover:border-red-700 transition-all duration-500 text-2xl font-bold disabled:opacity-50"
              aria-label="Close modal"
            >
              &times;
            </button>

            {fields.map(
              ({
                name,
                label,
                type,
                placeholder,
                autoFocus,
                id,
                required = true,
              }) => (
                <div key={name}>
                  <label htmlFor={id} className="text-sm block mb-1">
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    ref={autoFocus ? inputRef : null}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    autoFocus={autoFocus}
                    id={id}
                    required={required}
                    disabled={loading}
                    className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              )
            )}

            {displayError && Object.values(displayError).some((val) => val) && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                {Object.entries(displayError).map(
                  ([key, msg]) =>
                    msg && (
                      <p key={key} className="capitalize">
                        {msg}
                      </p>
                    )
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {mode === "login" ? "Logging in..." : "Signing up..."}
                </>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {footer && <div>{footer}</div>}
        </div>
      </dialog>
    );
  }
);

export default AuthForm;
