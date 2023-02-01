import { Link, NavLink, useNavigate } from "react-router-dom";
import useToken from '../../Hooks/useToken';

function TestNavbar() {
    const [, setToken] = useToken();
    const navigate = useNavigate()

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
                                    to="/testCategories"
                                >
                                    Test Categories
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/test"
                                >
                                    Tests
                                </NavLink>
                            </li>
                            <li className="nav_list_item">
                                <NavLink
                                    className="nav_link"
                                    to="/testQuestion"
                                >
                                    Test Questions
                                </NavLink>
                            </li>
                            <li className="nav_list_item" onClick={() => navigate(-1)}>
                                <span className="nav_link">
                                    Back
                                </span>
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
    )
}

export default TestNavbar