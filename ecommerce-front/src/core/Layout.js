import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="bg-light jumbotron py-5">
      <div className="container">
        <div className="row">
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
      </div>
    </div>

    <div className={className}>{children}</div>
  </div>
);

export default Layout;
