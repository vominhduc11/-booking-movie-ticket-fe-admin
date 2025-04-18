import React from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-red-50">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700">Trang không tìm thấy</h2>
          
          <p className="mt-4 text-gray-600">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          
          <div className="mt-8">
            <button 
              onClick={() => window.location.href = '/admin/dashboard'} 
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;