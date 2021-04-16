import getCookie from "../utils/cookie";

const url = 'https://estatesbg.herokuapp.com/api/items';

const itemService = {
  create: async (data) => {
    return fetch(`${url}/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('auth-cookie')
      }
    });
  },
  getOne: async (id) => {
    return fetch(`${url}/details?_id=${id}`);
  },
  getAll: async () => {
    return fetch(`${url}/`);
  }
};

export default itemService;
