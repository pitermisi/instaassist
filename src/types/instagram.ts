export interface InstagramTokenResponse {
  access_token: string;
  user_id: number;
}

export interface InstagramUserInfo {
  id: string;
  username: string;
  name?: string;
  account_type?: string;
  profile_picture_url?: string;
}

export interface InstagramAccountData {
  instagramUserId: string;
  username: string;
  name: string | null;
  accountType: string | null;
  profilePictureUrl: string | null;
  accessToken: string;
}
