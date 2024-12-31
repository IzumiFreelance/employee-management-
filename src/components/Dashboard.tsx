import React, { useState } from 'react';
import { getCurrentUser, getAnnouncements, logout } from '../utils/localStorage';
import Header from './layout/Header';
import ProfileCard from './dashboard/ProfileCard';
import AttendanceCard from './dashboard/AttendanceCard';
import AnnouncementCard from './dashboard/AnnouncementCard';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const user = getCurrentUser();
  const announcements = getAnnouncements();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ProfileCard user={user} />
            <AttendanceCard 
              user={user} 
              onAttendanceMarked={() => setRefreshKey(key => key + 1)} 
            />
            <AnnouncementCard announcements={announcements} />
          </div>
        </div>
      </main>
    </div>
  );
}