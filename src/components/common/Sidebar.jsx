import React, { useEffect, useState } from "react";
import S from "./Sidebar.styled";
import { SIDE_MENUS } from "../../assets/data/data";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../assets/hooks/useRedux";

const Sidebar = ({ page }) => {
  const { submitTitle, submitDescription } = useAppSelector(
    (state) => state.submitSlice.info
  );

  const [isDisabledFileUpload, setDisabledFileUpload] = useState(false);

  useEffect(() => {
    if (!submitTitle || !submitDescription) {
      setDisabledFileUpload(true);
    } else {
      setDisabledFileUpload(false);
    }
  }, [submitTitle, submitDescription]);

  return (
    <S.Container>
      <h3 className="sidebar-title">
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </h3>
      <ul className="menus-wrap">
        {SIDE_MENUS[page] &&
          SIDE_MENUS[page]?.map((menu, index) => (
            <li className="menu" key={index}>
              <NavLink
                to={menu.path}
                className={`link ${
                  ((menu.path === "/submit/upload" && isDisabledFileUpload) ||
                    menu.path === "/submit/result") &&
                  "disabled"
                }`}
              >
                {menu.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </S.Container>
  );
};

export default Sidebar;
