export class CreateUserDto {
  userInfo: {
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    dob: Date;
    occupation: string;
    gender: string;
  };
  userContact: {
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  };
  userAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  userAcademics: {
    schoolName: string;
  }[];
}
