const getJoke = async () => {
  const response = await fetch('https://blague.xyz/api/joke/random', {
     method: 'GET', 
     mode: 'no-cors',
     headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    } 
  })
  return response.json()
}

export default { getJoke }