import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { readTodosAction, filterTodoAction } from "../redux/actions";
import { isAuthenticated } from "../auth";
import RowTask from "../components/RowTask";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-date-picker";

function Home() {
  
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos) || [];

  const { user, token } = isAuthenticated();


  useEffect(() => {
    dispatch(readTodosAction(user, token));
  }, []);

  const handleChangeDate = (date) => {
    setStartDate(date);
    filterByDate(date);
  };


  // No filtra bien 
  const filterByDate = (date) => {
    console.log('filtering...');
    dispatch(filterTodoAction(date))
  };


  return (
    <>
      <Sidebar/>
      <div className="content-tasks">
        <h1 className="mt-5 h2 ml-3 h2-md ml-0-md">My Tasks</h1>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-white">
                <div className="d-flex justify-content-between flex-wrap">
                  <h5 className="pt-3">Tasks</h5>
                  <div className="d-flex align-items-center">
                    <div className="mr-3">
                      <DatePicker
                        onChange={(date) => {
                          handleChangeDate(date);
                        }}
                        value={startDate}
                      />
                    </div>
                    <div
                      className="text-secondary"
                      style={{ borderLeft: "1px solid", height: "75%" }}
                    ></div>
                    <button
                      type="button"
                      className="btn btn-custom text-primary ml-1"
                      data-toggle="modal"
                      data-target="#modalNewTask"
                    >
                      <i className="fas fa-plus-circle mr-2"></i>
                      Add Task
                    </button>
                    <Modal
                      title="New Task"
                      id="modalNewTask"
                      titleFirstInput="Title (Required)"
                      titleSecondInput="Description"
                    />
                  </div>
                </div>
              </div>
              {/*table*/}
              <table className="table">
                <thead>
                  <tr>
                    <th width="1%" scope="col"></th>
                    <th width="20%" scope="col" className="h6">
                      Title
                    </th>
                    <th width="20%" scope="col" className="h6">
                      Created
                    </th>
                    <th scope="col" className="h6 d-none d-md-table-cell">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.length
                    ? todos.map((todo, i) => <RowTask key={i} todo={todo} />)
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
