export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  keywords: Keyword[];
  createdAt: Date;
  updatedAt: Date;
};

export type Keyword = {
  label: string;
  value: string;
};
