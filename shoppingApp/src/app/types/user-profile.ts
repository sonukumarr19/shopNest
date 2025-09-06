export interface UserProfile {
  _id?: string; 
  name: string;     // MongoDB user ID
  firstName: string; // frontend extra
  lastName: string;
  email: string;
  isAdmin?: boolean;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  alternatePhone?: string;
}
