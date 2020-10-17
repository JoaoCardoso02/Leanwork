export const TOKEN_KEY = "@users";

export const insertUser = (data) => {
  const users = localStorage.getItem(TOKEN_KEY);
  if (users) {
    const dataParse = JSON.parse(users);
    dataParse.push(data);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(dataParse));
  } else {
    const dataArray = [data]
    const dataString = JSON.stringify(dataArray);
    
    localStorage.setItem(TOKEN_KEY, dataString);
  }
}

export const getUsers = () => JSON.parse(localStorage.getItem(TOKEN_KEY));

export const alterPassword = (id, newPassword) => {
  const users = localStorage.getItem(TOKEN_KEY);
  if (users) {
    const dataParse = JSON.parse(users);
    const newArrayUsersWithNewPassword = dataParse.filter(user => {
      if (user.id === Number(id)) {
        user.password = newPassword;
      }
      return user;
    })

    const dataString = JSON.stringify(newArrayUsersWithNewPassword);
    
    localStorage.setItem(TOKEN_KEY, dataString);
  }
}

export const modifyDataUser = (id, data) => {
  const users = JSON.parse(localStorage.getItem(TOKEN_KEY));

  const newArrayUsersWithDataModified = users.map(user => {
    if (user.id === Number(id)) {
      user.name = data.name;
      user.email = data.email;
      user.cpf = data.cpf;
      user.fone = data.fone;
    }
    return user;
  })
  localStorage.setItem(TOKEN_KEY, JSON.stringify(newArrayUsersWithDataModified));
}

export const deleteUser = (id) => {
  const newUsers = JSON.parse(localStorage.getItem(TOKEN_KEY)).filter(user => user.id !== Number(id));
  localStorage.setItem(TOKEN_KEY, JSON.stringify(newUsers));
}