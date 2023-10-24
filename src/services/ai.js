const askToAI = async (request) => {
  const response = await fetch(process.env.REACT_APP_LLM_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request })
  })
  return await response.json()
}

export default { askToAI } 