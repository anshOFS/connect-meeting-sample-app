import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as meetingDetailsAction from "../../store/actions/meetingActions";
import { useTable, useSortBy, usePagination } from "react-table";
import {FiRefreshCcw} from 'react-icons/fi'

const MeetingDetails = (props) => {
  const { meetingDetailsList } = useSelector((store) => store.meetingDetail);
  const dispatch = useDispatch();

  const COLUMNS = [
    {
      Header: "Host Name",
      Footer: "Host Name",
      accessor: "hostname",
    },
    {
      Header: "Guest Name",
      Footer: "Guest Name",
      accessor: "guestname",
    },
    {
      Header: "Meeting URL",
      Footer: "Meeting URL",
      accessor: "guestcalltoken",
    },
    
    {
      Header: "Start Time",
      Footer: "Start Time",
      accessor: "meetingstarttime",
    },
    {
      Header: "End Time",
      Footer: "End Time",
      accessor: "meetingendtime",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => props.meetingDetailsList, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;
  const recordDropDownData = [
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "99",
  ];

  const [noOfShowRecord, setNofShowRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const recordLength = props.meetingDetailsList.length;
    console.log(props.meetingDetailsList.length);
    let newNoOfShowRecord = recordDropDownData.filter(
      (numberOf) => numberOf <= recordLength
    );
    setNofShowRecord(newNoOfShowRecord);
  }, [props.meetingDetailsList]);

  useEffect(() => {
    setCurrentPage(pageIndex + 1);
  }, [pageIndex]);

  const onRefreshMeetingDetails = () => {
    dispatch(meetingDetailsAction.getMeetingDetails());
  }

  return (
    <>
      <button onClick={onRefreshMeetingDetails}><FiRefreshCcw /></button>
      {meetingDetailsList.length !== 0 && (
        <div className="table-responsive">
          <table className="table table-striped" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {index === 0 && <th>Sr.no</th>}
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((cell, index) => {
                prepareRow(cell);
                return (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(
                        meetingDetailsAction.createMeetingDetailsSuccess(
                          cell.original
                        )
                      );
                    }}
                  >
                    <td>{index + 1}</td>
                    {cell.cells.map((data) => (
                      <>
                        {console.log("Data:", data.column)}
                        {console.log("Header:", data.column.Header)}
                        <td>{ data.column.Header === "Meeting URL" ? "https://viedocqavideoconnect.azurewebsites.net/?token="+data.value : data.value}</td>
                      </>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ float: "right", marginRight: "15px" }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination pg-blue">
                <li
                  className="page-item "
                  role={"button"}
                  tabIndex="-1"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <a className="page-link">Previous</a>
                </li>
                {pageOptions.map((item, index) => (
                  <li
                    className={
                      currentPage === item + 1
                        ? "page-item active cursor-pointer"
                        : "page-item "
                    }
                    role={"button"}
                    onClick={() => {
                      gotoPage(item);
                    }}
                  >
                    <a className="page-link">{item + 1}</a>
                  </li>
                ))}
                <li className="page-item " role={"button"}>
                  <a
                    className="page-link"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingDetails;
