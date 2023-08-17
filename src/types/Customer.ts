export type StatusType = "Invalid" | "Bounced" | "Unsubscribed" | "Spam";

export type CustomerType = {
  id: number;
  name: string;
  status: StatusType;
  email: string;
  country: string;
  postalZip: string;
  address: string;
  createdAt: number;
};

