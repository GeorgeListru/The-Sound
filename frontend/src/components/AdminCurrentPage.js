import React from "react";
import { Link } from "react-router-dom";

function AdminCurrentPage(props) {
  const currentPage = props.current;
  const pages = [
    { name: "Add Artist", link: "/admin/add-artist" },
    { name: "Add Song", link: "/admin/add-song" },
  ];
  return (
    <div
      className={
        "flex w-1/4 mx-auto text-white uppercase font-bold text-sm justify-between mt-8"
      }
    >
      {pages.map((page) => {
        return currentPage === page.link ? (
          <div className={"text-custom-blue-100"}>{page.name}</div>
        ) : (
          <Link to={page.link}>{page.name}</Link>
        );
      })}
    </div>
  );
}

export default AdminCurrentPage;
