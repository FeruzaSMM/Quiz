import React from "react";
import PropTypes from "prop-types";
import Logo from "../../components/logo/Logo";
import MobileNavMenu from "./sub-component/MobileNavMenu";

const MobileMenu = ({ show, onClose,image }) => {
    return (
        <div id="site-main-mobile-menu" className={`site-main-mobile-menu ${show ? "active" : ""}`}>
            <div className="site-main-mobile-menu-inner">
                <div className="mobile-menu-header">
                    <div className="mobile-menu-logo">
                        <Logo image={image} />
                    </div>
                    <div className="mobile-menu-close">
                        <button className="toggle" onClick={onClose}>
                            <i className="icon-top"></i>
                            <i className="icon-bottom"></i>
                        </button>
                    </div>
                </div>
                <div className="mobile-menu-content">
                    <MobileNavMenu />
                </div>
            </div>
        </div>
    );
};

MobileMenu.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default MobileMenu;
