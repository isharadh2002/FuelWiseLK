import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

const CreateAdmins = () => {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!adminName) errors.adminName = "Admin Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Simulated API call
      console.log("Form submitted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen p-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="overflow-hidden bg-white shadow-lg w-96 rounded-2xl">
        <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600">
          <h2 className="text-2xl font-bold text-white">
            Create Admin Account
          </h2>
          <p className="mt-1 text-emerald-100">
            Add a new administrator to the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Admin Name</label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter admin name"
              />
            </div>
            {errors.adminName && (
              <p className="text-sm text-red-500">{errors.adminName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="email"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="password"
                className="w-full py-2 pl-10 text-gray-600 placeholder-gray-400 border rounded-lg border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure password"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white transition-all rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmins;
