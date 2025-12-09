const WhyChooseCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition duration-300">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);
export default WhyChooseCard;
