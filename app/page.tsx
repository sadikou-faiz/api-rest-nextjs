"use client"
import { useEffect, useState } from 'react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);


  // Function to fetch all employees
  const fetchEmployees = () => {
    fetch('/api/employes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error));
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Position</th>
            {/* Remove Actions header */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="py-2 px-4 border-b">{emp.firstName}</td>
              <td className="py-2 px-4 border-b">{emp.lastName}</td>
              <td className="py-2 px-4 border-b">{emp.email}</td>
              <td className="py-2 px-4 border-b">{emp.position}</td>
              {/* Remove Actions column */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Remove Add New Employee section */}
    </div>
  );
}
