// AuthForm.jsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

const AuthForm = forwardRef(
  ({ mode = "login", fields = [], onSubmit, footer }, ref) => {
    const dialogRef = useRef();
    const inputRef = useRef();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    useEffect(() => {
      if (dialogRef.current?.open) inputRef.current?.focus();
    }, [dialogRef.current?.open]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");

      if (mode === "signup" && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      onSubmit?.(formData);
      setFormData({});
      dialogRef.current?.close();
    };

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
              className="py-1/2 px-2 rounded-full border border-white absolute top-1.5 right-2 text-gray-500 hover:text-red-700 hover:border-red-700 transition-all duraion-500 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            {fields.map(({ name, label, type, placeholder, autoFocus, id }) => (
              <div key={name}>
                <label htmlFor={id} className="text-sm block mb-1">
                  {label}
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
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-green-700"
            >
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {footer && <div>{footer}</div>}
        </div>
      </dialog>
    );
  }
);

export default AuthForm;
