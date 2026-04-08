import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { deleteEmployee } from "./employeeSlice";

function EmployeeList({onEdit}) {
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
    return (
    <div>
      <h2>Employee List</h2>
      {employees.map((employee) => (
        <div key={employee.id}>
          <p> Name : {employee.name}</p>
          <p> Position : {employee.position}</p>
          <button onClick={() => onEdit(employee)}>Edit</button>
          <button onClick={() => dispatch(deleteEmployee(employee.id))}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default EmployeeList;