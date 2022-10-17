import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { WhatsappIcon } from "next-share";
import { directusURL, directusURLSSR } from "../lib/api.config";

const AcademicResources = (props) => {
  const [documents, setdocuments] = useState(props.docs);
  const [search, setSearch] = useState("");
  const [filteredDocuments, setfilteredDocuments] = useState([]);

  // useEffect fir search Field

  useEffect(() => {
    const resultSearch = documents.filter((document) => {
      return !!document.document.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
    });
    setfilteredDocuments(resultSearch);
  }, [search]);

  // Define Columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.document.title || "#NA",
      sortable: true,
      style: {
        "flex-basis": "250px",
        "max-width": "250px",
      },
      width: "250px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["title-cell"],
        },
      ],
    },
    {
      name: "Description",
      selector: (row) => row.description || "#NA",
      sortable: true,
      style: {
        "flex-basis": "270px",
        "max-width": "270px",
      },
      width: "270px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["publisher-cell"],
        },
      ],
    },

    {
      name: "Uploaded By",
      selector: (row) =>
        row.uploadedBy.first_name + " " + row.uploadedBy.last_name || "#NA",
      sortable: true,
      style: {
        "flex-basis": "150px",
        "max-width": "150px",
      },
      width: "150px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["author-cell", "uploadedBy"],
        },
      ],
    },
    {
      name: "Upload Date",
      selector: (row) => row.uploadedOn || "#NA",
      sortable: true,
      style: {
        "flex-basis": "150px",
        "max-width": "150px",
      },
      width: "150px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["uploadDate-cell"],
        },
      ],
    },
    {
      name: "Size",
      selector: (row) =>
        (row.document.filesize / (1024 * 1024)).toFixed(2) + " MB" || "#NA",
      sortable: true,
      style: {
        "flex-basis": "100px",
        "max-width": "100px",
      },
      width: "100px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["fileSize-cell"],
        },
      ],
    },
    {
      name: "Share/Download",
      cell: function (row) {
        let docID = directusURL + "/assets/" + row.document.id + "?download";
        let shareLink =
          "whatsapp://send?text=" +
          encodeURI(
            (row.document.title ?? "") +
              "\n" +
              (row.description ?? "") +
              "\nURL: " +
              docID +
              "\n\n" +
              "Find more such documents at DISHA Portal (disha.mbm.ac.in)\n"
          );
        return (
          <>
            <a href={docID} className="download-btn">
              Download
            </a>
            <a href={shareLink} className="share-cell">
              <WhatsappIcon size={32} round />
            </a>
          </>
        );
      },
      style: {
        "flex-basis": "250px",
        "max-width": "250px",
      },
      width: "250px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["dld-button-cell"],
        },
      ],
    },
  ];

  //Return Data as Datatable
  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          <h2>Academic Resources</h2>
          <p>Syllabus, Old papers, Video playlists etc.</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        title=""
        columns={columns}
        data={filteredDocuments}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
      />
    </div>
  );
};

export default AcademicResources;

// server Side Rendering
export async function getServerSideProps(context) {
  let data = await fetch(
    directusURLSSR +
      "/items/documents?fields=*,uploadedBy.*,document.*,limit=-1&filter[docType][_eq]=academic"
  ); //
  let document = await data.json();
  let docs = document.data;

  return {
    props: { docs },
  };
}
