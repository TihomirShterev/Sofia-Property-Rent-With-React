const url = 'http://localhost:3001/api/users';
// const url = 'https://estatesbg.herokuapp.com/api/users';

const userService = {
  authenticate: async (path, data, onSuccess, onFailure) => {
    try {
      const promise = await fetch(url + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const authToken = promise.headers.get('Authorization');
      document.cookie = `auth-cookie=${authToken}`;
      const res = await promise.json();

      if (authToken) {
        onSuccess({
          email: res.email,
          id: res._id
        });
      } else {
        onFailure();
      }
    } catch (err) {
      onFailure(err);
    }
  },
  getProfileInfo: async (id) => {
    return fetch(`${url}/profile?_id=${id}`);
  }
};


export default userService;