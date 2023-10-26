const getPdfList = async() => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/catalogs/list`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  })
  return response.json()
}

const getPdfFile = async (fileName) => { 
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/catalogs/${fileName}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  })
  const contentType = response.headers.get('content-type')

  if(contentType === 'application/pdf') {
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  }
  else {
    return 'error'
  }
}

export { getPdfList, getPdfFile }