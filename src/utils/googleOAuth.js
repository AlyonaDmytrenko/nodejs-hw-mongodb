import { OAuth2Client } from 'google-auth-library';

const googleOAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export async function getOAuthUrl() {
  return googleOAuth2Client.getOAuthUrl({
    sqope: [
      'https://www.googleapis.com/auth/userinfo.email	',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

export async function validateCode(code) {
    const response = await googleOAuth2Client.getToken(code);
    console.log(response);
    
   return googleOAuth2Client.verifyIdToken({
        idToken: response.tokens.id_token
    });

   
}