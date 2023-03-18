import React, {} from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
import { RightOutlined, MenuOutlined } from "@ant-design/icons";

export default function SideBar({visible, show}) {

    return (
        <>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<MenuOutlined />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				{/* <button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button> */}
				<div>
					<NavLink
						className="navbar-logo"
						to="/portfolio_list"
                        style={{
                            backgroundColor: 'white'
                        }}
					>
                        <img
                            src={"assets/xpercent_logo.png"}
                            alt="logo"
                        />
					</NavLink>
					<div className="links nav-top">
						<NavLink 
                            to="/portfolio_list" 
                            className={({ isActive }) => {
                                return isActive ? "nav-link focused" : "nav-link"}}
                        >
                            <RightOutlined />
							<span>포트폴리오 목록 관리</span>
						</NavLink>
						<NavLink 
                            to="/rebalancing_status" 
                            className={({ isActive }) => {
                                return isActive ? "nav-link focused" : "nav-link"}}
                        >
                            <RightOutlined />
							<span>리밸런싱 현황 관리 </span>
						</NavLink>
					</div>
				</div>

				{/* <div className="links">
					<NavLink to="/settings" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Settings</span> 
					</NavLink>
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div> */}
			</nav>
		</>
    )
}