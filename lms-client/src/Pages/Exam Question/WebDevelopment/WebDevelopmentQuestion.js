// step -6

import { Camera, Check, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

const WebDevelopmentQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [uploads, setUploads] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [ocrLoading, setOcrLoading] = useState({});
  const fileInputRefs = useRef({});
  const IMGBB_API_KEY = '6dac5f267258577b002096908801c2d1';

  // ✅ Fetch questions once (fixed infinite loop)
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/question?course=Web Development'
        );
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error('❌ Failed to fetch questions:', err);
        alert('Failed to load questions from server.');
      }
    };
    loadQuestions();
  }, []);

  // ✅ Open file dialog
  const openFileDialog = qid => {
    if (fileInputRefs.current[qid]) fileInputRefs.current[qid].click();
  };

  // ✅ Handle image upload
  const handleFileChange = (e, qid) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/'))
      return alert('Please upload an image file (jpg, png, webp).');
    if (file.size > 5 * 1024 * 1024) return alert('File too large (max 5MB).');

    const preview = URL.createObjectURL(file);
    setUploads(prev => ({
      ...prev,
      [qid]: {
        ...prev[qid],
        file,
        preview,
        status: 'ready',
        imageUrl: null,
        answerText: '',
        inputType: 'image',
      },
    }));
  };

  // ✅ Handle text input
  const handleTextChange = (qid, value) => {
    setUploads(prev => ({
      ...prev,
      [qid]: {
        ...prev[qid],
        answerText: value,
        inputType: 'text',
        file: null,
        preview: null,
        status: 'ready',
      },
    }));
  };

  // ✅ Remove uploaded file
  const removeUpload = qid => {
    if (uploads[qid]?.preview) URL.revokeObjectURL(uploads[qid].preview);
    setUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[qid];
      return newUploads;
    });
  };

  // ✅ OCR Text Extraction
  const extractText = async (qid, file) => {
    setOcrLoading(prev => ({ ...prev, [qid]: true }));
    try {
      const result = await Tesseract.recognize(file, 'eng');
      const text = result.data.text.trim().replace(/\n/g, ' ');
      setUploads(prev => ({
        ...prev,
        [qid]: { ...prev[qid], answerText: text },
      }));
      return text;
    } catch (error) {
      console.error('OCR Error:', error);
      setUploads(prev => ({
        ...prev,
        [qid]: { ...prev[qid], answerText: 'Failed to extract text' },
      }));
      return 'Failed to extract text';
    } finally {
      setOcrLoading(prev => ({ ...prev, [qid]: false }));
    }
  };

  // ✅ Text Similarity Calculation
  const computeSimilarity = (text1, text2) => {
    if (!text1 || !text2) return 0;
    text1 = text1
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(' ');
    text2 = text2
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(' ');
    const commonWords = text1.filter(word => text2.includes(word));
    return commonWords.length / Math.max(text1.length, text2.length);
  };

  // ✅ Upload image to ImgBB
  const uploadToImgbb = async file => {
    const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(url, { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error('Image upload failed:', data);
      throw new Error(data?.error?.message || 'Image upload failed');
    }
    return data.data.url;
  };

  // ✅ Handle submission
  const handleSubmit = async () => {
    if (Object.keys(uploads).length === 0)
      return alert('Please answer at least one question.');

    setSubmitting(true);
    try {
      const results = [];
      let total = 0;

      for (const [qid, upload] of Object.entries(uploads)) {
        const question = questions.find(
          q => q.id === qid || q._id === qid || q.id === Number(qid)
        );
        if (!question) continue;

        let answerText = upload.answerText;
        let imageUrl = null;

        // If image uploaded → OCR + ImgBB
        if (upload.inputType === 'image' && upload.file) {
          imageUrl = await uploadToImgbb(upload.file);
          answerText = await extractText(qid, upload.file);
        }

        const similarity = computeSimilarity(answerText, question.answer);
        const marksGiven = Math.round(similarity * Number(question.marks));
        total += marksGiven;

        const imageLabel =
          upload.inputType === 'image' ? `Image ${qid}` : `Text Answer ${qid}`;

        results.push({
          questionId: question.id || question._id,
          questionTitle: question.question,
          label: imageLabel,
          imageUrl,
          answerText,
          marksGiven,
          maxMarks: Number(question.marks),
        });

        setUploads(prev => ({
          ...prev,
          [qid]: {
            ...prev[qid],
            imageUrl,
            status: 'evaluated',
            label: imageLabel,
            marksGiven,
          },
        }));
      }

      setUploadedImages(results);
      setTotalMarks(total);
      alert('✅ Answers evaluated successfully!');
    } catch (error) {
      console.error('❌ Evaluation failed:', error);
      alert('❌ Failed to evaluate answers.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        Web Development Questions
      </h1>

      <div className="grid gap-6">
        {questions.map(q => {
          const current = uploads[q.id] || uploads[q._id];
          const qid = q.id || q._id;

          return (
            <div
              key={qid}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className='flex justify-between'>
                <h3 className="text-lg font-medium">{q.question}</h3>
                <h3 className="text-lg ">{q.marks}</h3>

              </div>
              <p className="text-sm text-gray-500 mt-1">
                {q.hint || 'Type or upload answer'}
              </p>

              {/* ✅ Text Answer */}
              {!current?.file && (
                <textarea
                  placeholder="Write your answer here..."
                  value={
                    current?.inputType === 'text'
                      ? current?.answerText || ''
                      : ''
                  }
                  onChange={e => handleTextChange(qid, e.target.value)}
                  className="w-full border rounded-lg mt-3 p-3 text-sm focus:ring focus:ring-indigo-100"
                  rows={3}
                />
              )}

              {/* ✅ Image Upload */}
              {!current?.answerText && (
                <div className="mt-3">
                  {current?.preview ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={current.preview}
                        alt="preview"
                        className="w-36 h-24 object-cover rounded-md border"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {current.file?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Status: {current.status}
                        </p>
                        {ocrLoading[qid] && (
                          <p className="text-xs text-blue-600 mt-1">
                            Extracting text...
                          </p>
                        )}
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => openFileDialog(qid)}
                            className="px-3 py-2 border rounded-md text-sm"
                          >
                            Replace
                          </button>
                          <button
                            onClick={() => removeUpload(qid)}
                            className="px-3 py-2 border rounded-md text-sm flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => openFileDialog(qid)}
                      className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 mt-2"
                    >
                      <Camera size={16} />
                      <span className="text-sm">Upload Image</span>
                    </button>
                  )}
                  <input
                    ref={el => (fileInputRefs.current[qid] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFileChange(e, qid)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ Submit Button */}
      <div className="mt-8 flex justify-center">
        <button
          disabled={submitting}
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitting ? (
            'Processing...'
          ) : (
            <>
              <Check size={16} /> Submit Answers
            </>
          )}
        </button>
      </div>

      {/* ✅ Result Section */}
      {uploadedImages.length > 0 && (
        <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Evaluated Answers</h2>
          <ul className="space-y-2">
            {uploadedImages.map((img, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium">
                  {img.label} ({img.questionTitle}):
                </span>{' '}
                {img.imageUrl ? (
                  <a
                    href={img.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline"
                  >
                    {img.imageUrl}
                  </a>
                ) : (
                  <span className="text-gray-600">[Text Answer]</span>
                )}
                <p className="text-gray-700 mt-1">
                  Answer Text: {img.answerText}
                </p>
                <p className="text-purple-700 mt-1">
                  Marks Given: {img.marksGiven}/{img.maxMarks}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-semibold text-right">
            Total Marks: {totalMarks}/
            {questions.reduce((a, q) => a + Number(q.marks), 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default WebDevelopmentQuestion;

// step -5

// import { Camera, Check, Trash2 } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import Tesseract from 'tesseract.js';

// const WebDevelopmentQuestion = () => {
//   // const questions = [
//   //   {
//   //     id: 1,
//   //     question: 'How are JavaScript and jQuery different?',
//   //     hint: 'Type your answer or upload an image answer',
//   //     answer:
//   //       'jQuery is a library built with JavaScript, and JavaScript is the language itself.',
//   //     marks: 5,
//   //   },
//   //   {
//   //     id: 2,
//   //     question: 'What is Content Security Policy?',
//   //     hint: 'Type or upload related image',
//   //     answer:
//   //       'Content Security Policy, also known as CSP, is a header in HTML that lets the site operators gain full control over the resources that are loading on the site.',
//   //     marks: 6,
//   //   },
//   //   {
//   //     id: 3,
//   //     question: 'What is Cross-Site Scripting (XSS)?',
//   //     hint: 'Type or upload related image',
//   //     answer:
//   //       'XSS, Cross-Site Scripting, is an attack that takes place when an attacker uses a web application to send malicious code, in the form of browser-side script, to another user.',
//   //     marks: 7,
//   //   },
//   // ];
// const [questions, setQuestions] = useState([]);
//   const [uploads, setUploads] = useState({});
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [ocrLoading, setOcrLoading] = useState({});
//   const fileInputRefs = useRef({});
//   const IMGBB_API_KEY = '6dac5f267258577b002096908801c2d1';

//     // ✅ Fetch questions
//     useEffect(() => {
//       fetch('http://localhost:5000/question?course=Web Development')
//         .then(res => res.json())
//         .then(data => setQuestions(data))
//         .catch(err => {
//           console.error('❌ Failed to fetch questions:', err);
//           alert('Failed to load questions from server.');
//         });
//     }, [questions]);

//   console.log(questions)

//   const openFileDialog = qid => {
//     if (fileInputRefs.current[qid]) fileInputRefs.current[qid].click();
//   };

//   const handleFileChange = (e, qid) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/'))
//       return alert('Please upload an image file (jpg, png, webp).');
//     if (file.size > 5 * 1024 * 1024) return alert('File too large (max 5MB).');

//     const preview = URL.createObjectURL(file);
//     setUploads(prev => ({
//       ...prev,
//       [qid]: {
//         ...prev[qid],
//         file,
//         preview,
//         status: 'ready',
//         imageUrl: null,
//         answerText: '',
//         inputType: 'image',
//       },
//     }));
//   };

//   const handleTextChange = (qid, value) => {
//     setUploads(prev => ({
//       ...prev,
//       [qid]: {
//         ...prev[qid],
//         answerText: value,
//         inputType: 'text',
//         file: null,
//         preview: null,
//         status: 'ready',
//       },
//     }));
//   };

//   const removeUpload = qid => {
//     if (uploads[qid]?.preview) URL.revokeObjectURL(uploads[qid].preview);
//     setUploads(prev => {
//       const newUploads = { ...prev };
//       delete newUploads[qid];
//       return newUploads;
//     });
//   };

//   const extractText = async (qid, file) => {
//     setOcrLoading(prev => ({ ...prev, [qid]: true }));
//     try {
//       const result = await Tesseract.recognize(file, 'eng');
//       const text = result.data.text.trim().replace(/\n/g, ' ');
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: text },
//       }));
//       return text;
//     } catch (error) {
//       console.error('OCR Error:', error);
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: 'Failed to extract text' },
//       }));
//       return 'Failed to extract text';
//     } finally {
//       setOcrLoading(prev => ({ ...prev, [qid]: false }));
//     }
//   };

//   const computeSimilarity = (text1, text2) => {
//     text1 = text1
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');
//     text2 = text2
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');

//     const commonWords = text1.filter(word => text2.includes(word));
//     const score = commonWords.length / Math.max(text1.length, text2.length);
//     return score; // 0 to 1
//   };

//   const uploadToImgbb = async file => {
//     const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
//     const formData = new FormData();
//     formData.append('image', file);

//     const res = await fetch(url, { method: 'POST', body: formData });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data?.error?.message || 'Image upload failed');
//     return data.data.url;
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(uploads).length === 0)
//       return alert('Please answer at least one question.');
//     setSubmitting(true);

//     try {
//       const results = [];
//       let total = 0;

//       for (const [qid, upload] of Object.entries(uploads)) {
//         const question = questions.find(q => q.id === Number(qid));

//         let answerText = upload.answerText;
//         let imageUrl = null;

//         if (upload.inputType === 'image' && upload.file) {
//           imageUrl = await uploadToImgbb(upload.file);
//           answerText = await extractText(qid, upload.file);
//         }

//         const similarity = computeSimilarity(answerText, question.answer);
//         const marksGiven = Math.round(similarity * question.marks);
//         total += marksGiven;

//         const imageLabel =
//           upload.inputType === 'image' ? `Image ${qid}` : `Text Answer ${qid}`;

//         results.push({
//           questionId: question.id,
//           questionTitle: question.question,
//           label: imageLabel,
//           imageUrl,
//           answerText,
//           marksGiven,
//           maxMarks: question.marks,
//         });

//         setUploads(prev => ({
//           ...prev,
//           [qid]: {
//             ...prev[qid],
//             imageUrl,
//             status: 'evaluated',
//             label: imageLabel,
//             marksGiven,
//           },
//         }));
//       }

//       setUploadedImages(results);
//       setTotalMarks(total);
//       alert('✅ Answers evaluated successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('❌ Failed to evaluate answers.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
//         Web Development Questions
//       </h1>

//       <div className="grid gap-6">
//         {questions.map(q => {
//           const current = uploads[q.id];
//           return (
//             <div
//               key={q.id}
//               className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//             >
//               <h3 className="text-lg font-medium">{q.question}</h3>
//               <p className="text-sm text-gray-500 mt-1">{q.hint}</p>

//               {/* Text Answer */}
//               {!current?.file && (
//                 <textarea
//                   placeholder="Write your answer here..."
//                   value={
//                     current?.inputType === 'text'
//                       ? current?.answerText || ''
//                       : ''
//                   }
//                   onChange={e => handleTextChange(q.id, e.target.value)}
//                   className="w-full border rounded-lg mt-3 p-3 text-sm focus:ring focus:ring-indigo-100"
//                   rows={3}
//                 />
//               )}

//               {/* Image Upload */}
//               {!current?.answerText && (
//                 <div className="mt-3">
//                   {current?.preview ? (
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={current.preview}
//                         alt="preview"
//                         className="w-36 h-24 object-cover rounded-md border"
//                       />
//                       <div>
//                         <p className="text-sm font-medium">
//                           {current.file?.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           Status: {current.status}
//                         </p>
//                         {ocrLoading[q.id] && (
//                           <p className="text-xs text-blue-600 mt-1">
//                             Extracting text...
//                           </p>
//                         )}
//                         <div className="mt-3 flex gap-2">
//                           <button
//                             onClick={() => openFileDialog(q.id)}
//                             className="px-3 py-2 border rounded-md text-sm"
//                           >
//                             Replace
//                           </button>
//                           <button
//                             onClick={() => removeUpload(q.id)}
//                             className="px-3 py-2 border rounded-md text-sm flex items-center gap-2"
//                           >
//                             <Trash2 size={14} /> Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => openFileDialog(q.id)}
//                       className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 mt-2"
//                     >
//                       <Camera size={16} />{' '}
//                       <span className="text-sm">Upload Image</span>
//                     </button>
//                   )}
//                   <input
//                     ref={el => (fileInputRefs.current[q.id] = el)}
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={e => handleFileChange(e, q.id)}
//                   />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-8 flex justify-center">
//         <button
//           disabled={submitting}
//           onClick={handleSubmit}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
//         >
//           {submitting ? (
//             'Processing...'
//           ) : (
//             <>
//               <Check size={16} /> Submit Answers
//             </>
//           )}
//         </button>
//       </div>

//       {uploadedImages.length > 0 && (
//         <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
//           <h2 className="text-xl font-semibold mb-4">Evaluated Answers</h2>
//           <ul className="space-y-2">
//             {uploadedImages.map((img, i) => (
//               <li key={i} className="text-sm">
//                 <span className="font-medium">
//                   {img.label} ({img.questionTitle}):
//                 </span>{' '}
//                 {img.imageUrl ? (
//                   <a
//                     href={img.imageUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-600 underline"
//                   >
//                     {img.imageUrl}
//                   </a>
//                 ) : (
//                   <span className="text-gray-600">[Text Answer]</span>
//                 )}
//                 <p className="text-gray-700 mt-1">
//                   Answer Text: {img.answerText}
//                 </p>
//                 <p className="text-purple-700 mt-1">
//                   Marks Given: {img.marksGiven}/{img.maxMarks}
//                 </p>
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 text-lg font-semibold text-right">
//             Total Marks: {totalMarks}/
//             {questions.reduce((a, q) => a + q.marks, 0)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebDevelopmentQuestion;


//
// step-1
// 
// import { Camera, Check, Trash2 } from 'lucide-react';
// import { useRef, useState } from 'react';
// import Tesseract from 'tesseract.js';

// const WebDevelopmentQuestion = () => {
//   const questions = [
//     {
//       id: 1,
//       question: 'How are JavaScript and jQuery different?',
//       hint: 'Take a photo of your website design or project sketch',
//       answer:
//         'jQuery is a library built with JavaScript, and JavaScript is the language itself.',
//       marks: 5,
//     },
//     {
//       id: 2,
//       question: 'What is Content Security Policy?',
//       hint: 'Upload a wireframe or mockup image',
//       answer:
//         'Content Security Policy, also known as CSP, is a header in HTML that lets the site operators gain full control over the resources that are loading on the site.',
//       marks: 6,
//     },
//     {
//       id: 3,
//       question: 'What is Cross-Site Scripting (XSS)?',
//       hint: 'Upload a screenshot or a live project preview image',
//       answer:
//         'XSS, Cross-Site Scripting, is an attack that takes place when an attacker uses a web application to send malicious code, in the form of browser-side script, to another user.',
//       marks: 7,
//     },
//   ];

//   const [uploads, setUploads] = useState({});
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [ocrLoading, setOcrLoading] = useState({});
//   const fileInputRefs = useRef({});
//   const IMGBB_API_KEY = '6dac5f267258577b002096908801c2d1';

//   const openFileDialog = qid => {
//     if (fileInputRefs.current[qid]) fileInputRefs.current[qid].click();
//   };

//   const handleFileChange = (e, qid) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/'))
//       return alert('Please upload an image file (jpg, png, webp).');
//     if (file.size > 5 * 1024 * 1024) return alert('File too large (max 5MB).');

//     const preview = URL.createObjectURL(file);
//     setUploads(prev => ({
//       ...prev,
//       [qid]: {
//         file,
//         preview,
//         status: 'ready',
//         imageUrl: null,
//         answerText: '',
//         marksGiven: 0,
//       },
//     }));
//   };

//   const removeUpload = qid => {
//     if (uploads[qid]?.preview) URL.revokeObjectURL(uploads[qid].preview);
//     setUploads(prev => {
//       const newUploads = { ...prev };
//       delete newUploads[qid];
//       return newUploads;
//     });
//   };

//   const extractText = async (qid, file) => {
//     setOcrLoading(prev => ({ ...prev, [qid]: true }));
//     try {
//       const result = await Tesseract.recognize(file, 'eng', {
//         logger: m => console.log(m),
//       });
//       const text = result.data.text.trim().replace(/\n/g, ' ');
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: text },
//       }));
//       return text;
//     } catch (error) {
//       console.error('OCR Error:', error);
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: 'Failed to extract text' },
//       }));
//       return 'Failed to extract text';
//     } finally {
//       setOcrLoading(prev => ({ ...prev, [qid]: false }));
//     }
//   };

//   const computeSimilarity = (text1, text2) => {
//     text1 = text1
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');
//     text2 = text2
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');

//     const commonWords = text1.filter(word => text2.includes(word));
//     const score = commonWords.length / Math.max(text1.length, text2.length);
//     return score; // 0 to 1
//   };

//   const uploadToImgbb = async file => {
//     const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
//     const formData = new FormData();
//     formData.append('image', file);

//     const res = await fetch(url, { method: 'POST', body: formData });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data?.error?.message || 'Image upload failed');
//     return data.data.url;
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(uploads).length === 0)
//       return alert('Please upload at least one image.');
//     setSubmitting(true);

//     try {
//       const results = [];
//       let total = 0;

//       for (const [qid, upload] of Object.entries(uploads)) {
//         const url = await uploadToImgbb(upload.file);
//         const answerText = await extractText(qid, upload.file);

//         const question = questions.find(q => q.id === Number(qid));
//         const similarity = computeSimilarity(answerText, question.answer);
//         const marksGiven = Math.round(similarity * question.marks); // proportional marks
//         total += marksGiven;

//         const imageLabel = `Image ${qid}`;

//         results.push({
//           questionId: question.id,
//           questionTitle: question.question,
//           label: imageLabel,
//           imageUrl: url,
//           answerText,
//           marksGiven,
//           maxMarks: question.marks,
//         });

//         setUploads(prev => ({
//           ...prev,
//           [qid]: {
//             ...prev[qid],
//             imageUrl: url,
//             status: 'uploaded',
//             label: imageLabel,
//             marksGiven,
//           },
//         }));
//       }

//       setUploadedImages(results);
//       setTotalMarks(total);
//       alert('Images uploaded, text extracted, and marks evaluated!');
//     } catch (error) {
//       console.error(error);
//       alert('❌ Failed to upload images or extract text.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
//         Web Development Questions
//       </h1>

//       <div className="grid gap-6">
//         {questions.map(q => (
//           <div
//             key={q.id}
//             className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-lg font-medium">{q.question}</h3>
//                 <p className="text-sm text-gray-500 mt-1">{q.hint}</p>
//               </div>
//               <button
//                 onClick={() => openFileDialog(q.id)}
//                 className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
//               >
//                 <Camera size={16} /> <span className="text-sm">Upload</span>
//               </button>
//               <input
//                 ref={el => (fileInputRefs.current[q.id] = el)}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={e => handleFileChange(e, q.id)}
//               />
//             </div>

//             <div className="mt-4">
//               {uploads[q.id] ? (
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={uploads[q.id].preview}
//                     alt="preview"
//                     className="w-36 h-24 object-cover rounded-md border"
//                   />
//                   <div>
//                     <div className="text-sm font-medium">
//                       {uploads[q.id].label || uploads[q.id].file?.name}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Status: {uploads[q.id].status || 'ready'}
//                     </div>
//                     {ocrLoading[q.id] ? (
//                       <p className="text-xs text-blue-600 mt-1">
//                         Extracting text...
//                       </p>
//                     ) : (
//                       uploads[q.id].answerText && (
//                         <p className="text-xs text-green-600 mt-1">
//                           Answer Text: {uploads[q.id].answerText}
//                         </p>
//                       )
//                     )}
//                     {uploads[q.id].marksGiven > 0 && (
//                       <p className="text-xs text-purple-600 mt-1">
//                         Marks Given: {uploads[q.id].marksGiven}/
//                         {questions.find(q => q.id === Number(q.id)).marks}
//                       </p>
//                     )}
//                     {uploads[q.id].imageUrl && (
//                       <a
//                         href={uploads[q.id].imageUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block text-xs text-blue-600 underline mt-1"
//                       >
//                         {uploads[q.id].label} Link
//                       </a>
//                     )}
//                     <div className="mt-3 flex gap-2">
//                       <button
//                         onClick={() => openFileDialog(q.id)}
//                         className="px-3 py-2 border rounded-md text-sm"
//                       >
//                         Replace
//                       </button>
//                       <button
//                         onClick={() => removeUpload(q.id)}
//                         className="px-3 py-2 border rounded-md text-sm flex items-center gap-2"
//                       >
//                         <Trash2 size={14} /> Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-md border-dashed border-2 border-gray-200 p-6 text-center text-sm text-gray-500">
//                   No image uploaded yet.
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex justify-center">
//         <button
//           disabled={submitting}
//           onClick={handleSubmit}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
//         >
//           {submitting ? (
//             'Uploading...'
//           ) : (
//             <>
//               <Check size={16} /> Submit Answers
//             </>
//           )}
//         </button>
//       </div>

//       {uploadedImages.length > 0 && (
//         <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
//           <h2 className="text-xl font-semibold mb-4">
//             Uploaded Images, Extracted Text & Marks
//           </h2>
//           <ul className="space-y-2">
//             {uploadedImages.map((img, i) => (
//               <li key={i} className="text-sm">
//                 <span className="font-medium">
//                   {img.label} ({img.questionTitle}):
//                 </span>{' '}
//                 <a
//                   href={img.imageUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-600 underline"
//                 >
//                   {img.imageUrl}
//                 </a>
//                 <p className="text-gray-700 mt-1">
//                   Answer Text: {img.answerText}
//                 </p>
//                 <p className="text-purple-700 mt-1">
//                   Marks Given: {img.marksGiven}/{img.maxMarks}
//                 </p>
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 text-lg font-semibold text-right">
//             Total Marks: {totalMarks}/
//             {questions.reduce((a, q) => a + q.marks, 0)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebDevelopmentQuestion;




















//
// step -3
// 
// import { Camera, Check, Trash2 } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import Tesseract from 'tesseract.js';

// const WebDevelopmentQuestion = () => {
//   const [questions, setQuestions] = useState([]);
//   const [uploads, setUploads] = useState({});
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [ocrLoading, setOcrLoading] = useState({});
//   const fileInputRefs = useRef({});

//   // ✅ Replace with your own IMGBB key (get from https://api.imgbb.com/)
//   const IMGBB_API_KEY = '6dac5f267258577b002096908801c2d1';

//   // ✅ Fetch questions
//   useEffect(() => {
//     fetch('http://localhost:5000/question?course=Web Development')
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => {
//         console.error('❌ Failed to fetch questions:', err);
//         alert('Failed to load questions from server.');
//       });
//   }, []);
// console.log(questions);
//   const openFileDialog = qid => {
//     if (fileInputRefs.current[qid]) fileInputRefs.current[qid].click();
//   };

//   // ✅ Handle typed answer
//   const handleTextChange = (qid, text) => {
//     setUploads(prev => ({
//       ...prev,
//       [qid]: {
//         ...prev[qid],
//         typedAnswer: text,
//       },
//     }));
//   };

//   // ✅ Handle file upload
//   const handleFileChange = (e, qid) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       alert('Please upload an image file (jpg, png, webp).');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert('File too large (max 5MB).');
//       return;
//     }

//     const preview = URL.createObjectURL(file);
//     const newUpload = {
//       ...uploads[qid],
//       file,
//       preview,
//       status: 'ready',
//       imageUrl: null,
//       ocrText: '',
//       marksGiven: 0,
//     };

//     setUploads(prev => ({
//       ...prev,
//       [qid]: newUpload,
//     }));
//   };

//   // ✅ Remove uploaded image
//   const removeUpload = qid => {
//     if (uploads[qid]?.preview) URL.revokeObjectURL(uploads[qid].preview);
//     setUploads(prev => {
//       const newUploads = { ...prev };
//       delete newUploads[qid];
//       return newUploads;
//     });
//   };

//   // ✅ OCR extraction
//   const extractText = async (qid, file) => {
//     setOcrLoading(prev => ({ ...prev, [qid]: true }));
//     try {
//       const result = await Tesseract.recognize(file, 'eng');
//       const text = result.data.text.trim().replace(/\n/g, ' ');
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], ocrText: text },
//       }));
//       return text;
//     } catch (error) {
//       console.error('❌ OCR Error:', error);
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], ocrText: 'Failed to extract text' },
//       }));
//       return 'Failed to extract text';
//     } finally {
//       setOcrLoading(prev => ({ ...prev, [qid]: false }));
//     }
//   };

//   // ✅ Similarity calculator
//   const computeSimilarity = (text1, text2) => {
//     text1 = text1
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');
//     text2 = text2
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');
//     const commonWords = text1.filter(word => text2.includes(word));
//     return commonWords.length / Math.max(text1.length, text2.length);
//   };

//   // ✅ Stable IMGBB Upload Function
//   const uploadToImgbb = async file => {
//     try {
//       // Convert image file to Base64
//       const base64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result.split(',')[1]);
//         reader.onerror = err => reject(err);
//       });

//       const formData = new FormData();
//       formData.append('key', IMGBB_API_KEY);
//       formData.append('image', base64);

//       const response = await fetch('https://api.imgbb.com/1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (!data.success) {
//         console.error('❌ IMGBB upload failed:', data);
//         throw new Error(data?.error?.message || 'IMGBB upload failed.');
//       }

//       console.log('✅ Uploaded to IMGBB:', data.data.url);
//       return data.data.url;
//     } catch (err) {
//       console.error('❌ Upload to IMGBB failed:', err);
//       throw err;
//     }
//   };

//   // ✅ Submit answers
//   const handleSubmit = async () => {
//     if (Object.keys(uploads).length === 0) {
//       alert('⚠️ Please type or upload at least one answer.');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const results = [];
//       let total = 0;

//       for (const q of questions) {
//         const upload = uploads[q.id];
//         if (!upload) continue;

//         let imgUrl = upload.imageUrl || null;
//         let ocrText = upload.ocrText || '';
//         let answerText = upload.typedAnswer || '';

//         // 🟩 Upload to IMGBB
//         if (upload.file && !imgUrl) {
//           try {
//             imgUrl = await uploadToImgbb(upload.file);
//           } catch (uploadErr) {
//             alert(
//               `Image upload failed for Question ${q.id}. Please try again.`
//             );
//             continue; // skip this question, proceed others
//           }
//         }

//         // 🟦 Extract text
//         if (upload.file && !ocrText) {
//           try {
//             ocrText = await extractText(q.id, upload.file);
//           } catch (ocrErr) {
//             console.error(`OCR failed for Q${q.id}:`, ocrErr);
//             ocrText = 'OCR extraction failed.';
//           }
//         }

//         // 🟨 Calculate marks
//         const finalText = `${answerText} ${ocrText}`.trim();
//         const similarity = computeSimilarity(finalText, q.answer || '');
//         const marksGiven = Math.round(similarity * (q.marks || 0));
//         total += marksGiven;

//         results.push({
//           questionId: q.id,
//           questionTitle: q.question,
//           imageUrl: imgUrl,
//           typedAnswer: answerText,
//           ocrText,
//           combinedAnswer: finalText,
//           marksGiven,
//           maxMarks: q.marks,
//         });

//         setUploads(prev => ({
//           ...prev,
//           [q.id]: {
//             ...prev[q.id],
//             imageUrl: imgUrl,
//             ocrText,
//             marksGiven,
//           },
//         }));
//       }

//       setUploadedImages(results);
//       setTotalMarks(total);
//       alert('✅ All answers submitted successfully!');
//     } catch (error) {
//       console.error('🔥 Unexpected error in handleSubmit:', error);
//       alert(`❌ Something went wrong: ${error.message || error}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
//         Web Development Questions
//       </h1>

//       <div className="grid gap-6">
//         {questions.map((q, index) => (
//           <div
//             key={q.id}
//             className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-lg font-medium">
//                   {index + 1}. {q.question}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   You can type your answer or upload an image.
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <p className="font-semibold">{q.marks}</p>
//                 <button
//                   onClick={() => openFileDialog(q.id)}
//                   className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   <Camera size={16} /> <span className="text-sm">Upload</span>
//                 </button>
//                 <input
//                   ref={el => (fileInputRefs.current[q.id] = el)}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={e => handleFileChange(e, q.id)}
//                 />
//               </div>
//             </div>

//             {/* Typed answer */}
//             <textarea
//               value={uploads[q.id]?.typedAnswer || ''}
//               onChange={e => handleTextChange(q.id, e.target.value)}
//               placeholder="Type your answer here..."
//               className="mt-4 w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500"
//               rows="3"
//             />

//             {/* Preview & OCR */}
//             {uploads[q.id]?.preview && (
//               <div className="mt-4 flex items-center gap-4">
//                 <img
//                   src={uploads[q.id].preview}
//                   alt="preview"
//                   className="w-36 h-24 object-cover rounded-md border"
//                 />
//                 <div className="text-xs text-gray-600">
//                   {ocrLoading[q.id]
//                     ? 'Extracting text...'
//                     : uploads[q.id].ocrText
//                     ? `OCR Text: ${uploads[q.id].ocrText}`
//                     : 'Ready to extract text.'}
//                 </div>
//               </div>
//             )}

//             <div className="mt-3 flex gap-2">
//               <button
//                 onClick={() => removeUpload(q.id)}
//                 className="px-3 py-2 border rounded-md text-sm flex items-center gap-2"
//               >
//                 <Trash2 size={14} /> Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Submit */}
//       <div className="mt-8 flex justify-center">
//         <button
//           disabled={submitting}
//           onClick={handleSubmit}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
//         >
//           {submitting ? (
//             'Submitting...'
//           ) : (
//             <>
//               <Check size={16} /> Submit Answers
//             </>
//           )}
//         </button>
//       </div>

//       {/* Results */}
//       {uploadedImages.length > 0 && (
//         <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
//           <h2 className="text-xl font-semibold mb-4">
//             Submitted Answers & Marks
//           </h2>
//           <ul className="space-y-2">
//             {uploadedImages.map((img, i) => (
//               <li key={i} className="text-sm">
//                 <p className="font-medium">{img.questionTitle}</p>
//                 {img.imageUrl && (
//                   <a
//                     href={img.imageUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-600 underline"
//                   >
//                     View Uploaded Image
//                   </a>
//                 )}
//                 <p className="mt-1 text-gray-700">
//                   Typed Answer: {img.typedAnswer || 'N/A'}
//                 </p>
//                 <p className="mt-1 text-gray-700">
//                   OCR Text: {img.ocrText || 'N/A'}
//                 </p>
//                 <p className="mt-1 text-purple-700 font-semibold">
//                   Marks: {img.marksGiven}/{img.maxMarks}
//                 </p>
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 text-lg font-semibold text-right">
//             Total Marks: {totalMarks}/
//             {questions.reduce((a, q) => a + q.marks, 0)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebDevelopmentQuestion;












//
//step -2
//
// import { Camera, Check, Trash2 } from 'lucide-react';
// import { useRef, useState } from 'react';
// import Tesseract from 'tesseract.js';

// const WebDevelopmentQuestion = () => {
//   const questions = [
//     {
//       id: 1,
//       question: 'How are JavaScript and jQuery different?',
//       hint: 'Take a photo of your website design or project sketch',
//       answer:
//         'jQuery is a library built with JavaScript, and JavaScript is the language itself.',
//       marks: 5,
//     },
//     {
//       id: 2,
//       question: 'What is Content Security Policy?',
//       hint: 'Upload a wireframe or mockup image',
//       answer:
//         'Content Security Policy, also known as CSP, is a header in HTML that lets the site operators gain full control over the resources that are loading on the site.',
//       marks: 6,
//     },
//     {
//       id: 3,
//       question: 'What is Cross-Site Scripting (XSS)?',
//       hint: 'Upload a screenshot or a live project preview image',
//       answer:
//         'XSS, Cross-Site Scripting, is an attack that takes place when an attacker uses a web application to send malicious code, in the form of browser-side script, to another user.',
//       marks: 7,
//     },
//   ];

//   const [uploads, setUploads] = useState({});
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [ocrLoading, setOcrLoading] = useState({});
//   const fileInputRefs = useRef({});
//   const IMGBB_API_KEY = '887b7c78ab1d6fd76aa7f86a5607d831';

//   const openFileDialog = qid => {
//     if (fileInputRefs.current[qid]) fileInputRefs.current[qid].click();
//   };

//   const handleFileChange = (e, qid) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/'))
//       return alert('Please upload an image file (jpg, png, webp).');
//     if (file.size > 5 * 1024 * 1024) return alert('File too large (max 5MB).');

//     const preview = URL.createObjectURL(file);
//     setUploads(prev => ({
//       ...prev,
//       [qid]: {
//         file,
//         preview,
//         status: 'ready',
//         imageUrl: null,
//         answerText: '',
//         marksGiven: 0,
//       },
//     }));
//   };

//   const removeUpload = qid => {
//     if (uploads[qid]?.preview) URL.revokeObjectURL(uploads[qid].preview);
//     setUploads(prev => {
//       const newUploads = { ...prev };
//       delete newUploads[qid];
//       return newUploads;
//     });
//   };

//   const extractText = async (qid, file) => {
//     setOcrLoading(prev => ({ ...prev, [qid]: true }));
//     try {
//       const result = await Tesseract.recognize(file, 'eng', {
//         logger: m => console.log(m),
//       });
//       const text = result.data.text.trim().replace(/\n/g, ' ');
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: text },
//       }));
//       return text;
//     } catch (error) {
//       console.error('OCR Error:', error);
//       setUploads(prev => ({
//         ...prev,
//         [qid]: { ...prev[qid], answerText: 'Failed to extract text' },
//       }));
//       return 'Failed to extract text';
//     } finally {
//       setOcrLoading(prev => ({ ...prev, [qid]: false }));
//     }
//   };

//   const computeSimilarity = (text1, text2) => {
//     text1 = text1
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');
//     text2 = text2
//       .toLowerCase()
//       .replace(/[^a-z0-9 ]/g, '')
//       .split(' ');

//     const commonWords = text1.filter(word => text2.includes(word));
//     const score = commonWords.length / Math.max(text1.length, text2.length);
//     return score; // 0 to 1
//   };

//   const uploadToImgbb = async file => {
//     const url = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
//     const formData = new FormData();
//     formData.append('image', file);

//     const res = await fetch(url, { method: 'POST', body: formData });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data?.error?.message || 'Image upload failed');
//     return data.data.url;
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(uploads).length === 0)
//       return alert('Please upload at least one image.');
//     setSubmitting(true);

//     try {
//       const results = [];
//       let total = 0;

//       for (const [qid, upload] of Object.entries(uploads)) {
//         const url = await uploadToImgbb(upload.file);
//         const answerText = await extractText(qid, upload.file);

//         const question = questions.find(q => q.id === Number(qid));
//         const similarity = computeSimilarity(answerText, question.answer);
//         const marksGiven = Math.round(similarity * question.marks); // proportional marks
//         total += marksGiven;

//         const imageLabel = `Image ${qid}`;

//         results.push({
//           questionId: question.id,
//           questionTitle: question.question,
//           label: imageLabel,
//           imageUrl: url,
//           answerText,
//           marksGiven,
//           maxMarks: question.marks,
//         });

//         setUploads(prev => ({
//           ...prev,
//           [qid]: {
//             ...prev[qid],
//             imageUrl: url,
//             status: 'uploaded',
//             label: imageLabel,
//             marksGiven,
//           },
//         }));
//       }

//       setUploadedImages(results);
//       setTotalMarks(total);
//       alert('Images uploaded, text extracted, and marks evaluated!');
//     } catch (error) {
//       console.error(error);
//       alert('❌ Failed to upload images or extract text.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-20 max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
//         Web Development Questions
//       </h1>

//       <div className="grid gap-6">
//         {questions.map(q => (
//           <div
//             key={q.id}
//             className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-lg font-medium">{q.question}</h3>
//                 <p className="text-sm text-gray-500 mt-1">{q.hint}</p>
//               </div>
//               <button
//                 onClick={() => openFileDialog(q.id)}
//                 className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
//               >
//                 <Camera size={16} /> <span className="text-sm">Upload</span>
//               </button>
//               <input
//                 ref={el => (fileInputRefs.current[q.id] = el)}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={e => handleFileChange(e, q.id)}
//               />
//             </div>

//             <div className="mt-4">
//               {uploads[q.id] ? (
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={uploads[q.id].preview}
//                     alt="preview"
//                     className="w-36 h-24 object-cover rounded-md border"
//                   />
//                   <div>
//                     <div className="text-sm font-medium">
//                       {uploads[q.id].label || uploads[q.id].file?.name}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Status: {uploads[q.id].status || 'ready'}
//                     </div>
//                     {ocrLoading[q.id] ? (
//                       <p className="text-xs text-blue-600 mt-1">
//                         Extracting text...
//                       </p>
//                     ) : (
//                       uploads[q.id].answerText && (
//                         <p className="text-xs text-green-600 mt-1">
//                           Answer Text: {uploads[q.id].answerText}
//                         </p>
//                       )
//                     )}
//                     {uploads[q.id].marksGiven > 0 && (
//                       <p className="text-xs text-purple-600 mt-1">
//                         Marks Given: {uploads[q.id].marksGiven}/
//                         {questions.find(q => q.id === Number(q.id)).marks}
//                       </p>
//                     )}
//                     {uploads[q.id].imageUrl && (
//                       <a
//                         href={uploads[q.id].imageUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="block text-xs text-blue-600 underline mt-1"
//                       >
//                         {uploads[q.id].label} Link
//                       </a>
//                     )}
//                     <div className="mt-3 flex gap-2">
//                       <button
//                         onClick={() => openFileDialog(q.id)}
//                         className="px-3 py-2 border rounded-md text-sm"
//                       >
//                         Replace
//                       </button>
//                       <button
//                         onClick={() => removeUpload(q.id)}
//                         className="px-3 py-2 border rounded-md text-sm flex items-center gap-2"
//                       >
//                         <Trash2 size={14} /> Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-md border-dashed border-2 border-gray-200 p-6 text-center text-sm text-gray-500">
//                   No image uploaded yet.
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex justify-center">
//         <button
//           disabled={submitting}
//           onClick={handleSubmit}
//           className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
//         >
//           {submitting ? (
//             'Uploading...'
//           ) : (
//             <>
//               <Check size={16} /> Submit Answers
//             </>
//           )}
//         </button>
//       </div>

//       {uploadedImages.length > 0 && (
//         <div className="mt-10 bg-gray-50 p-6 rounded-xl border">
//           <h2 className="text-xl font-semibold mb-4">
//             Uploaded Images, Extracted Text & Marks
//           </h2>
//           <ul className="space-y-2">
//             {uploadedImages.map((img, i) => (
//               <li key={i} className="text-sm">
//                 <span className="font-medium">
//                   {img.label} ({img.questionTitle}):
//                 </span>{' '}
//                 <a
//                   href={img.imageUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-indigo-600 underline"
//                 >
//                   {img.imageUrl}
//                 </a>
//                 <p className="text-gray-700 mt-1">
//                   Answer Text: {img.answerText}
//                 </p>
//                 <p className="text-purple-700 mt-1">
//                   Marks Given: {img.marksGiven}/{img.maxMarks}
//                 </p>
//               </li>
//             ))}
//           </ul>
//           <p className="mt-4 text-lg font-semibold text-right">
//             Total Marks: {totalMarks}/
//             {questions.reduce((a, q) => a + q.marks, 0)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebDevelopmentQuestion;
