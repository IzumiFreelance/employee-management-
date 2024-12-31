import React from 'react';
import { Employee } from '../../types';

interface ProfileCardProps {
  user: Employee;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}