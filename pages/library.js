import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { directusURL, directusURLSSR } from "../lib/api.config";

const Library = (props) => {
  // importing Data from an serverside rendering
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(props.booklist);
  const [filteredBooks, setfilteredBooks] = useState([]);

  // useEffect for Search Field
  useEffect(() => {
    const resultSearch = books.filter((book) => {
      return (
        !!book.title?.toLowerCase().includes(search.toLowerCase()) ||
        !!book.author?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setfilteredBooks(resultSearch);
  }, [search]);

  // Define Columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title || "#NA",
      sortable: true,
      style: {
        "flex-basis": "400px",
        "max-width": "400px",
      },
      width: "400px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["title-cell"],
        },
      ],
    },
    {
      name: "Author",
      selector: (row) => row.author || "#NA",
      sortable: true,
      style: {
        "flex-basis": "250px",
        "max-width": "250px",
      },
      width: "250px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["author-cell"],
        },
      ],
    },
    {
      name: "Publisher",
      selector: (row) => row.publisher || "#NA",
      sortable: true,
      style: {
        "flex-basis": "150px",
        "max-width": "150px",
      },
      width: "150px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["publisher-cell"],
        },
      ],
    },
    {
      name: "Edition",
      selector: (row) => row.edition || "#NA",
      sortable: true,
      style: {
        "flex-basis": "100px",
        "max-width": "100px",
      },
      width: "100px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["edition-cell"],
        },
      ],
    },
    {
      name: "Acc. No",
      selector: (row) => row.accessionNo || "#NA",
      sortable: true,
      style: {
        "flex-basis": "135px",
        "max-width": "135px",
      },
      width: "135px",
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["accno-cell"],
        },
      ],
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Available" : "Not Available"),
      sortable: true,
      conditionalCellStyles: [
        {
          when: (cell) => true,
          classNames: ["status-cell"],
        },
      ],
    },
  ];

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          <h2>Online Catalogue</h2>
          <p>Catalogues of Books in Department Library</p>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="datatable">
        <DataTable
          title=""
          columns={columns}
          data={filteredBooks}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Library;

// server Side Rendering
export async function getServerSideProps(context) {
  let data = await fetch(directusURLSSR + "/items/books?limit=-1");
  let book = await data.json();
  let booklist = book.data;

  return {
    props: { booklist },
  };
}
