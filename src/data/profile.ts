
import profileData from '../content/profile.json';

type ContactDetails = {
  email: string;
  phone: string;
  linkedin: string;
  behance: string;
};

type ProfileData = typeof profileData & {
  contact?: ContactDetails;
};

export const profile = profileData as ProfileData;

export type Profile = ProfileData;
