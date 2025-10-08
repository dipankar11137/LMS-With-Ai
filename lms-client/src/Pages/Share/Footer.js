
const Footer = () => {
  return (
    <div className="bg-[#0c003c] text-white p-16">
      {/* Top Section */}
      <div className="grid grid-cols-4 gap-10 mb-10">
        {/* Column 1 */}
        <div>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Learner Stories</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Leadership</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <ul className="space-y-2">
            <li>Development</li>
            <li>Business</li>
            <li>Finance & Accounting</li>
            <li>IT & Software</li>
            <li>Office Productivity</li>
            <li>Design</li>
            <li>Marketing</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <ul className="space-y-2">
            <li>Lifestyle</li>
            <li>Photography & Video</li>
            <li>Health & Fitness</li>
            <li>Music</li>
            <li>UX Design</li>
            <li>SEO</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="mb-3 font-medium">Documentation</h4>
          <ul className="space-y-2">
            <li>FAQs</li>
            <li>Dashboard</li>
            <li>Contact</li>
          </ul>
          <div className="mt-5">
            <p className="mb-2 text-sm">We don’t send spam so don’t worry.</p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Email..."
                className="w-full px-3 py-2 rounded-l-lg focus:outline-none"
              />
              <button className="bg-purple-600 px-4 py-2 text-white rounded-r-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-5 flex flex-wrap justify-between items-center text-sm mt-24">
        {/* Left Side */}
        <p>© 2025 HandiLearn. All Right Reserved.</p>

        {/* Middle Links */}
        <ul className="flex space-x-3">
          <li>Help</li>
          <li>Privacy Policy</li>
          <li>Cookie Notice</li>
          <li>Security</li>
          <li>Terms of Use</li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 bg-[#2c1464] px-3 py-2 rounded-lg">
            <span className="material-icons">language</span>
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
