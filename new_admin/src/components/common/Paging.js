import React from 'react';
import Pagination from 'react-js-pagination';

const Paging = ({ page, setPage, pageInfo }) => {
  if (!pageInfo.total || !pageInfo.pageSize) return null;
  return (
    <Pagination
      activeLinkClass="active"
      pageRangeDisplayed={10}
      totalItemsCount={pageInfo.total}
      itemsCountPerPage={pageInfo.pageSize}
      activePage={Number(page)}
      onChange={setPage}
    />
  );
};

export default Paging;
