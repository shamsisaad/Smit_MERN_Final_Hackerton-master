import React, { useEffect, useState } from 'react';
import { getStudentDashboard } from '../../utils/api'; // Assuming this function fetches student data

// Define a type for the student data
interface Student {
  firstName: string;
  lastName: string;
  email: string;
  rollNumber: string;
}

const Dashboard: React.FC = () => {
  // Use the defined type for the student state
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('studentToken'); // Assuming token is stored in local storage
        if (token) {
          const studentData = await getStudentDashboard(token);
          setStudent(studentData); // Set student data after fetching it
        }
      } catch (error) {
        console.error('Error fetching student dashboard:', error);
      }
    };

    fetchData();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {student.firstName} {student.lastName}</h1>
      <p>Email: {student.email}</p>
      <p>Roll Number: {student.rollNumber}</p>

      {/* Add more details or actions related to student dashboard here */}
    </div>
  );
};

export default Dashboard;
