import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

function UserSidebar() {
      const { logout, user } = useContext(AuthContext);
      const currentPath = window.location.pathname;

      const navItems = [
            { to: "/account/dashboard", icon: "bi-grid", label: "Dashboard" },
            { to: "/account/profile", icon: "bi-person", label: "Profile" },
            { to: "/account/my-learning", icon: "bi-mortarboard", label: "My Learning" },
            { to: "/account/my-courses", icon: "bi-display", label: "My Courses" },
            { to: "/account/change-password", icon: "bi-shield-lock", label: "Change Password" },
      ];
      return (
            <div className="user-sidebar">
                  {/* User avatar block */}
                  <div className="sidebar-user-block">
                        <div className="sidebar-avatar">LMS</div>
                        <div>
                              <div className="sidebar-username">{user.name}</div>
                              <div className="sidebar-email">{user.email}</div>
                        </div>
                  </div>

                  {/* Nav */}
                  <nav className="sidebar-nav">
                        {navItems.map((item) => {
                              const active = currentPath === item.to;
                              return (
                                    <Link
                                          key={item.to}
                                          to={item.to}
                                          className={`sidebar-nav-item ${active ? "active" : ""}`}
                                    >
                                          <i className={`bi ${item.icon}`}></i>
                                          {item.label}
                                    </Link>
                              );
                        })}
                        <Link className="sidebar-nav-item logout" onClick={logout}>
                              <i className="bi bi-box-arrow-right"></i>
                              Logout
                        </Link>
                  </nav>
            </div>
      );
}

export default UserSidebar