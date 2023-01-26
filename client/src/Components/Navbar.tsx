import { ReactDOM } from "react";
import { NavLink } from "react-router-dom";




export default function Navbar() {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <a className="navbar-brand mt-2 mt-lg-0" href="/">
                            <img
                                src="data:image/png;base64,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"
                                width="200"
                                height="60"
                                alt="MDB Logo"
                                loading="lazy"
                                style={{ "objectFit": "cover" }}

                            />
                        </a>

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"Login"}>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"Home"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projects</a>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/FileUpload"}>File Upload</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/Register"}>Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/Order"}>Orders</NavLink>
                            </li>
                        </ul>

                    </div>

                    <div className="d-flex align-items-center">

                        <a className="text-reset me-3" href="#">
                            <i className="fas fa-shopping-cart"></i>
                        </a>


                        <div className="dropdown">
                            <a
                                className="text-reset me-3 dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">Some news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Another news</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}