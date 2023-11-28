const askToAI = async (request) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/askToLLM`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request })
  })
  return await response.json()
}

const testQuery = async (request) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/testQuery`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request })
  })
  return await response.json()
}

export { askToAI, testQuery };