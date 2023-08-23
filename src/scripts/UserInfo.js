export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }


  async fetchUserData() {
  const cohortId = 'cohort-73';
  const url = `https://mesto.nomoreparties.co/v1/${cohortId}/users/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: '2b8cc866-b1cb-4cb1-a139-86e0e04b8844'
    }
  });

  if (response.ok) {
    const userData = await response.json();
    return userData;
  } else {
    throw new Error('Failed to fetch user data');
  }
}


  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setInitialUserInfo({ name, about }) {
    this.setUserInfo({ name, about }); // Установите начальные данные пользователя
  }

  async updateProfileInfoOnServer(name, about) {
    const cohortId = 'cohort-73';
    const url = `https://mesto.nomoreparties.co/v1/${cohortId}/users/me`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        authorization: '2b8cc866-b1cb-4cb1-a139-86e0e04b8844',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      return updatedUserData;
    } else {
      throw new Error('Failed to update profile');
    }
  }
}
