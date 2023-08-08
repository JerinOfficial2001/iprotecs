import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [output, setOutput] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, email, password, confirmPassword, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [email]: value,
      [password]: value,
      [confirmPassword]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validation
    let isValid = true;

    if (!formData.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      isValid = false;
    }

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log("Form submitted:", formData);
      toast.success("Form submitted ");
      setOutput(formData);
    }
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };
  return (
    <>
      <div className="h-[100vh] w-[100%] flex-col flex items-center justify-center gap-10 bg-[#00000031]">
        <Toaster position="top-center" />
        <div className="h-[70%] flex items-center justify-center">
          <form
            className="flex-col flex gap-2 justify-center bg-white rounded-md p-2"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold">User Registration</h1>

            <div>
              <label>Name:</label>
              <input
                className="p-1 border-2 rounded-md w-[100%]"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <p className="text-[red]">{errors.name}</p>
            </div>
            <div>
              <label>Email:</label>
              <input
                className="p-1 border-2 rounded-md w-[100%]"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="text-[red]">{errors.email}</p>
            </div>
            <div>
              <label>Password:</label>
              <input
                className="p-1 border-2 rounded-md w-[100%]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-[red]">{errors.password}</p>
            </div>
            <div>
              <label>ConfirmPassword:</label>
              <input
                className="p-1 border-2 rounded-md w-[100%]"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p className="text-[red]">{errors.confirmPassword}</p>
            </div>
            <button
              className="bg-[#4b60bd] hover:bg-[#4b60bda6] text-[white] p-2 font-semibold rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        {output ? (
          <div className="w-[100%] bg-black h-[30%] p-4 text-white flex-col flex gap-2">
            <div className="w-[100%] flex items-center justify-between">
              <h1>OUTPUT</h1>
              <button
                onClick={() => {
                  setOutput("");
                }}
                className="border-2 p-1 rounded-md px-4 hover:bg-[#ffffff46]"
              >
                Clear
              </button>
            </div>
            <div className="flex gap-2">
              <p className="text-[#46e746] ">NAME -</p>
              <p className="text-[yellow] ">{output.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#46e746] ">EMAIL -</p>
              <p className="text-[yellow] ">{output.email}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#46e746] ">PASSWORD -</p>
              <p className="text-[yellow] ">{output.password}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#46e746] ">CONFIRM PASSWORD -</p>
              <p className="text-[yellow] ">{output.confirmPassword}</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
