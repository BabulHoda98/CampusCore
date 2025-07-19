
const RecentlyJoined = () => {
  const orgs = [
    { name: "Greenwood High School", date: "2024-07-01", contact: "John Deo", status: "Active" },
    { name: "City University", date: "2024-06-28", contact: "John Smith", status: "Active" },
    { name: "Valley Elementary", date: "2024-06-25", contact: "Emily White", status: "Active" },
    { name: "Northwood College Prep", date: "2024-06-20", contact: "Michael Brown", status: "Active" },
    { name: "Springfield Academy", date: "2024-06-15", contact: "Admin", status: "Active" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Recently Joined Organizations</h3>
      <table className="w-full text-sm text-left text-gray-700">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2">Organization Name</th>
            <th className="px-3 py-2">Date Joined</th>
            <th className="px-3 py-2">Contact Person</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2">{org.name}</td>
              <td className="px-3 py-2">{org.date}</td>
              <td className="px-3 py-2">{org.contact}</td>
              <td className="px-3 py-2 text-green-600 font-semibold">{org.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyJoined;
