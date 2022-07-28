import React, { useState, useEffect, useMemo } from "react";

import { useNavigate } from 'react-router';
import { useTable, useSortBy, usePagination } from "react-table";
import {FiRefreshCcw} from 'react-icons/fi';
import {useLocation} from "react-router-dom";


import { getMeetingDetails } from "../../service/meetingDetails.service";
import { CALL_TOKEN } from "../../../config/constants";
import { HOSTED_URL } from "../../service/base.service";

const MeetingDetails = (props) => {

    const location = useLocation();
    const isHost = location.state.callerType === 'Host';

    const navigate = useNavigate();

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
      accessor: isHost ? "hostcalltoken" : "guestcalltoken",
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

  const getMeetingDetailsList = () => {
    
    getMeetingDetails().then((response) => {
        setMeetingDetailsList(response.data.result);
    });
  }
  const [meetingDetailsList, setMeetingDetailsList] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => meetingDetailsList, [meetingDetailsList]);

  useEffect(() => {
    getMeetingDetailsList();
  }, []);

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

    const recordLength = meetingDetailsList?.length;
    let newNoOfShowRecord = recordDropDownData.filter(
      (numberOf) => numberOf <= recordLength
    );
    setNofShowRecord(newNoOfShowRecord);
  }, [meetingDetailsList]);

  useEffect(() => {
    setCurrentPage(pageIndex + 1);
  }, [pageIndex]);

  const onRefreshMeetingDetails = () => {
    getMeetingDetailsList();
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
                      navigate('/meetingRoom', { state: { token: location.state.callerType === 'Host' ? cell.values.hostcalltoken : cell.values.guestcalltoken, callerType: location.state.callerType } })
                    }}
                  >
                    <td>{index + 1}</td>
                    {cell.cells.map((data) => (
                      <>
                        <td>{ data.column.Header === "Meeting URL" ? `${HOSTED_URL}${CALL_TOKEN}`+data.value : data.value}</td>
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
