import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "newcleare-reactor",
  private_key_id: "f6c40b92d909a2c3887c38fc0097a189b68c1bff",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIHD8hL8TkZV4L\nmeigzdjKQ+AXDT5KIBPt6BVWHPhqopuqwfxgXTh6F7yzY9rNJoK6XJH454tDJd92\nm9mKaBDD4Z8gXG5e2T2iQNXQ0h47coAYeVhBR4iojwyc4jyf02d3O4AThOTUzBdO\nENcDkqMPxev9gGuCxi6mKwCwAHjNlPzF18DrgCyMqrFS2xA2pXcqHObWK1stKIZc\nhMTA/gDQ5JCbD/brhotFQ1B7Jdb+ZJxr07MfWt9a3olm53xRJGeARn3Ots2jp8Vw\nnX+WCp5lKzutPbZl+v4n4ExfAJ+Hhf2lAG1YZal2HSd+vKRHQmfg1v3/oazscf30\nIk/b2T9xAgMBAAECggEAIVmmd8xzSbFPLtXJZwtc0buQMadRC0o0qBYMKvGMa+aK\nf7dGwsn71fVLdgZH+qAsHLe9fY3GsDveoJuGx5diZpLypz0LCUm2s5Tkovccd2yK\nHAoVLa6oquxJqNfXogy561gs7JPduKKu+6FjhEKVudToPgkqDH3PsSfs5xLyZH3g\nVQuiWzJWzGlp50ID90T/GHl45vXpRq+Z3U0/IxaXwxAOdI1+XWfCv8zSGmY2zET6\nVbkDRFrdofosuvmcTJWhexdxwMGzukSAowXgfyM/oJx22AFW7KpI8all58cdchNz\n/dX9hDF4SvgAFRD9T8hpajsWaazN7jbXsjwX5n81BQKBgQDjgj5bKlYeAoAbr0ep\nkwcADizZo+JY/87YLKBNWD9q4zt4fNsKI8DQ1AOz5/sPFaBqKg1LxzdWb9QKMiSZ\nR6rMZxz/L02G9K+qUtvlO/U1RTTj+g5kJGn9CwFy26P171uOJ3AJ2ueQyazJby1R\ni/UhZV/0wQm2BVA3u9ZV9XhC+wKBgQDhK6FpaDUwp+2LRXcnE2mQgU9vrnUZGfJE\nE6WUSPX1QnjYog5C+Q1cEyV084mhd5CoOn5C16W8AmHVpIm28fXXrU0Z1Wr3yojw\n0kXuRKbFq4biGXMFNO+mMnr3VIosnAsS1xsydgIeydrWlhnxi+iQgjAS1BfURL/d\n/gTIiHObgwKBgC/ioAFMPef/Gru4/tpgSd7nHOWKKwAUh5LUgcEFzANRZJkNnoTZ\n1aGenlDliOA56xOtWjMS8UDONNEYkL96aCaxpVbIvAalxbuRyRrMreXSdTluzkyh\npXVPNbTZKf9/q8OV5W0NmCPPbwDO17kMPkITNkkrwEGBiMrSTGC3U+K1AoGAMQdN\nCCSWoFeQU6j2ft2tOLfPUiQMf0C1Dbmxbg5M7/BfW9w9eru7+vZ4S3TT3QKpzted\nsnQ+NCfYoapICju5KhMkHKHpvratBrLiYzUzkwr8PbMI5nNWUzvepogT5g68IogP\n9fbYE1gkfGEGmR+7reuLCC6CWcf2dyHebMO5WH0CgYAV/7DkQQU/nds7xZVlCtpA\nabPhpRJjt5MfHrkoWSbo6JAl3dfSxuUe2uiKOt8ebjgztIMDgq5kJmZ1JuJF9/tS\nEP1Pe0o1bor12z/tdCAwgVEjjAaru1PUE9/0c07DPy71h1Vs91tOpAcMfl8WZZT6\nXFhAVP9/xnIkXW7rq9fdYw==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-4psfp@newcleare-reactor.iam.gserviceaccount.com",
  client_id: "116139929212391890550",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4psfp%40newcleare-reactor.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

let app;
if (!app) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase initialized (server)", app);
}

export const validateRequest = async (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const decodedToken = await app.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};