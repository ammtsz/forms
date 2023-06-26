import React from "react";
import "./table-head.styles.css";

import { TABLE_COLUMNS_DATAS } from "../table.datas";

const tableColumns = TABLE_COLUMNS_DATAS

const TableHead = () => {
  return (
    <thead className="table__head">
      <tr className="table__head--row">
        <th
          // First (Frozen) column -> Filter + Copy Icons
          className="table__frozen--head table__frozen--col-1"
        >
          <span
            className="table__head--copy-icon"
            onClick={() => console.log("#users-table")}
          >
            <i className="fas fa-copy pr-2"></i>
          </span>
          <span
            className="table__head--filter-icon ml-2"
            data-toggle="modal"
            data-target="#userTableFilterModal"
          >
            <i className="fas fa-filter"></i>
          </span>
        </th>

        <th className="table__frozen--head table__frozen--col-2">
              <div className="table__thead--column-name">
                    <input
                      type="checkbox"
                      className="table__thead--checkbox"
                      onClick={(event) => console.log({event, name: "name"})}
                    />
                    <i className="fas fa-chevron-down table__thead--check-icon"></i>
                    Nome
              </div>
            </th>


        {Object.keys(tableColumns).map((name) =>
          //   show selected tableColumns settled on filter modal - the default is to show all tableColumns. It can be changed on 'table.data.js'
          name !== "id" && name !== "name" && tableColumns[name].filter ? (
            <th key={tableColumns[name].id}>
              <div className="table__thead--column-name">
                {tableColumns[name].orderBy ? (
                  <React.Fragment>
                    <input
                      type="checkbox"
                      className="table__thead--checkbox"
                      onClick={(event) => console.log({event, name})}
                    />
                    <i className="fas fa-chevron-down table__thead--check-icon"></i>
                  </React.Fragment>
                ) : null}
                {tableColumns[name].columnName}
              </div>
            </th>
          ) : null
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
