const create = async (credentials, recipe) => {
    try {
      let response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(recipe)
      });
      const data = await response.json();
      console.log('Server response:', data); // Debug log
      return data;
    } catch (err) {
      console.error('Error creating recipe:', err);
      throw err; // Re-throw the error so it can be handled by the caller
    }
  };
  
  const list = async (credentials, signal) => {
    try {
      let response = await fetch('/api/recipes/', {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
  }
  
  const read = async (params, signal) => {
    try {
      let response = await fetch('/api/recipes/' + params.recipeId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
  }
  
  const update = async (params, credentials, recipe) => {
    try {
      let response = await fetch('/api/recipes/' + params.recipeId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(recipe)
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
  }
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/recipes/' + params.recipeId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  const uploadImage = async (credentials, formData) => {
    try {
      let response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + credentials.t
        },
        body: formData
      });
      return await response.json();
    } catch(err) {
      console.log(err);
    }
  };
  
  export { create, list, read, update, remove, uploadImage }