import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface RegisterFormData {
  email: string;
  password: string;
}

const inputBaseClass =
  "h-10 w-full rounded-lg border bg-[#1a1a1c] px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 autofill:bg-[#1a1a1c] autofill:text-zinc-100 focus:bg-[#1a1a1c]";

const FormPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Registration data:", data);

      // API request will go here.

      await new Promise((resolve) => setTimeout(resolve, 1000));

      reset();
      setShowPassword(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#09090B] px-5 py-10 md:w-[40%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-[22px] border border-zinc-800 bg-[#111113] px-8 py-9 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-7 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-100">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Sign in to your workspace
          </p>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            Work email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={`${inputBaseClass} ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-800 focus:border-violet-500"
            }`}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-zinc-300"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 10 characters"
              autoComplete="new-password"
              className={`${inputBaseClass} pr-12 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-zinc-800 focus:border-violet-500"
              }`}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters.",
                },
                maxLength: {
                  value: 128,
                  message: "Password must not exceed 128 characters.",
                },
                validate: (value) =>
                  !/\s/.test(value) || "Password must not contain spaces.",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.992 0 1.953-.138 2.857-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 0 1-4.293 5.39M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L9.879 9.879"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-linear-to-r from-violet-500 to-cyan-400 text-sm font-semibold text-black shadow-lg shadow-violet-500/10 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sign in account..." : "Sign in"}
        </button>

        {/* Terms */}
        <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
          By continuing, you agree to VidMod&apos;s{" "}
          <Link
            to="/terms"
            className="text-zinc-400 underline underline-offset-2 transition hover:text-zinc-200"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-zinc-400 underline underline-offset-2 transition hover:text-zinc-200"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Register */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-zinc-200 transition hover:text-cyan-400"
          >
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
