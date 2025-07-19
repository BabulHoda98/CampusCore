import React, { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';
import StudentTable from '../components/Students/StudentTable';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="p-6">
      <StudentTable students={students} />
    </div>
  );
};

export default Students;
