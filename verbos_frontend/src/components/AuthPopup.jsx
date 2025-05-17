import { useState } from "react";

export default function AuthPopup({
  title 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Sign Up
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login data:" : "Sign up data:", form);
    // Add API call here
    setIsOpen(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className=" flex items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:bg-[var(--ring)] transition-colors duration-200"
      >
        {title || "Login"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[var(--card)] p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--foreground)]">
                {isLogin ? "Login to your account" : "Create a new account"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] px-3 py-2 rounded placeholder-[var(--muted-foreground)]"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] px-3 py-2 rounded placeholder-[var(--muted-foreground)]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] px-3 py-2 rounded placeholder-[var(--muted-foreground)]"
              />

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-2 rounded hover:bg-[var(--ring)] transition-colors duration-200"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-[var(--muted-foreground)]">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-[var(--primary)] hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleMode}
                    className="text-[var(--primary)] hover:underline"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}