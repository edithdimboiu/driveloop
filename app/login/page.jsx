import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import AuthFormActions from "@/components/AuthFormActions";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form>
          <Heading extraClassName="text-center mb-6" text="Login" />
          <InputField id="username"></InputField>
          <InputField containerMargin="mb-6" id="password" type="password" />
          <AuthFormActions
            buttonText="Login"
            linkText="No account?"
            linkHref="/register"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
