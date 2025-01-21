import Link from "next/link";

const AuthFormActions = ({ buttonText, linkText, linkHref }) => {
  return (
    <div className="flex flex-col gap-5">
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {buttonText}
      </button>

      <p>
        {linkText}
        <Link href={linkHref} className="text-blue-500 ml-2">
          {linkText === "No account?" ? "Register" : "Login"}
        </Link>
      </p>
    </div>
  );
};

export default AuthFormActions;
