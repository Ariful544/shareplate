import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/UseAuth";

const SignUp = () => {
    const {googleSignIn,createUser,updateUserProfile} = useAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(() => {
            toast.success("Logged in with Google successfully");
            navigate('/');
        })
        .catch((error) => {
            toast.error(error?.message);
        });
    }
    const handleSignUpForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value; 
        const password = form.password.value;
        const photUrl = form.photUrl.value;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

        if (!name || !email || !password || !photUrl) {
            toast.error("All fields are required");
            return;
        }
        if (!passwordRegex.test(password)) {
            toast.error("Password must be a at least one lowercase, one uppercase and at least 6 character")
            return;
        }
        createUser(email,password)
        .then(() => {
            updateUserProfile(name,photUrl)
            .then(() => {
                Swal.fire({
                    title: "Success",
                    text: "Account created successfully",
                    icon: "success",
                    timer: 2500,
                    showConfirmButton: false
                })
                navigate("/");
            })
        })
        .catch((error) => {
            toast.error(error?.message);
        });
    }
    return (
        <div className="w-full my-20 max-w-lg mx-auto p-4 rounded-md shadow sm:p-8 bg-orange-900">
            <h2 className="mb-3 text-3xl font-semibold text-center">Register your account</h2>
            <p className="text-sm text-center">Already have account?
                <Link to="/login" rel="noopener noreferrer" className="focus:underline hover:underline"> Log in here</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border bg-primary border-primary rounded-md hover:bg-[#E67E22] text-white" fdprocessedid="1z3etm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form onSubmit={handleSignUpForm} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="john doe" className="w-full px-3 py-2 border rounded-md text-black dark:border-gray-300 dark:bg-gray-50" fdprocessedid="zp9mzl" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border text-black rounded-md dark:border-gray-300 dark:bg-gray-50" fdprocessedid="zp9mzl" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="photUrl" className="block text-sm">PhotUrl</label>
                        <input type="url" name="photUrl" id="photUrl" placeholder="" className="w-full px-3 py-2 border text-black rounded-md dark:border-gray-300 dark:bg-gray-50" fdprocessedid="zp9mzl" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border text-black rounded-md dark:border-gray-300 dark:bg-gray-50" fdprocessedid="ilhtzj" />
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-white hover:bg-[#E67E22]" fdprocessedid="jz968">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;