import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LogOut } from '../LogOut';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>

      <div className="d-flex">
        <div className={`d-flex flex-column p-3 my-4 bg-dark text-white ${collapsed ? 'collapsed' : ''}`} style={{ width: collapsed ? '60px' : '300px', transition: 'width 0.3s' }}>
          <div
            className="hamburger-menu mb-3"
            onClick={toggleSidebar}
            style={{ cursor: 'pointer', display: 'flex' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3 12.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link text-white" onClick={() => navigate("weatherInfo")}>
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}>WeatherInfo</span>
              </a>
            </li>
            <hr />
            <li className="nav-item">
              <a href="#" className="nav-link text-white" onClick={() => navigate("add")}>
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}>Add Weather Data</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white" onClick={() => navigate("update")}>
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}>Update Weather Data</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white" onClick={() => navigate("delete")}>
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}>Delete Weather Data</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-white" onClick={() => navigate("userList")}>
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}>Users List</span>
              </a>
            </li>
            <hr />
            <li className="nav-item">
              <a href="#" className="nav-link text-danger">
                <span className={`${collapsed ? 'd-none' : 'fade-in'}`}><LogOut /></span>
              </a>
            </li>
            <hr />
          </ul>
        </div>
        <div className="flex-grow-1 p-3" style={{ marginLeft: collapsed ? '60px' : '60px', transition: 'margin-left 0.3s' }}>
          <Outlet />
        </div>
      </div>

    </>

  )
}
