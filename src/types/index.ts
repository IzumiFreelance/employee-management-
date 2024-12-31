export interface Employee {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: string;
  attendance: Attendance[];
}

export interface Attendance {
  date: string;
  status: 'present' | 'absent' | 'late';
  checkIn?: string;
  checkOut?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}