import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DashboardFooter from '../DashboarFooter/DashboardFooter';

const AllClass = () => {

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/class')
      .then(res => res.json())
      .then(data => setClasses(data));
   }, [classes]);
    

    const handleRemove = id => {
       const proceed = window.confirm('Are You Sure ?');
       if (proceed) {
         const url = `http://localhost:5000/class/${id}`;
         fetch(url, {
           method: 'DELETE',
         })
           .then(res => res.json())
           .then(data => {
             const remaining = classes.filter(product => product._id !== id);
             setClasses(remaining);
             toast.success('Remove Successfully ');
           });
       }
     };
  return (
    <div>
      <div className="pt-3 m-10 bg-gray-100 rounded-lg p-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Class List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Class Name</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Video</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.slice().reverse().map(classItem => (
                <tr key={classItem._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {classItem.classNames}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {classItem.course}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <a
                      href={classItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Watch Video
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleRemove(classItem._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default AllClass;