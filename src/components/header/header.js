'use strict';
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Logo, Settings, Help, Logout } from './headerIcons';
import { NotificationBar, ErrorPopup, ConfirmPopup, ProgressBar } from "../../components";
import WarningPopup from '../WarningPopup';
import { unloadWallet, stopWallet, setWalletLoaded } from '../../features/WalletDataSlice'
import './header.css';
import TorCircuit from './TorInfo/TorCircuit';
import { useDispatch, useSelector } from 'react-redux';


const Header = (props) => {

  
  const dispatch = useDispatch();

  const walletLoaded = useSelector(state => state.walletData).walletLoaded;

  
  const handleLogout = async () => {
    await stopWallet();
    unloadWallet();
    dispatch(setWalletLoaded({loaded: false}));
  }

  let isDarkMode = localStorage.getItem('dark_mode');
  const activeDarkMode = async () => {
    
    isDarkMode = document.body.classList.contains('dark-mode')
    if (isDarkMode) {
      await window.darkMode.off()
      document.body.classList.remove('dark-mode')
      document.querySelector('.App').classList.remove('dark-mode')
      localStorage.removeItem('dark_mode')
      
    }
    else {
      await window.darkMode.on()
      document.body.classList.add('dark-mode')
      document.querySelector('.App').classList.add('dark-mode')
      localStorage.setItem('dark_mode', '1')
    }
  }

  return (
    <div className="Header">

      <div className="container block">
        <Link className="navbar-brand" to={walletLoaded ? "/home" : "/"}>
          <Logo />
        </Link>




        <div className="menu">
          {
            walletLoaded &&
            <TorCircuit online={props.online} />
          }
          <div title="Light/Dark mode">
            <label className="toggle2">
              <input
                className="toggle-checkbox2"
                type="checkbox"
                onChange={activeDarkMode}
                checked={isDarkMode}
              />
              <div className="toggle-switch2" />
            </label>
          </div>


          <div title="Help" className={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
            <Link className="nav-link" to="/help">
              <Help />
            </Link>
          </div>

          {walletLoaded ?
            <div title="Settings" className={`nav-item  ${props.location.pathname === "/settings" ? "active" : ""}`}>
              <Link className="nav-link" to="/settings">
                <Settings />
              </Link>
            </div>
            :
            null
          }


          {walletLoaded && (
            <div className={`nav-item`}>
              <ConfirmPopup onOk={handleLogout}>
                <div title="Exit wallet" className="header-logout">
                  <Logout />
                </div>
              </ConfirmPopup>
            </div>
          )}
        </div>
      </div>
      <NotificationBar />
      <ErrorPopup />
      <WarningPopup />
      <ProgressBar /> 
    </div>
  );
}

export default withRouter(Header);
