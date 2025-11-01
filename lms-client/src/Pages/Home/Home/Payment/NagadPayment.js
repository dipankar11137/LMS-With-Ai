import { useState } from 'react';

const NagadPayment = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the terms and conditions before proceeding.');
      return;
    }
    alert(`Payment initiated for account: ${accountNumber}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 shadow-xl rounded-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#d91c23] flex flex-col items-center py-5 relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Nagad_Logo.png"
            alt="Nagad Logo"
            className="w-20 mb-2"
          />
          <h2 className="text-white text-lg font-semibold">Merchant Payment</h2>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gradient-to-b from-[#d91c23]/10 to-white"
        >
          <div className="text-sm mb-4">
            <p className="text-gray-800 font-semibold">
              Merchant:{' '}
              <span className="font-normal text-gray-700">Test Merchant</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Invoice No:{' '}
              <span className="font-normal text-gray-700">h69nl278</span>
            </p>
            <p className="text-gray-800 font-semibold">
              Amount:{' '}
              <span className="font-normal text-gray-700">BDT 65.00</span>
            </p>
          </div>

          <label className="block text-gray-800 font-medium mb-1">
            Your Nagad account number
          </label>
          <input
            type="text"
            placeholder="01XXXXXXXXX"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d91c23] mb-3"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{' '}
              <a
                href="#"
                className="text-[#d91c23] font-medium hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-300 mr-2"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="w-1/2 bg-[#d91c23] text-white py-2 rounded-md font-semibold hover:bg-[#b5161b]"
            >
              PROCEED
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-[#d91c23] text-white text-center py-2 text-sm">
          <p>📞 16167 | 096 096 16167</p>
        </div>
      </div>
    </div>
  );
};

export default NagadPayment;
