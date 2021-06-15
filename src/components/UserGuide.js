import React, { Fragment, useState } from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import { Button } from "semantic-ui-react";

export const UserGuide = () => {
  const [pageNumber, setPageNumber] = useState(1);

  function nextPage() {
    if (pageNumber !== 10) {
      setPageNumber(pageNumber + 1);
    }
  }

  function previousPage() {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <Fragment>
      <Button onClick={previousPage}>Prev</Button>
      <Button onClick={nextPage}>Next</Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Document
          file="VP_User_guide.pdf"
        >
          <Page width={1000} pageNumber={pageNumber} />
        </Document>
      </div>
    </Fragment>
  );
};
