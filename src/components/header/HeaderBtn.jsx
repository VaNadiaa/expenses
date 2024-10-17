import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderBtn({ to, isFirst, name }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`font-medium text-lg ${
        isFirst && "col-start-2 lg:col-start-5"
      } ${
        isActive && "scale-110 text-my-color-purple"
      } transition ease-out hover:scale-110 hover:text-my-color-purple`}
    >
      {name}
    </Link>
  );
}
