import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx"

const SignIn = () => {
    const [formData, setFormData] = useState({});
    // ! primitive way of handling state
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [loading, setLoading] = useState(false);

    // ! advance way using redux
    const { loading, error: errorMessage } = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password || !formData.email) {
            return dispatch(signInFailure("Please fill all the fields!!!"));
        }
        console.log(formData);
        try {
            // setLoading(true);
            // setErrorMessage(null);
            dispatch(signInStart())
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                return dispatch(signInFailure(data.message));
            }
            console.log(data);

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            // setErrorMessage(error.message);
            // setLoading(false);
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="p-3 flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7">
                {/* left */}
                <div className="flex-1">
                    <Link to="/" className="text-4xl font-bold dark:text-white">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Surajit's
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign in with your email
                        and password, to view some great technical blogs.
                    </p>
                </div>
                {/* right */}
                <div className="flex-1">
                    <form
                        className="flex max-w-md flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                onChange={handleChange}
                                id="email"
                                placeholder="your@company.com"
                                type="email"
                                //   required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                onChange={handleChange}
                                id="password"
                                placeholder="********"
                                type="password"
                                //   required
                            />
                        </div>
                        {/* <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember">Remember me</Label>
                      </div> */}
                        <Button
                            gradientDuoTone={"purpleToPink"}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size={"sm"} />
                                    <p className="pl-2">Loading...</p>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="text-sm mt-5 flex gap-2">
                        <span>Don't have an account?</span>
                        <Link to="/sign-up" className="text-indigo-500">
                            Sign Up
                        </Link>
                    </div>

                    {errorMessage && (
                        <Alert
                            className="mt-5"
                            color="failure"
                            icon={HiInformationCircle}
                        >
                            <span className="font-medium"> {errorMessage}</span>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
