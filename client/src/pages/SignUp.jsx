import { Link } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";


const SignUp = () => {
  return (
      <div className="min-h-screen mt-20">
          <div className="p-3 flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
              {/* left */}
              <div className="flex-1">
                  <Link to="/" className="text-4xl font-bold dark:text-white">
                      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                          Surajit's
                      </span>
                      Blog
                  </Link>
                  <p className="text-sm mt-5">
                      This is a demo project. You can sign up with your email
                      and password, to view some great technical blogs.
                  </p>
              </div>
              {/* right */}
              <div className="flex-1">
                  <form className="flex max-w-md flex-col gap-4">
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="username" value="Your username" />
                          </div>
                          <TextInput
                              id="username"
                              type="text"
                              placeholder="username"
                              required
                          />
                      </div>
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="email1" value="Your email" />
                          </div>
                          <TextInput id="email1" placeholder='your@company.com' type="email" required />
                      </div>
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="password" value="Your password" />
                          </div>
                          <TextInput
                              id="password"
                              placeholder="password"
                              type="password"
                              required
                          />
                      </div>
                      {/* <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember">Remember me</Label>
                      </div> */}
                      <Button gradientDuoTone={"purpleToPink"} type="submit">
                          Sign Up
                      </Button>
                  </form>
                  <div className="text-sm mt-5 flex gap-2">
                      <span>Have an account?</span>
                      <Link to="/sign-in" className="text-indigo-500">
                          Sign In
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default SignUp