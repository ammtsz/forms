import React from "react";
import "./table.styles.css";

import TableHead from "../table-head/table-head.component";
import TableBody from "../table-body/table-body.component";

const Table = ( { isLoading, setLoading }) => {
  return (
    <>
      {isLoading && <span className="table loading">Loading...</span>}
      <table className="table text-truncate" id="users-table">
        <TableHead />
        <TableBody setLoading={setLoading}/>
      </table>
    </>
  );
};

export default Table;
