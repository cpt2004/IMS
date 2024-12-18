"use client";
import '../globals.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl } from '../page';

const ViewData = () => {

  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const deleteData = async (student) => {
    if (confirm("Are you sure you want to proceed ? This action is irrversible !!")){
      try {
        const response = await fetch(`${apiUrl}/deleteData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });
  
        if (response.ok) {
            alert("Data deleted successfully !!")
            fetchStudents();
       } else {
            console.error("Failed to delete data...");
            alert("Failed to delete data !!")
        }
    } catch (error) {
        console.error("Error during form submission:", error);
}}};

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${apiUrl}/viewData`);
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Couldn't connect to the server !!</p>
  }

  return (
    <div className='viewDataBody'>
      <table className='viewDataTable'>
        <thead>
          <tr>
              <th>S.No</th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
              <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {(students.length === 0) ? (
            <tr>
              <td colSpan="6"><p>No Records Found !!</p></td>
            </tr>
            ) : (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.studentRollNo}</td>
                <td>{student.studentName}</td>
                <td>{student.studentDept}</td>
                <td>{student.studentYear}</td>
                <td>
                  <div className='optionsMenu'>
                    <button
                      type='button'
                      onClick={() => {
                        router.push(`/editData?id=${student.id}`)
                      }}
                      >Edit</button>
                
                    <button
                      type='button'
                      onClick={() => deleteData(student)}
                      >Delete</button>
                  </div>
              </td>
            </tr>
            )))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewData;