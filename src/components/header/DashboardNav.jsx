import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './NavMenu.css';

const NavMenu = ({ ULine, setULine, handledropDown, isMobile }) => {
    
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.slice(1).toLowerCase();
        // console.log(path);
        setULine(path);
    }, [location, setULine]);

    return (
        <div className="info">
            <NavLink
                to="/Trips"
                className={`common ${ULine === "trips" ? "uline" : ""}`}
                onClick={(e) => { handledropDown("trips"); }}
            >
                {isMobile ? (
                    <>
                        <HomeTwoToneIcon /> Trips
                    </>
                ) : (
                    "Trips"
                )}
            </NavLink>
            <NavLink
                to="/MyTrips"
                className={`common ${ULine === "mytrips" ? "uline" : ""}`}
                onClick={() => handledropDown("mytrips")}
            >
                {isMobile ? (
                    <>
                        <InfoTwoToneIcon /> My Trips
                    </>
                ) : (
                    "My Trips"
                )}
            </NavLink>
            <NavLink
                to="/Report"
                className={`common ${ULine === "report" ? "uline" : ""}`}
                onClick={() => handledropDown("report")}
            >
                {isMobile ? (
                    <>
                        <ContactPhoneTwoToneIcon /> Report
                    </>
                ) : (
                    "Report"
                )}
            </NavLink>
        </div>
    );
};

export default NavMenu;