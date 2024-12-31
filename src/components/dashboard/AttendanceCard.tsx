import React from 'react';
import { Calendar } from 'lucide-react';
import { Employee } from '../../types';
import { markAttendance } from '../../utils/localStorage';

interface AttendanceCardProps {
  user: Employee;
  onAttendanceMarked: () => void;
}

export default function AttendanceCard({ user, onAttendanceMarked }: AttendanceCardProps) {
  const handleMarkAttendance = () => {
    markAttendance(user.id, 'present');
    onAttendanceMarked();
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            <Calendar className="h-5 w-5 inline mr-2" />
            Attendance
          </h3>
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Mark Attendance
          </button>
        </div>
        <div className="space-y-2">
          {user.attendance.map((record, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{new Date(record.date).toLocaleDateString()}</span>
              <span className="capitalize">{record.status}</span>
              {record.checkIn && <span>{record.checkIn}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}