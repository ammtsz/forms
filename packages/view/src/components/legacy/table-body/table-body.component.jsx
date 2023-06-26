import React from "react";
import "./table-body.styles.css";


import EditableTextarea from "../textarea-editable/textarea-editable.component";

import { TABLE_COLUMNS_DATAS, usersArray } from "../table.datas";

const tableColumns = TABLE_COLUMNS_DATAS
const usersDisplayArray = usersArray
const setLoading = () => {console.log("loading")}

const TableBody = () => {
  const handleConfirm = () => {
    console.log("confirm");
  }
  
  return ( 
    <tbody className="table__body">
      {usersDisplayArray
        .map((user) => {
          return (
            <tr key={user.id} className="table__body--row">
                // First (Frozen) column
                <td
                  // case PENDING USERS table: Delete + Approve Icons
                  className="table__frozen--body table__frozen--col-1"
                >
                  <button
                    onClick={() => console.log(user.id, user.name, handleConfirm, setLoading)}
                    className="table__body--delete-icon   btn btn-sm"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <button
                    onClick={() => console.log(user.id, user.name, handleConfirm, setLoading)}
                    className="table__body--approve-icon   btn btn-sm ml-2"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                </td>
              <td
                className="table__body--row-td table__body--name table__frozen--body table__frozen--col-2 "
                // onClick={() => history.push(`${match.url}/${user.id}?approved=${isApprovedTab}`)}
              >
                {user.name}
              </td>

              {Object.keys(tableColumns).map((name) =>
                name !== "id" &&
                name !== "name" &&
                tableColumns[name].filter ? (
                  <td
                    key={tableColumns[name].id}
                    className={`table__body--row-td ${
                      // add a className if it's a textarea
                      tableColumns[name].textarea ? "table__body--textarea" : ""
                    }`}
                  >
                    {tableColumns[name].textarea ? (
                      // ========= >>> create a textarea box if it is a textarea column
                      name === "internalNotes" ? (
                        <EditableTextarea
                          id={user.id}
                          note={user["internalNotes"]}
                        />
                      ) : (
                        <textarea value={user[name]} disabled></textarea>
                      )
                    ) : (
                      // ========= >>> otherwise just print the value
                      user[name]
                    )}
                  </td>
                ) : null
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableBody
