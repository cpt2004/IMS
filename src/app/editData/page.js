// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from 'next/navigation';
// import { apiUrl } from "../page";

// const EditData = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const studentId = searchParams.get("id");

//     const [studentData, setStudentData] = useState({
//         studentRollNo: "",
//         studentName: "",
//         studentDept: "",
//         studentYear: "",
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     // Fetch the existing student data
//     const fetchStudentData = async () => {
//         try {
//             const response = await fetch(`${apiUrl}/editData/id=${studentId}`);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch data");
//             }
//             const data = await response.json();
//             setStudentData(data);
//             setLoading(false);
//         } catch (err) {
//             setLoading(false);
//             setError(true);
//         }
//     };

//     // Update studentData state when inputs change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setStudentData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${apiUrl}/editData/id=${studentId}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(studentData),
//             });

//             if (response.ok) {
//                 alert("Data updated successfully!");
//                 router.push("/"); // Navigate back to the homepage or another page
//             } else {
//                 throw new Error("Failed to update data");
//             }
//         } catch (err) {
//             alert("Error updating data: " + err.message);
//         }
//     };

//     useEffect(() => {
//         fetchStudentData();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Couldn't connect to the server!</p>;
//     }

//     return (
//         <div>
//             <h1>Edit Data Page</h1>
//             <form onSubmit={handleSubmit}>
//                 <table className='editDataTable'>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <label htmlFor="studentRollNo">Student Roll Number</label>
//                             </td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     id="studentRollNo"
//                                     name="studentRollNo"
//                                     value={studentData.studentRollNo}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label htmlFor="studentName">Student Name</label>
//                             </td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     id="studentName"
//                                     name="studentName"
//                                     value={studentData.studentName}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label htmlFor="studentDept">Student Department</label>
//                             </td>
//                             <td>
//                                 <select
//                                     id="studentDept"
//                                     name="studentDept"
//                                     value={studentData.studentDept}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="Artificial Intelligence and Data Science">
//                                         Artificial Intelligence and Data Science
//                                     </option>
//                                     <option value="Computer and Communication Engineering">
//                                         Computer and Communication Engineering
//                                     </option>
//                                     <option value="Computer Science and Engineering">
//                                         Computer Science and Engineering
//                                     </option>
//                                     <option value="Computer Science and Business Systems">
//                                         Computer Science and Business Systems
//                                     </option>
//                                     <option value="Electronics and Communication Engineering">
//                                         Electronics and Communication Engineering
//                                     </option>
//                                     <option value="Mechanical Engineering">
//                                         Mechanical Engineering
//                                     </option>
//                                 </select>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label htmlFor="studentYear">Student Year</label>
//                             </td>
//                             <td>
//                                 <select
//                                     id="studentYear"
//                                     name="studentYear"
//                                     value={studentData.studentYear}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="1">I</option>
//                                     <option value="2">II</option>
//                                     <option value="3">III</option>
//                                     <option value="4">IV</option>
//                                 </select>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td></td>
//                             <td>
//                                 <div className="editDataOptions">
//                                     <button type="submit">Update</button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             router.back();
//                                         }}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </form>
//         </div>
//     );
// };

// export default EditData;


"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { apiUrl } from "../page";

const EditDataContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentId = searchParams.get("id");

    const [studentData, setStudentData] = useState({
        studentRollNo: "",
        studentName: "",
        studentDept: "",
        studentYear: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch the existing student data
    const fetchStudentData = async () => {
        try {
            const response = await fetch(`${apiUrl}/editData/id=${studentId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setStudentData(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
        }
    };

    // Update studentData state when inputs change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/editData/id=${studentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                alert("Data updated successfully!");
                router.push("/"); // Navigate back to the homepage or another page
            } else {
                throw new Error("Failed to update data");
            }
        } catch (err) {
            alert("Error updating data: " + err.message);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Couldn't connect to the server!</p>;
    }

    return (
        <div>
            <h1>Edit Data Page</h1>
            <form onSubmit={handleSubmit}>
                <table className="editDataTable">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="studentRollNo">Student Roll Number</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    id="studentRollNo"
                                    name="studentRollNo"
                                    value={studentData.studentRollNo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="studentName">Student Name</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="studentName"
                                    name="studentName"
                                    value={studentData.studentName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="studentDept">Student Department</label>
                            </td>
                            <td>
                                <select
                                    id="studentDept"
                                    name="studentDept"
                                    value={studentData.studentDept}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Artificial Intelligence and Data Science">
                                        Artificial Intelligence and Data Science
                                    </option>
                                    <option value="Computer and Communication Engineering">
                                        Computer and Communication Engineering
                                    </option>
                                    <option value="Computer Science and Engineering">
                                        Computer Science and Engineering
                                    </option>
                                    <option value="Computer Science and Business Systems">
                                        Computer Science and Business Systems
                                    </option>
                                    <option value="Electronics and Communication Engineering">
                                        Electronics and Communication Engineering
                                    </option>
                                    <option value="Mechanical Engineering">
                                        Mechanical Engineering
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="studentYear">Student Year</label>
                            </td>
                            <td>
                                <select
                                    id="studentYear"
                                    name="studentYear"
                                    value={studentData.studentYear}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <div className="editDataOptions">
                                    <button type="submit">Update</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            router.back();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

const EditDataPage = () => (
    <Suspense fallback={<div>Loading edit data...</div>}>
        <EditDataContent />
    </Suspense>
);

export default EditDataPage;
