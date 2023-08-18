/*
  https://blague.xyz/api/joke/random
  https://api.blablagues.net
*/

const getJoke = async () => {
  const response = await fetch('https://api.blablagues.net/?nb=1&rub=blagues')
  return response.json()
}

export default { getJoke }