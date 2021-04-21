import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Pagination from "./Pagination";
import PostList from "./PostList";
import SearchForm from "./SearchForm";

function App() {
  const [postList, setPostlist] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fectPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setPostlist(data);
        setPagination(pagination);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    fectPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleSearchItemChange(newFilter) {
    console.log("new filter ", newFilter);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilter.searchItem,
    });
  }

  return (
    <div>
      <h1>React hooks</h1>
      <SearchForm onSubmit={handleSearchItemChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
