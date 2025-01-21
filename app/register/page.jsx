import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import AuthFormActions from "@/components/AuthFormActions";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form>
          <Heading extraClassName="text-center mb-6" text="Register" />
          <InputField id="name"></InputField>
          <InputField id="username"></InputField>
          <InputField id="password" type="password"></InputField>
          <InputField
            containerMargin="mb-6"
            id="confirm-password"
            type="password"
          />
          <AuthFormActions
            buttonText="Register"
            linkText="Have an account?"
            linkHref="/login"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
