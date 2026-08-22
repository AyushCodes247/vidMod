import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const FormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      code: "",
    },
  });

  const inputRefs = useRef([]);

  const code = watch("code");

  const handleCodeChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const currentCode = code.padEnd(6, "").split("");
    currentCode[index] = value;

    const newCode = currentCode.join("").slice(0, 6);

    setValue("code", newCode, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) return;

    setValue("code", pastedCode, {
      shouldValidate: true,
      shouldDirty: true,
    });

    inputRefs.current[Math.min(pastedCode.length, 5)]?.focus();
  };

  const onSubmit = (data) => {
    console.log("Verification code:", data.code);

    // API request here

    reset();

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full bg-[#09090B] text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[380px] flex flex-col items-center"
      >
        {/* RHF field */}
        <input
          type="hidden"
          {...register("code", {
            required: "Verification code is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Enter the complete 6-digit code",
            },
          })}
        />

        {/* Email icon */}
        <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.18)] mb-6">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            Verify your email
          </h1>

          <p className="font-body text-sm text-zinc-400 mt-2">
            We sent a 6-digit code to
          </p>

          <p className="font-body text-sm text-white font-semibold mt-1">
            maya@vidmod-demo.com
          </p>
        </div>

        {/* OTP */}
        <div className="flex gap-2 sm:gap-3 mt-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index] || ""}
              onChange={(e) => handleCodeChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className="
                w-11 h-14
                sm:w-12
                rounded-xl
                border border-zinc-800
                bg-[#111113]
                text-white
                text-center
                text-xl
                font-display
                font-semibold
                outline-none
                transition-all duration-200
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
                focus:bg-[#151518]
              "
            />
          ))}
        </div>

        {errors.code && (
          <p className="text-xs text-red-400 mt-3">{errors.code.message}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={code.length !== 6}
          className="
            w-full
            h-11
            mt-12
            rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-cyan-400
            text-black
            font-display
            font-semibold
            transition-all
            duration-200
            hover:scale-[1.01]
            hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          Verify email
        </button>

        {/* Resend */}
        <p className="font-body text-sm text-zinc-500 mt-5">
          Didn't get a code?{" "}
          <button
            type="button"
            className="text-white font-semibold hover:text-cyan-400 transition-colors"
          >
            Resend code
          </button>
        </p>

        {/* Change email */}
        <p className="font-body text-sm text-zinc-500 mt-4">
          Wrong address?{" "}
          <button
            type="button"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Change email
          </button>
        </p>
      </form>
    </div>
  );
};

export default FormPage;
