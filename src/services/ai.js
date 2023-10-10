
const askToAI = async (prompt) => {
  let response = await fetch("http://192.168.1.220:8080/completion", {
    method: 'POST',
    body: JSON.stringify({ prompt, n_predict: 512, })
  })
  console.log(await (response.json()).content)
  return 'OUPS' //(await response.json()).content
}

export default { askToAI } 