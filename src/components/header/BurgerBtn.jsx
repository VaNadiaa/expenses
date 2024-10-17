import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BurgerBtn({ to, name, isSelected }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`font-medium text-xl mb-3 ${
        isSelected && "md:col-start-3 lg:col-start-5"
      } ${isActive && "text-my-color-purple"}`}
    >
      {name}
    </Link>
  );
}
