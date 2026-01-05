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

export type NavigationItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};
