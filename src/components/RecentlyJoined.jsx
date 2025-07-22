  // import React, { useState, useEffect, useMemo } from 'react';
  // import { format } from 'date-fns';

  // const RecentlyJoined = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  //   const [statusFilter, setStatusFilter] = useState('all');
  //   const [processing, setProcessing] = useState({ id: null, action: null });
  //   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  //   const itemsPerPage = 3;


  //   const [organizations, setOrganizations] = useState([
  //     { id: 1, name: "Greenwood High School", date: "2024-07-01", contact: "John Deo", status: "Active" },
  //     { id: 2, name: "City University", date: "2024-06-28", contact: "John Smith", status: "Active" },
  //     { id: 3, name: "Valley Elementary", date: "2024-06-25", contact: "Emily White", status: "Pending" },
  //     { id: 4, name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown", status: "Active" },
  //     { id: 5, name: "Springfield Academy", date: "2024-06-15", contact: "Admin", status: "Suspended" },
  //     { id: 6, name: "Westside Technical Institute", date: "2024-06-10", contact: "Sarah Johnson", status: "Active" },
  //     { id: 7, name: "Lakeshore Middle School", date: "2024-06-05", contact: "Robert Taylor", status: "Pending" },
  //   ]);

    
  //   const [showViewModal, setShowViewModal] = useState(false);
  //   const [showEditModal, setShowEditModal] = useState(false);
  //   const [selectedOrg, setSelectedOrg] = useState(null);

  //   // Simulate API functions
  //   const api = {
  //     removeOrganization: (id) => new Promise((resolve) => setTimeout(() => resolve(), 1000)),
  //     updateOrganization: (data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000)),
  //   };

  //   // Show notification
  //   const showNotification = (message, type) => {
  //     setNotification({ show: true, message, type });
  //     setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  //   };

  //   // Simulate initial data fetch
  //   useEffect(() => {
  //     const fetchData = () => {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1500);
  //     };
  //     fetchData();
  //   }, []);

  //   // Apply sorting
  //   const sortedOrgs = useMemo(() => {
  //     const sortableItems = [...organizations];
  //     if (sortConfig.key) {
  //       sortableItems.sort((a, b) => {
  //         const aValue = a[sortConfig.key];
  //         const bValue = b[sortConfig.key];

  //         if (sortConfig.key === 'date') {
  //           return sortConfig.direction === 'ascending'
  //             ? new Date(aValue) - new Date(bValue)
  //             : new Date(bValue) - new Date(aValue);
  //         }

  //         if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
  //         if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
  //         return 0;
  //       });
  //     }
  //     return sortableItems;
  //   }, [organizations, sortConfig]);

  //   // Apply search and status filters
  //   const filteredOrgs = useMemo(() => {
  //     return sortedOrgs.filter(org => {
  //       const matchesSearch =
  //         org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         org.contact.toLowerCase().includes(searchTerm.toLowerCase());

  //       const matchesStatus = statusFilter === 'all' || org.status === statusFilter;

  //       return matchesSearch && matchesStatus;
  //     });
  //   }, [sortedOrgs, searchTerm, statusFilter]);

  //   // Apply pagination
  //   const paginatedOrgs = useMemo(() => {
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     return filteredOrgs.slice(startIndex, startIndex + itemsPerPage);
  //   }, [filteredOrgs, currentPage]);

  //   // Handle sorting
  //   const requestSort = (key) => {
  //     let direction = 'ascending';
  //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //       direction = 'descending';
  //     }
  //     setSortConfig({ key, direction });
  //     setCurrentPage(1);
  //   };

  //   // Handle page change
  //   const totalPages = Math.ceil(filteredOrgs.length / itemsPerPage);

  //   // Get sort indicator
  //   const getSortIndicator = (key) => {
  //     if (sortConfig.key !== key) return null;
  //     return sortConfig.direction === 'ascending' ? '↑' : '↓';
  //   };

  //   // Handle export to CSV
  //   const handleExport = () => {
  //     const csvContent = [
  //       ['Organization Name', 'Date Joined', 'Contact Person', 'Status'],
  //       ...filteredOrgs.map(org => [org.name, org.date, org.contact, org.status])
  //     ].map(row => row.join(',')).join('\n');

  //     const blob = new Blob([csvContent], { type: 'text/csv' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'organizations.csv';
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   };

  //   // --- Implementations for View, Edit, Remove with backend integration ---
  //   const handleView = (orgId) => {
  //     const orgToView = organizations.find(org => org.id === orgId);
  //     setSelectedOrg(orgToView);
  //     setShowViewModal(true);
  //   };

  //   const handleEdit = (orgId) => {
  //     const orgToEdit = organizations.find(org => org.id === orgId);
  //     setSelectedOrg(orgToEdit);
  //     setShowEditModal(true);
  //   };

  //   const handleSaveEdit = async (editedOrg) => {
  //     setProcessing({ id: editedOrg.id, action: 'edit' });
  //     try {
  //       // Simulate API call to save changes
  //       await api.updateOrganization(editedOrg);
        
  //       setOrganizations(prevOrgs =>
  //         prevOrgs.map(org => (org.id === editedOrg.id ? editedOrg : org))
  //       );
  //       showNotification('Organization updated successfully', 'success');
  //     } catch (error) {
  //       showNotification('Failed to update organization', 'error');
  //     } finally {
  //       setProcessing({ id: null, action: null });
  //       setShowEditModal(false);
  //       setSelectedOrg(null);
  //     }
  //   };

  //   const handleRemove = async (orgId) => {
  //     if (!window.confirm('Are you sure you want to remove this organization?')) return;
      
  //     setProcessing({ id: orgId, action: 'remove' });
  //     try {
  //       // Simulate API call to remove organization
  //       await api.removeOrganization(orgId);
        
  //       setOrganizations(prevOrgs => prevOrgs.filter(org => org.id !== orgId));
  //       setCurrentPage(1);
  //       showNotification('Organization removed successfully', 'success');
  //     } catch (error) {
  //       showNotification('Failed to remove organization', 'error');
  //     } finally {
  //       setProcessing({ id: null, action: null });
  //     }
  //   };

  //   // Notification component
  //   const Notification = () => {
  //     if (!notification.show) return null;
      
  //     const bgColor = notification.type === 'success' 
  //       ? 'bg-green-100 border-green-500 text-green-700' 
  //       : 'bg-red-100 border-red-500 text-red-700';
      
  //     return (
  //       <div className={`fixed top-4 right-4 z-50 border-l-4 p-4 ${bgColor} rounded shadow-lg`}>
  //         <div className="flex items-center">
  //           <span className="mr-2">
  //             {notification.type === 'success' ? '✓' : '⚠️'}
  //           </span>
  //           {notification.message}
  //         </div>
  //       </div>
  //     );
  //   };

  //   // --- Modal Components ---
  //   const ViewModal = ({ org, onClose }) => {
  //     if (!org) return null;
  //     return (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
  //         <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
  //           <h2 className="text-xl font-bold mb-4">Organization Details</h2>
  //           <p><strong>Name:</strong> {org.name}</p>
  //           <p><strong>Date Joined:</strong> {format(new Date(org.date), 'MMM dd, yyyy')}</p>
  //           <p><strong>Contact:</strong> {org.contact}</p>
  //           <p><strong>Status:</strong> {org.status}</p>
  //           <button
  //             onClick={onClose}
  //             className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     );
  //   };

  //   const EditModal = ({ org, onClose, onSave }) => {
  //     const [editedName, setEditedName] = useState(org ? org.name : '');
  //     const [editedContact, setEditedContact] = useState(org ? org.contact : '');
  //     const [editedStatus, setEditedStatus] = useState(org ? org.status : '');
  //     const [isSaving, setIsSaving] = useState(false);

  //     useEffect(() => {
  //       if (org) {
  //         setEditedName(org.name);
  //         setEditedContact(org.contact);
  //         setEditedStatus(org.status);
  //       }
  //     }, [org]);

  //     const handleSubmit = async (e) => {
  //       e.preventDefault();
  //       setIsSaving(true);
  //       try {
  //         await onSave({ 
  //           ...org, 
  //           name: editedName, 
  //           contact: editedContact, 
  //           status: editedStatus 
  //         });
  //       } finally {
  //         setIsSaving(false);
  //       }
  //     };

  //     if (!org) return null;

  //     return (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
  //         <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full border border-red-500">
  //           <h2 className="text-xl font-bold mb-4">Edit Organization</h2>
  //           <form onSubmit={handleSubmit}>
  //             <div className="mb-3 ">
  //               <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
  //               <input
  //                 type="text"
  //                 id="orgName"
  //                 value={editedName}
  //                 onChange={(e) => setEditedName(e.target.value)}
  //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
  //                 required
  //               />
  //             </div>
  //             <div className="mb-3">
  //               <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
  //               <input
  //                 type="text"
  //                 id="contactPerson"
  //                 value={editedContact}
  //                 onChange={(e) => setEditedContact(e.target.value)}
  //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
  //                 required
  //               />
  //             </div>
  //             <div className="mb-4">
  //               <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
  //               <select
  //                 id="status"
  //                 value={editedStatus}
  //                 onChange={(e) => setEditedStatus(e.target.value)}
  //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
  //               >
  //                 <option value="Active">Active</option>
  //                 <option value="Pending">Pending</option>
  //                 <option value="Suspended">Suspended</option>
  //               </select>
  //             </div>
  //             <div className="flex justify-end space-x-3">
  //               <button
  //                 type="button"
  //                 onClick={onClose}
  //                 disabled={isSaving}
  //                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md disabled:opacity-75"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //                 disabled={isSaving}
  //                 className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ${
  //                   isSaving ? 'opacity-75 cursor-not-allowed' : ''
  //                 }`}
  //               >
  //                 {isSaving ? (
  //                   <span className="flex items-center">
  //                     <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
  //                     Saving...
  //                   </span>
  //                 ) : (
  //                   'Save Changes'
  //                 )}
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     );
  //   };

  //   return (
  //     <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
  //       <Notification />
        
  //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
  //         <h3 className="text-lg font-semibold text-gray-800">Recently Joined Organizations</h3>

  //         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
  //           {/* Status Filter Dropdown */}
  //           <select
  //             value={statusFilter}
  //             onChange={(e) => {
  //               setStatusFilter(e.target.value);
  //               setCurrentPage(1);
  //             }}
  //             className="w-full sm:w-auto p-2 border rounded-md text-sm"
  //           >
  //             <option value="all">All Statuses</option>
  //             <option value="Active">Active</option>
  //             <option value="Pending">Pending</option>
  //             <option value="Suspended">Suspended</option>
  //           </select>

  //           <input
  //             type="text"
  //             placeholder="Search organizations..."
  //             className="w-full sm:w-64 p-2 border rounded-md text-sm"
  //             value={searchTerm}
  //             onChange={(e) => {
  //               setSearchTerm(e.target.value);
  //               setCurrentPage(1);
  //             }}
  //           />

  //           <button
  //             onClick={handleExport}
  //             className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
  //               <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
  //             </svg>
  //             Export CSV
  //           </button>
  //         </div>
  //       </div>

  //       {isLoading ? (
  //         <div className="flex justify-center items-center py-10">
  //           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  //         </div>
  //       ) : (
  //         <>
  //           <div className="overflow-x-auto">
  //             <table className="w-full text-sm text-left text-gray-700">
  //               <thead>
  //                 <tr className="border-b bg-gray-50">
  //                   <th
  //                     className="px-3 py-2 cursor-pointer"
  //                     onClick={() => requestSort('name')}
  //                   >
  //                     <div className="flex items-center gap-1">
  //                       Organization Name
  //                       <span className="text-xs">{getSortIndicator('name')}</span>
  //                     </div>
  //                   </th>
  //                   <th
  //                     className="px-3 py-2 cursor-pointer"
  //                     onClick={() => requestSort('date')}
  //                   >
  //                     <div className="flex items-center gap-1">
  //                       Date Joined
  //                       <span className="text-xs">{getSortIndicator('date')}</span>
  //                     </div>
  //                   </th>
  //                   <th
  //                     className="px-3 py-2 cursor-pointer"
  //                     onClick={() => requestSort('contact')}
  //                   >
  //                     <div className="flex items-center gap-1">
  //                       Contact Person
  //                       <span className="text-xs">{getSortIndicator('contact')}</span>
  //                     </div>
  //                   </th>
  //                   <th
  //                     className="px-3 py-2 cursor-pointer"
  //                     onClick={() => requestSort('status')}
  //                   >
  //                     <div className="flex items-center gap-1">
  //                       Status
  //                       <span className="text-xs">{getSortIndicator('status')}</span>
  //                     </div>
  //                   </th>
  //                   <th className="px-3 py-2">Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {paginatedOrgs.length > 0 ? (
  //                   paginatedOrgs.map((org) => (
  //                     <tr key={org.id} className="border-b hover:bg-gray-50 transition-colors">
  //                       <td className="px-3 py-2">{org.name}</td>
  //                       <td className="px-3 py-2">{format(new Date(org.date), 'MMM dd, yyyy')}</td>
  //                       <td className="px-3 py-2">{org.contact}</td>
  //                       <td className="px-3 py-2">
  //                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                           org.status === 'Active'
  //                             ? 'bg-green-100 text-green-800'
  //                             : org.status === 'Pending'
  //                               ? 'bg-yellow-100 text-yellow-800'
  //                               : 'bg-red-100 text-red-800'
  //                         }`}>
  //                           {org.status}
  //                         </span>
  //                       </td>
  //                       <td className="px-3 py-2">
  //                         <div className="flex space-x-2">
  //                           <button
  //                             onClick={() => handleView(org.id)}
  //                             className="text-blue-600 hover:text-blue-900 transition-colors"
  //                             title="View"
  //                             disabled={processing.id === org.id}
  //                           >
  //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
  //                               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  //                               <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  //                             </svg>
  //                           </button>
  //                           <button
  //                             onClick={() => handleEdit(org.id)}
  //                             className="text-gray-600 hover:text-gray-900 transition-colors"
  //                             title="Edit"
  //                             disabled={processing.id === org.id}
  //                           >
  //                             {processing.id === org.id && processing.action === 'edit' ? (
  //                               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600"></div>
  //                             ) : (
  //                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
  //                                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  //                               </svg>
  //                             )}
  //                           </button>
  //                           <button
  //                             onClick={() => handleRemove(org.id)}
  //                             className="text-red-600 hover:text-red-900 transition-colors"
  //                             title="Remove"
  //                             disabled={processing.id === org.id}
  //                           >
  //                             {processing.id === org.id && processing.action === 'remove' ? (
  //                               <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></div>
  //                             ) : (
  //                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
  //                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  //                               </svg>
  //                             )}
  //                           </button>
  //                         </div>
  //                       </td>
  //                     </tr>
  //                   ))
  //                 ) : (
  //                   <tr>
  //                     <td colSpan="5" className="px-3 py-4 text-center text-gray-500">
  //                       No organizations found
  //                     </td>
  //                   </tr>
  //                 )}
  //               </tbody>
  //             </table>
  //           </div>

  //           {paginatedOrgs.length > 0 && (
  //             <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
  //               <div className="text-sm text-gray-600">
  //                 Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrgs.length)}-
  //                 {Math.min(currentPage * itemsPerPage, filteredOrgs.length)} of {filteredOrgs.length} organizations
  //               </div>

  //               <div className="flex items-center space-x-2">
  //                 <button
  //                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
  //                   disabled={currentPage === 1}
  //                   className={`px-3 py-1 rounded-md ${
  //                     currentPage === 1
  //                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
  //                       : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
  //                   }`}
  //                 >
  //                   Previous
  //                 </button>

  //                 <span className="text-sm">
  //                   Page {currentPage} of {Math.max(1, totalPages)}
  //                 </span>

  //                 <button
  //                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
  //                   disabled={currentPage === totalPages || totalPages === 0}
  //                   className={`px-3 py-1 rounded-md ${
  //                     currentPage === totalPages || totalPages === 0
  //                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
  //                       : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
  //                   }`}
  //                 >
  //                   Next
  //                 </button>
  //               </div>
  //             </div>
  //           )}
  //         </>
  //       )}

  //       {/* Render Modals */}
  //       {showViewModal && <ViewModal org={selectedOrg} onClose={() => setShowViewModal(false)} />}
  //       {showEditModal && <EditModal org={selectedOrg} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />}
  //     </div>
  //   );
  // };

  // export default RecentlyJoined;

