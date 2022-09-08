import React from 'react';
import Pagination from 'react-js-pagination';

const Paging = ({ page, setPage, pageInfo }) => {
  const { number, size, totalElements } = pageInfo;
  return (
    <Pagination
      activeLinkClass="active"
      pageRangeDisplayed={10}
      activePage={number}
      itemsCountPerPage={size}
      totalItemsCount={totalElements}
      onChange={setPage}
    />
  );
};

export default Paging;
