export default {
  authorize: () => 'token',
  isAuthorized: (secret: string) => secret === 'wizard',
};
