import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    // extract the path after, base url
    const path = useLocation().pathname;

    return (
        <div>
            <Navbar className="border-b-2">
                <Link
                    to="/"
                    className="whitespace-nowrap self-center text-sm sm:text-xl font-semibold dark:text-white"
                >
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                        Surajit's
                    </span>
                    Blog
                </Link>
                <form>
                    <TextInput
                        type="text"
                        placeholder="search..."
                        rightIcon={CiSearch}
                        className="hidden lg:inline"
                    />
                </form>
                <Button className="w-12 h-10 lg:hidden" color={"gray"} pill>
                    <CiSearch />
                </Button>

                <div className="flex gap-2 md:order-2">
                    <Button
                        className="w-12 h-10 hidden sm:inline"
                        color={"gray"}
                        pill
                    >
                        <FaMoon />
                    </Button>
                    <Link to="/sign-in">
                        <Button outline gradientDuoTone={"purpleToBlue"}>
                            Sign In
                        </Button>
                    </Link>
                    {/* Hamburger menu */}
                    <Navbar.Toggle />
                </div>

                <Navbar.Collapse>
                    {/* Navbar.Link also creates an anchor tag internally, so 'as={"div"}' */}
                    {/* In order to apply active tag to only which is the current page `active={path === "/"}` */}
                    <Navbar.Link active={path === "/"} as={"div"}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/projects"} as={"div"}>
                        <Link to="/projects">Projects</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={"div"}>
                        <Link to="/about">About</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