// -------------------------------------------------------
// import React, { useState, useEffect, useMemo } from 'react';
// import { format } from 'date-fns';

// const RecentlyJoined = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
//   const itemsPerPage = 3;

//   const [organizations, setOrganizations] = useState([
//     { id: 1, name: "Greenwood High School", date: "2024-07-01", contact: "John Deo" },
//     { id: 2, name: "City University", date: "2024-06-28", contact: "John Smith" },
//     { id: 3, name: "Valley Elementary", date: "2024-06-25", contact: "Emily White" },
//     { id: 4, name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown" },
//     { id: 5, name: "Springfield Academy", date: "2024-06-15", contact: "Admin" },
//     { id: 6, name: "Westside Technical Institute", date: "2024-06-10", contact: "Sarah Johnson" },
//     { id: 7, name: "Lakeshore Middle School", date: "2024-06-05", contact: "Robert Taylor" },
//   ]);

//   // Simulate initial data fetch
//   useEffect(() => {
//     const fetchData = () => {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1500);
//     };
//     fetchData();
//   }, []);

//   // Apply sorting
//   const sortedOrgs = useMemo(() => {
//     const sortableItems = [...organizations];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];

//         if (sortConfig.key === 'date') {
//           return sortConfig.direction === 'ascending'
//             ? new Date(aValue) - new Date(bValue)
//             : new Date(bValue) - new Date(aValue);
//         }

