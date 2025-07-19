const SubscriptionOverview = () => {
  return (
    <div className=" bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Subscription Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-indigo-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-indigo-900">100+</p>
          <p className="text-sm text-gray-600">Subscriptions</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-green-900">90</p>
          <p className="text-sm text-gray-600">Active</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-yellow-900">7</p>
          <p className="text-sm text-gray-600">Expiring</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-xl font-bold text-red-900">3</p>
          <p className="text-sm text-gray-600">Expired</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOverview;
