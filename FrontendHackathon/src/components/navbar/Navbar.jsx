import React from 'react'
import { useState } from 'react';
import userImage from "../../Images/userImage.png"
import logo from "../../Images/LogoHDBank.png"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "./navbar.css"
import Cookies from 'js-cookie';
import { BubblyContainer, BubblyLink } from "react-bubbly-transitions";
function Navbar({user}) {
    const [open, setOpen] = useState(false);
    const menuUserSetting = ["Thay đổi mật khẩu", "Thoát"]
    const logout = () => {
        Cookies.remove('token');
        window.location.replace("/")
    }
    console.log(user)
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logoNavbar" />
                </Link>


                {Cookies.get('token') ? (

                    <>
                        <div className='navBarOption'>
                            <ul className='navBarOptionUl'>
                                <li><BubblyLink colorStart="#F9B500" to="/transfer" className="link hover"> Chuyển khoản</BubblyLink></li>
                                <li><BubblyLink colorStart="#F9B500" to="/transferHistory" className="link hover"> Lịch sử giao dịch</BubblyLink></li>
                                <li><BubblyLink colorStart="#F9B500" to="/payment" className="link hover"> Thanh toán học phí</BubblyLink></li>
                                <li><BubblyLink colorStart="#F9B500" to="/getpayment" className="link hover"> Danh sách học phí</BubblyLink></li>
                                <li><BubblyLink colorStart="#F9B500" to="/paymentHis" className="link hover">lich su học phí</BubblyLink></li>
                            </ul>
                        </div>
                        <div className="navbarUser">
                            <div>
                                <div onClick={() => setOpen(!open)} >
                                    <Link className='link navBarInfo'>
                                        <img
                                            src={userImage}
                                            alt=""
                                            className="navBarImgUser"
                                        />
                                        <span>{user.fullName} </span>
                                    </Link>
                                </div>

                                {open &&
                                    <div className='userChoses'>
                                        <ul className='userChosesStyle'>
                                            <li >{user.amount} VND</li>
                                            <li >{user.accountNo}</li>
                                            <li onClick={() => setOpen(!open)}><Link to="/change_password" className='link hover'>Thay đổi mật khẩu</Link></li>
                                            <li onClick={logout}><Link to="" className='link hover'>Thoat</Link></li>
                                        </ul>

                                    </div>}
                            </div>

                        </div>
                    </>

                ) : (
                    <div className="navItems">
                        <BubblyLink colorStart="#F9B500" className="link" to="/login">

                            <button className="btnButton btnDN">Đăng nhập</button>
                        </BubblyLink>
                        <BubblyLink colorStart="#F9B500" className="link" to="/register">
                            <button className="btnButton btnDK">Đăng ký</button>
                        </BubblyLink>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar
