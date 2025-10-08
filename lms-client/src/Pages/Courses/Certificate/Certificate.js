import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import logo from '../../../Images/Logo/logo-dark.svg';

const Certificate = () => {
  const [users] = useAuthState(auth);
  const [user, setUsers] = useState([]);
  const certificateRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${users?.email}`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [users, users?.email]);

  // Generate and Download PDF
  const downloadCertificate = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Certificate.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gray-100 pt-28 pb-28">
      {/* Certificate Content */}
      <div
        ref={certificateRef}
        className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl border border-gray-300 relative"
      >
        {/* Header with Logo and QR Code */}
        <div className="flex justify-between items-center">
          <div className="text-green-600 text-2xl font-bold">
            <img src={logo} alt="W3Schools Logo" />
          </div>
          {/* QR Code */}
          <div className="w-20 h-20 border border-gray-300 p-2">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://lms.uiu.ac.bd/user/${users?.email}`}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Certificate Title */}
        <h1 className="text-3xl font-bold text-center mt-5">
          CERTIFICATE OF COMPLETION
        </h1>
        <p className="text-center text-gray-600 mt-2">This certifies that</p>

        {/* User Picture and Name */}
        <div className="flex flex-col items-center mt-2">
          {user[0]?.photoURL && (
            <img
              src={user[0]?.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2"
            />
          )}
          <h2 className="text-2xl font-semibold text-gray-800">
            {user[0]?.name}
          </h2>
        </div>

        {/* Course Information */}
        <p className="text-center text-gray-600 mt-2">
          has completed the necessary courses of study and passed the W3Schools'
          React exams and is hereby declared a
        </p>
        <h3 className="text-center text-xl font-bold text-gray-700 mt-2">
          Certified React Developer
        </h3>
        <p className="text-center text-gray-600 mt-2">
          with fundamental knowledge of web development using the React
          Framework.
        </p>

        {/* Issue Date & Signature */}
        <div className="flex justify-between items-center mt-10">
          <p className="text-gray-600">
            Issued: <span className="font-semibold">February 10, 2024</span>
          </p>
          <div className="text-right">
            <p className="font-bold">Thomas Thorsell-Arntsen</p>
            <p className="text-gray-600">for LMS</p>
          </div>
        </div>

        {/* Verification Link */}
        <p className="text-center text-gray-500 mt-5 text-sm">
          Verify completion at{' '}
          <a
            href={`https://lms.uiu.ac.bd/user/${users?.email}`}
            className="text-blue-500 underline"
          >
            https://lms.uiu.ac.bd/
          </a>
        </p>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={downloadCertificate}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;

// import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../../firebase.init';
// import logo from '../../../Images/Logo/logo-dark.svg';

// const Certificate = () => {
//   const [users] = useAuthState(auth);
//   const [user, setUsers] = useState([]); // Replace with actual booking state fetching logic

//   useEffect(() => {
//     fetch(`http://localhost:5000/user/${users?.email}`)
//       .then(res => res.json())
//       .then(data => setUsers(data));
//   }, [users, users?.email]);
//   console.log(user);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
//       <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl border border-gray-300 relative">
//         {/* W3Schools Logo */}
//         <div className="flex justify-between items-center">
//           <div className="text-green-600 text-2xl font-bold">
//             <img src={logo} alt="" />
//           </div>
//           <div className="w-16 h-16">
//             <img
//               src="https://pngimg.com/uploads/qr_code/small/qr_code_PNG7.png"
//               alt=""
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>

//         {/* Certificate Title */}
//         <h1 className="text-3xl font-bold text-center mt-5">
//           CERTIFICATE OF COMPLETION
//         </h1>
//         <p className="text-center text-gray-600 mt-2">This certifies that</p>

//         {/* Recipient Name */}
//         <h2 className="text-center text-2xl font-semibold text-gray-800 mt-2">
//           {user[0]?.name}
//         </h2>

//         {/* Course Info */}
//         <p className="text-center text-gray-600 mt-2">
//           has completed the necessary courses of study and passed the W3Schools'
//           React exams and is hereby declared a
//         </p>

//         <h3 className="text-center text-xl font-bold text-gray-700 mt-2">
//           Certified React Developer
//         </h3>
//         <p className="text-center text-gray-600 mt-2">
//           with fundamental knowledge of web development using the React
//           Framework.
//         </p>

//         {/* Issue Date & Signature */}
//         <div className="flex justify-between items-center mt-10">
//           <p className="text-gray-600">
//             Issued: <span className="font-semibold">February 10, 2024</span>
//           </p>
//           <div className="text-right">
//             <p className="font-bold">Thomas Thorsell-Arntsen</p>
//             <p className="text-gray-600">for LMS</p>
//           </div>
//         </div>

//         {/* Verification Link */}
//         <p className="text-center text-gray-500 mt-5 text-sm">
//           Verify completion at{' '}
//           <a href="https://lms.uiu.ac.bd" className="text-blue-500 underline">
//             https://lms.uiu.ac.bd/
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Certificate;
