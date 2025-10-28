export interface Thread {
  id: string;
  lastMessageSnippet: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  sender: 'traveler' | 'staff';
  body: string;
  createdAt: string;
}
