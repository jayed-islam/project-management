import SigninForm from "../signin-form";

const SigninViewPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="border shadow-sm rounded-2xl bg-white max-w-lg mx-auto p-11 h-auto w-full md:min-w-[32rem]">
        <h1 className="text-2xl font-semibold text-center mb-11">Sign In</h1>
        <SigninForm />
      </div>
    </div>
  );
};

export default SigninViewPage;
