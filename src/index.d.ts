export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type HeaderNavigationItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  avatar?: string;
};
