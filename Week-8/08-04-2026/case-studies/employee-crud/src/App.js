import React , {useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import EmployeeList from './features/employees/employeeList';
import EmployeeAdd from './features/employees/employeeAdd';
import EmployeeEdit from './features/employees/employeeEdit';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Employee Management</h1>
        <EmployeeAdd />
        <EmployeeList onEdit={(employee) => setSelectedEmployee(employee)} />
        {selectedEmployee && (
          <EmployeeEdit selectedEmployee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        )}
        <a href="https://react.dev">Learn React</a>
      </div>
    </Provider>
  );
}

export default App;

