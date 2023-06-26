import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getClosest, getSiblings, slideToggle, slideUp } from "../../../utils";
import { withTranslation, useTranslation } from "react-i18next";
import { isLogin } from "../../../utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { logout } from "../../../store/reducers/userSlice";
import { selectCurrentLanguage, selectLanguages, setCurrentLanguage } from "../../../store/reducers/languageSlice";
import { sysConfigdata } from "../../../store/reducers/settingsSlice";
import FirebaseData from "../../../utils/firebase";

const MySwal = withReactContent(Swal);
const MobileNavMenu = ({ t }) => {
    const firebase = FirebaseData();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [notifications, setNotifications] = useState([]);

    const userData = useSelector((state) => state.User);
    const languages = useSelector(selectLanguages);
    const systemconfig = useSelector(sysConfigdata);
    const selectcurrentLanguage = useSelector(selectCurrentLanguage);


    const handleSignout = () => {
        MySwal.fire({
            title: t("Logout"),
            text: t("Are you sure"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("Logout"),
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                firebase.auth.signOut();
                navigate('/');
            }
        });
    };

    const onClickHandler = (e) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;
        if (parentEl?.classList.contains("menu-toggle") || target.classList.contains("menu-toggle")) {
            const element = target.classList.contains("icon") ? parentEl : target;
            const parent = getClosest(element, "li");
            const childNodes = parent.childNodes;
            const parentSiblings = getSiblings(parent);
            parentSiblings.forEach((sibling) => {
                const sibChildNodes = sibling.childNodes;
                sibChildNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideUp(child, 1000);
                    }
                });
            });
            childNodes.forEach((child) => {
                if (child.nodeName === "UL") {
                    slideToggle(child, 1000);
                }
            });
        }
    };

    const languageChange = async (name, code, id) => {
        setCurrentLanguage(name, code, id);
        await i18n.changeLanguage(code);
    };

    // initial username
    let userName = "";

    const checkUserData = (userData) => {
        if (userData.data && userData.data.name !== "") {
            return (userName = userData.data.name);
        } else if (userData.data && userData.data.email !== "") {
            return (userName = userData.data.email);
        } else {
            return (userName = userData.data.mobile);
        }
    };

    return (
        <nav className="site-mobile-menu">
            <ul>
                <li className="has-children">
                    {systemconfig && systemconfig.language_mode === "1" ? (
                        <div className="dropdown__language">
                            <DropdownButton className="inner-language__dropdown" title={selectcurrentLanguage && selectcurrentLanguage.name ? selectcurrentLanguage.name : "Select Language"}>
                                {languages &&
                                    languages.map((data, key) => {
                                        return (
                                            <Dropdown.Item onClick={() => languageChange(data.language, data.code, data.id)} key={key}>
                                                {data.language}
                                            </Dropdown.Item>
                                        );
                                    })}
                            </DropdownButton>
                        </div>
                    ) : (
                        ""
                    )}
                </li>

                {isLogin() && checkUserData(userData) ? (
                    <li className="has-children">
                        <NavLink to="#">
                            <span className="menu-text">{userName}</span>
                        </NavLink>
                        <span className="menu-toggle" onClick={onClickHandler}>
                            <i className="">
                                <FaAngleDown />
                            </i>
                        </span>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to={"/profile"}>
                                    <span className="menu-text">{t("Profile")}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={""} onClick={handleSignout}>
                                    <span className="menu-text">{t("Logout")}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink to={"/login"}>
                                <span className="menu-text">{t("Login")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/sign-up"}>
                                <span className="menu-text">{t("Sign Up")}</span>
                            </NavLink>
                        </li>
                    </>
                )}

                <li>
                    <NavLink to={"/"}>
                        <span className="menu-text">{t("Home")}</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to={"/quiz-play"}>
                        <span className="menu-text">{t("Quiz Play")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/bookmark"}>
                        <span className="menu-text">{t("bookmark")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/invite-friends"}>
                        <span className="menu-text">{t("Invite Friends")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/instruction"}>
                        <span className="menu-text">{t("Instruction")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/leaderboard"}>
                        <span className="menu-text">{t("LeaderBoard")}</span>
                    </NavLink>
                </li>

                <li className="has-children">
                    <NavLink to="#">
                        <span className="menu-text">{t("More")}</span>
                    </NavLink>
                    <span className="menu-toggle" onClick={onClickHandler}>
                        <i className="">
                            <FaAngleDown />
                        </i>
                    </span>
                    <ul className="sub-menu">
                        <li>
                            <NavLink to={"/contact-us"}>
                                <span className="menu-text">{t("Contact Us")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/about-us"}>
                                <span className="menu-text">{t("About Us")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/terms-conditions"}>
                                <span className="menu-text">{t("Terms and Conditions")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/privacy-policy"}>
                                <span className="menu-text">{t("Privacy Policy")}</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default withTranslation()(MobileNavMenu);
