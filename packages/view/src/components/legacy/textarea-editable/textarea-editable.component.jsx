import React, { useState } from "react";
import "./textarea-editable.styles.css";

const EditableTextarea = ({ id, note }) => {
  const [internalNote, setInternalNote] = useState(note);

  return (
    // ========= >>> create a textarea box if it is a textarea column
    <div className="textarea_" id={`internalNote--${id}`}>
      <textarea
        value={internalNote}
        onChange={(event) => setInternalNote(event.target.value, id)}
        disabled
      ></textarea>

      {
        // create an edit and save buttons if it is an internal notes column

        <div className="textarea__buttons">
          <button
            className="textarea__buttons--icon"
            onClick={() => console.log(id)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="textarea__buttons--icon"
            onClick={() => console.log(id, internalNote)}
          >
            <i className="fas fa-save"></i>
          </button>
        </div>
      }
    </div>
  );
};

export default EditableTextarea
