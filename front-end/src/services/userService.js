const url = 'https://estatesbg.herokuapp.com/api/users';

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
        if (
          path === '/register'
          && (data.email.match(/^[a-zA-Z0-9.-]{6,}@\w+.(com|bg)$/))
          && (data.password.length >= 6)
          && (data.rePassword === data.password)
          && (data.email && data.password && data.rePassword)
        ) {
          onSuccess({
            email: res.email,
            id: res._id
          });
        } else if (
          path === '/login'
        ) {
          onSuccess({
            email: res.email,
            id: res._id
          });
        }
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