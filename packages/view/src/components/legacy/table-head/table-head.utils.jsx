// BUTTON TO COPY TABLE

export const copyTable = (id) => {
    //   https://stackoverflow.com/questions/2044616/select-a-complete-table-with-javascript-to-be-copied-to-clipboard
    let body = document.body,
      range,
      sel;
    const el = document.querySelector(id);
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
  };
  
  