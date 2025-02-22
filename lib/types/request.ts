import { CreateRequestItemType, RequestItemType } from "./request-item";
import { UserType } from "./user";

export interface RequestType {
  id: string;
  username: string;
  User: UserType;
  reason: string;
  status: string;
  detail?: string;
  image?: string | File;
  createdAt: Date;
  updatedAt: Date;
  RequestItem: RequestItemType[];
}

export interface CreateRequestType {
  username: string;
  reason: string;
  status?: string;
  detail?: string;
  image?: string | File;
  RequestItem?: CreateRequestItemType[];
}

export const requestStatus = [
  {
    label: "All Requests",
    value: "all",
    color: "primary",
  },
  {
    label: "Accepted",
    value: "accepted",
    color: "green-500",
  },
  {
    label: "Pending",
    value: "pending",
    color: "slate-500",
  },
  {
    label: "Rejected",
    value: "rejected",
    color: "red-500",
  },
];
