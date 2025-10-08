import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const ReviewsSection = (course) => {
  const [users] = useAuthState(auth);

  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([
    // {
    //   id: 1,
    //   name: 'Ali Tufan',
    //   date: '3 Days ago',
    //   title: 'The best LMS Design',
    //   content:
    //     'This course is a very applicable. Professor Ng explains precisely each algorithm and even tries to give an intuition for mathematical and statistic concepts behind each algorithm. Thank you very much.',
    // },
    // {
    //   id: 2,
    //   name: 'Ali Tufan',
    //   date: '3 Days ago',
    //   title: 'The best LMS Design',
    //   content:
    //     'This course is a very applicable. Professor Ng explains precisely each algorithm and even tries to give an intuition for mathematical and statistic concepts behind each algorithm. Thank you very much.',
    // },
  ]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${users?.email}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [users?.email, user])
  

  useEffect(() => {
    // fetch(`http://localhost:5000/reviews`)
    fetch(`http://localhost:5000/review/${course?.course}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  },[reviews,course])
  

  // console.log(course)

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
  });

  const handleSubmitReview = () => {
    if (newReview.title && newReview.content) {
      const review = {
        id: reviews.length + 1,
        name: 'New User',
        date: 'Just Now',
        title: newReview.title,
        content: newReview.content,
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, title: '', content: '' });
    }

    const updateData = {
      ...newReview, ...course,
      user: user[0],
      date: '1 Minute ago',
    }

    fetch(`http://localhost:5000/reviews`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div className="space-y-8 px-8 py-12 max-w-4xl mx-auto   rounded-lg">
      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {reviews.map(review => (
          <div
            key={review?.id}
            className="border-b py-4 mb-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {review?.user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold">{review?.user?.name}</p>
                <p className="text-sm text-gray-500">{review?.date}</p>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{review?.title}</h3>
            <p className="text-gray-700">{review?.content}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <p>Was this review helpful?</p>
              <button className="px-4 py-1 border rounded-lg text-gray-800 hover:bg-gray-200">
                Yes
              </button>
              <button className="px-4 py-1 border rounded-lg text-gray-800 hover:bg-gray-200">
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
        <div className="space-y-4">
          {/* Rating */}
          <div>
            <p className="text-lg">What is it like to Course?</p>
            <div className="flex gap-1 text-yellow-500 text-2xl">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Review Title
            </label>
            <input
              type="text"
              value={newReview.title}
              onChange={e =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Great Courses"
            />
          </div>
          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Review Content
            </label>
            <textarea
              value={newReview.content}
              onChange={e =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg h-32"
              placeholder="Message"
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmitReview}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
