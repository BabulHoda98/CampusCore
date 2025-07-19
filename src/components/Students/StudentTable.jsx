// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// const StudentTable = ({ students }) => {
//   return (
//     <Paper className="p-4 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Student List</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Roll No</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Course</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student) => (
//             <TableRow key={student.id}>
//               <TableCell>{student.name}</TableCell>
//               <TableCell>{student.roll}</TableCell>
//               <TableCell>{student.email}</TableCell>
//               <TableCell>{student.course}</TableCell>
//               <TableCell>
//                 <button className="text-blue-600 hover:underline">Edit</button>
//                 <button className="text-red-600 ml-4 hover:underline">Delete</button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// export default StudentTable;
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const StudentTable = ({ students }) => {
  return (
    <Paper className="p-4 rounded-xl shadow-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roll No</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.roll}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.course}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StudentTable;
