import { Camera, Check, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Tesseract from 'tesseract.js';
import auth from '../../../firebase.init';

const Question = ({subject}) => {
  const [questions, setQuestions] = useState([]);
  const [uploads, setUploads] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [ocrLoading, setOcrLoading] = useState({});
  const fileInputRefs = useRef({});
  const IMGBB_API_KEY = '6dac5f267258577b002096908801c2d1';
  const [users] = useAuthState(auth);
  const [user, setUsers] = useState([]);
  const navigator=useNavigate()

    useEffect(() => {
      fetch(`http://localhost:5000/user/${users?.email}`)
        .then(res => res.json())
        .then(data => setUsers(data));
    }, [users, users?.email]);
    

  // ✅ Fetch questions once (fixed infinite loop)
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/questionCourse/${subject}`
        );
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error('❌ Failed to fetch questions:', err);
        alert('Failed to load questions from server.');
      }
    };
    loadQuestions();
  }, [questions.length, subject]);


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
    
      // navigator('/studentScore');
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
      const updateQuestionAndAnswers = {
        subject,
        results,
        totalMarks: total,
        email: users?.email || user[0]?.email,
        name: user[0]?.name,
        totalQuestionMark: questions.reduce((a, q) => a + Number(q.marks), 0),
      };
      
      await fetch('http://localhost:5000/questionAnswer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateQuestionAndAnswers),
      });
      toast('✅  Successfully Submit Your Answers.');
      setSubmitting(true);
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
        {subject} Questions
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
              <div className="flex justify-between">
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
      {questions.length > 0 && (
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
      )}

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

export default Question;
