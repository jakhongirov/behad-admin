import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import useToken from '../../Hooks/useToken';

function Header() {
    const [, setToken] = useToken();

    return (
        <header>
            <div className="nav-bar_wrapper">
                <div className="nav-bar_wrapper_inner">
                    <div className="logo_wrapper">
                        <Link to="/" className="title">
                            BEHAD
                        </Link>
                    </div>
                    <nav>
                        <ul className="nav_list">
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/"
                                >
                                    Graphs
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/users"
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
                                <NavLink
                                    className="nav_link"
                                    to="/userCount"
                                >
                                    Users Country
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/appUserCount"
                                >
                                    App Users Count
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/trackingFilter"
                                >
                                    Tracking
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/trackLogin"
                                >
                                    Tracking Login
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/survays"
                                >
                                    Surveys
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/news"
                                >
                                    News
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