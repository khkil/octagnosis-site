import React from "react";
import Pagination from "react-js-pagination";

const Paging = ({ page, setPage, totalCount, displayCount }) => {
  return (
    <Pagination
      pageRangeDisplayed={10}
      totalItemsCount={totalCount}
      itemsCountPerPage={displayCount}
      activePage={page}
      onChange={setPage}
    />
  );
};

export default Paging;
