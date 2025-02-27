import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={"‹"}
      nextLabel={"›"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
