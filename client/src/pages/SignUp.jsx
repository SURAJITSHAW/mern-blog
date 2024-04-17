import { Link } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from 'react';


const SignUp = () => {
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch("/api/auth/signup", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
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
                  <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="username" value="Your username" />
                          </div>
                          <TextInput
                            onChange={handleChange}
                              id="username"
                              type="text"
                              placeholder="username"
                              required
                          />
                      </div>
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="email" value="Your email" />
                          </div>
                          <TextInput
                            onChange={handleChange} id="email" placeholder='your@company.com' type="email" required />
                      </div>
                      <div>
                          <div className="mb-2 block">
                              <Label htmlFor="password" value="Your password" />
                          </div>
                          <TextInput
                            onChange={handleChange}
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