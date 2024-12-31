import React from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { getCurrentUser } from '../../utils/localStorage';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const user = getCurrentUser();
  
  if (!user) return null;
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 font-semibold text-gray-900">{user.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}