import React from 'react';
import { Bell } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementCardProps {
  announcements: Announcement[];
}

export default function AnnouncementCard({ announcements }: AnnouncementCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg md:col-span-2">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <Bell className="h-5 w-5 inline mr-2" />
          Announcements
        </h3>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-4 rounded-md ${
                announcement.important ? 'bg-red-50' : 'bg-gray-50'
              }`}
            >
              <h4 className="text-lg font-medium">{announcement.title}</h4>
              <p className="text-gray-600">{announcement.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(announcement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}