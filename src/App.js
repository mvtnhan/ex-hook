import React, { useEffect, useState } from "react";
import queryString from "query-string";

import Pagination from "./Pagination";
import PostList from "./PostList";

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
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

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
    console.log("New Page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  return (
    <div>
      <h1>React hooks</h1>
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
