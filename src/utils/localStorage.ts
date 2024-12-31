import { Employee, Announcement } from '../types';

// Initial demo data
const demoEmployee: Employee = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  role: 'Software Engineer',
  attendance: []
};

const demoAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to Employee Portal',
    content: 'Welcome to our new employee management system! This platform will help you track your attendance and stay updated with company announcements.',
    date: new Date().toISOString(),
    important: true
  },
  {
    id: '2',
    title: 'New Feature: Attendance Tracking',
    content: 'You can now mark your attendance directly from the dashboard. Try it out!',
    date: new Date().toISOString(),
    important: false
  }
];

const STORAGE_KEYS = {
  EMPLOYEES: 'employees',
  ANNOUNCEMENTS: 'announcements',
  CURRENT_USER: 'currentUser'
} as const;

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify([demoEmployee]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(demoAnnouncements));
  }
};

export const getEmployees = (): Employee[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]');
};

export const getCurrentUser = (): Employee | null => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
};

export const registerUser = (userData: Omit<Employee, 'id' | 'attendance'>): boolean => {
  const employees = getEmployees();
  
  // Check if email already exists
  if (employees.some(emp => emp.email === userData.email)) {
    return false;
  }

  const newEmployee: Employee = {
    ...userData,
    id: crypto.randomUUID(),
    attendance: []
  };

  employees.push(newEmployee);
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  return true;
};

export const login = (email: string): Employee | null => {
  const employees = getEmployees();
  const employee = employees.find(emp => emp.email === email);
  if (employee) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(employee));
    return employee;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getAnnouncements = (): Announcement[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS) || '[]');
};

export const markAttendance = (employeeId: string, status: 'present' | 'absent' | 'late') => {
  const employees = getEmployees();
  const now = new Date();
  const todayDate = now.toISOString().split('T')[0];
  
  const updatedEmployees = employees.map(emp => {
    if (emp.id === employeeId) {
      // Check if attendance is already marked for today
      const hasMarkedToday = emp.attendance.some(a => a.date === todayDate);
      if (hasMarkedToday) {
        return emp;
      }
      
      return {
        ...emp,
        attendance: [
          ...emp.attendance,
          {
            date: todayDate,
            status,
            checkIn: status === 'present' ? now.toLocaleTimeString() : undefined
          }
        ]
      };
    }
    return emp;
  });

  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(updatedEmployees));
  
  // Update current user
  const updatedUser = updatedEmployees.find(emp => emp.id === employeeId);
  if (updatedUser) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
  }
};