//         if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [organizations, sortConfig]);

//   // Apply pagination
//   const paginatedOrgs = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return sortedOrgs.slice(startIndex, startIndex + itemsPerPage);
//   }, [sortedOrgs, currentPage]);

//   // Handle sorting
//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//     setCurrentPage(1);
//   };

//   // Handle page change
//   const totalPages = Math.ceil(sortedOrgs.length / itemsPerPage);

//   // Get sort indicator
//   const getSortIndicator = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === 'ascending' ? '↑' : '↓';
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">Recently Joined Organizations</h3>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center py-10">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left text-gray-700">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th
//                     className="px-3 py-2 cursor-pointer"
//                     onClick={() => requestSort('name')}
//                   >
//                     <div className="flex items-center gap-1">
//                       Name
//                       <span className="text-xs">{getSortIndicator('name')}</span>
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 py-2 cursor-pointer"
//                     onClick={() => requestSort('date')}
//                   >
//                     <div className="flex items-center gap-1">
//                       Date
//                       <span className="text-xs">{getSortIndicator('date')}</span>
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 py-2 cursor-pointer"
//                     onClick={() => requestSort('contact')}
//                   >
//                     <div className="flex items-center gap-1">
//                       Contact
//                       <span className="text-xs">{getSortIndicator('contact')}</span>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedOrgs.length > 0 ? (
//                   paginatedOrgs.map((org) => (
//                     <tr key={org.id} className="border-b hover:bg-gray-50 transition-colors">
//                       <td className="px-3 py-2 font-medium">{org.name}</td>
//                       <td className="px-3 py-2">{format(new Date(org.date), 'MMM dd, yyyy')}</td>
//                       <td className="px-3 py-2">{org.contact}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="px-3 py-4 text-center text-gray-500">
//                       No organizations found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {paginatedOrgs.length > 0 && (
//             <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
//               <div className="text-sm text-gray-600">
//                 Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedOrgs.length)}-
//                 {Math.min(currentPage * itemsPerPage, sortedOrgs.length)} of {sortedOrgs.length} organizations
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === 1
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                   }`}
//                 >
//                   Previous
//                 </button>

//                 <span className="text-sm">
//                   Page {currentPage} of {Math.max(1, totalPages)}
//                 </span>

//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages || totalPages === 0}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === totalPages || totalPages === 0
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RecentlyJoined;
// -------------------------------------------------------
import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const RecentlyJoined = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const itemsPerPage = 3;

  const [organizations, setOrganizations] = useState([
    { id: 1, name: "Greenwood High School", date: "2024-07-01", contact: "John Deo" },
    { id: 2, name: "City University", date: "2024-06-28", contact: "John Smith" },
    { id: 3, name: "Valley Elementary", date: "2024-06-25", contact: "Emily White" },
    { id: 4, name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown" },
    { id: 5, name: "Springfield Academy", date: "2024-06-15", contact: "Admin" },
    { id: 6, name: "Westside Technical Institute", date: "2024-06-10", contact: "Sarah Johnson" },
    { id: 7, name: "Lakeshore Middle School", date: "2024-06-05", contact: "Robert Taylor" },
  ]);

  // Simulate initial data fetch
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  // Apply sorting
  const sortedOrgs = useMemo(() => {
    const sortableItems = [...organizations];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'ascending'
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [organizations, sortConfig]);

  // Apply pagination
  const paginatedOrgs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedOrgs.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedOrgs, currentPage]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Handle page change
  const totalPages = Math.ceil(sortedOrgs.length / itemsPerPage);

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recently Joined Organizations</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Name
                      <span className="text-xs">{getSortIndicator('name')}</span>
                    </div>
                  </th>
                  <th
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <span className="text-xs">{getSortIndicator('date')}</span>
                    </div>
                  </th>
                  <th
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => requestSort('contact')}
                  >
                    <div className="flex items-center gap-1">
                      Contact
                      <span className="text-xs">{getSortIndicator('contact')}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrgs.length > 0 ? (
                  paginatedOrgs.map((org) => (
                    <tr key={org.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 font-medium">{org.name}</td>
                      <td className="px-3 py-2">{format(new Date(org.date), 'MMM dd, yyyy')}</td>
                      <td className="px-3 py-2">{org.contact}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-3 py-4 text-center text-gray-500">
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {paginatedOrgs.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedOrgs.length)}-
                {Math.min(currentPage * itemsPerPage, sortedOrgs.length)} of {sortedOrgs.length} organizations
              </div>

              <div className="flex items-center space-x-2">
                <IconButton
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  size="small"
                  aria-label="previous page"
                >
                  <ChevronLeft />
                </IconButton>

                <span className="text-sm">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>

                <IconButton
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  size="small"
                  aria-label="next page"
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentlyJoined;
