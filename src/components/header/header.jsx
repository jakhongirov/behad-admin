import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import useToken from '../../Hooks/useToken';

// import logo from "../../assets/images/logo.jpg";

function Header() {
    const [, setToken] = useToken();

    return (
        <header>
            <div className="nav-bar_wrapper">
                <div className="nav-bar_wrapper_inner">
                    <div className="logo_wrapper">
                        <Link to="/" className="title">
                            BEAHAD
                        </Link>
                    </div>
                    <nav>
                        <ul className="nav_list">
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/"
                                >
                                    Users
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/apps"
                                >
                                    Apps
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/app-user"
                                >
                                    App Users
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <button
                                    className='logout-modal__button'
                                    onClick={() => {
                                        setToken(false);
                                    }}>
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    );
}

export default Header;