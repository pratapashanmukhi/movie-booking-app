import { io } from 'socket.io-client';

// 'http://localhost:3001' is the backend server address
// In a real app this would be an environment variable
export const socket = io('http://localhost:3001', {
  autoConnect: false // We will connect manually when needed
});
