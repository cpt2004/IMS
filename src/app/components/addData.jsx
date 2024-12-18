"use client";
import { useState } from 'react';
import '../globals.css';
import { apiUrl } from '../page';

const AddData = () => {

    const [showAddData, setShowAddData] = useState(false);
    const [changeAddData, setChangeAddData] = useState(false);
    const [selectDept, setSelectDept] = useState(false);
    const [selectYear, setSelectYear] = useState(false);

    const formData = {
        studentRollNo: null,
        studentName: null,
        studentDept: null,
        studentYear: null,
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        formData.studentRollNo = document.getElementById('studentRollNo').value;
        formData.studentName = document.getElementById("studentName").value;
        formData.studentDept = document.getElementById("studentDept").value;
        formData.studentYear = document.getElementById("studentYear").value;

        try {
            const response = await fetch(`${apiUrl}/addData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Data added successfully !!")
                location.reload();
            } else {
                alert("Failed to add data !!")
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("Unexpected error occured !!")
        }
    };

    return(
        <div className='addDataBody'>
            <button
                type='button'
                className='addDataButton'
                id='addDataButton'
                onClick={() => {
                if (showAddData === false){
                    setShowAddData(true);
                    setChangeAddData(true);
                }else{
                    setShowAddData(false);
                    setChangeAddData(false);
                }
                }}
            >{(!changeAddData) ? 'Add Data' : 'Cancel'}</button>
      
            {showAddData && (
            <form onSubmit={handleSubmit}>
                <table className='addDataTable'>
                <tbody>   
            
                <tr>
                <td> <label htmlFor="studentRollNo">Student Roll Number</label><br/> </td>
                <td><input type="number" id="studentRollNo" name="studentRollNo" required></input></td>
                </tr>

                <tr>
                <td><label htmlFor="studentName">Student Name</label><br/></td>
                <td><input type="text" id="studentName" name="studentName" required></input></td>
                </tr>

                <tr>
                <td><label htmlFor="studentDept">Student Department</label></td>
                <td>
                <select id='studentDept' name='studentDept' onChange={() => {setSelectDept(true);}} required>
                    <option value="" disabled={selectDept}>--Select Department--</option>
                    <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                    <option value="Computer and Communication Engineering">Computer and Communication Engineering</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Computer Science and Business Systems">Computer Science and Business Systems</option>
                    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
                </td>
                </tr>

                <tr>
                <td> <label htmlFor="studentYear">Student Year</label></td>
                <td>
                <select id='studentYear' name='studentYear' onChange={() => {setSelectYear(true);}} required>
                    <option value={""} disabled={selectYear}>--Select Year--</option>
                    <option value={1}>I</option>
                    <option value={2}>II</option>
                    <option value={3}>III</option>
                    <option value={4}>IV</option>
                </select>
                </td>
                </tr>

                <tr>
                <td></td>
                <td>
                    <div className="addDataOptions">
                        <button type="submit">Add</button>
                        <button type='reset'>Clear</button>
                    </div>
                    </td>
                </tr>
                </tbody>
                </table>
            </form>
            )}
            {showAddData && <hr/>}
        </div>
    )
}

export default AddData;