import { useState, useEffect } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

import * as pdfService from '../services/pdf.js'

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `${process.env.REACT_APP_ABSOLUTE_PATH}/node_modules/pdfjs-dist/build/pdf.worker.min.js`,
  import.meta.url,
).toString()

const FileList = ({ list, handleClick }) =>
  <ul>
    {
      list.map((elem, index) =>
        <li key={index} onClick={() => handleClick(elem)}>
          <a href="#">{elem}</a>
        </li>)
    }
  </ul>

const PdfNavigator = ({ pageNumber, numPages, setPageNumber }) => {
  const checkPageNumberInput = (e) => {
    const number = e.target.valueAsNumber

    if (number > 0 && number <= numPages)
      setPageNumber(e.target.valueAsNumber)
  }

  const inputStyle = {
    textAlign: 'right',
    maxWidth: '50px'
  }

  return (
    <>
      <input
        type='number'
        min={1}
        max={numPages || 1}
        value={pageNumber}
        disabled={numPages === null}
        onChange={checkPageNumberInput}
        style={inputStyle}
      /> /{numPages}
    </>
  )

}

const PdfViewer = ({ goBack }) => {
  const [fileList, setFileList] = useState([])
  const [pdfUrl, setPdfUrl] = useState(null)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const getFileList = async () => {
    const list = await pdfService.getPdfList()
    setFileList(list)
  }

  const getPdfFile = async (name) => {
    const resp = await pdfService.getPdfFile(name);
    setPdfUrl(resp)
    setPageNumber(1)
  }

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  const lefSideStyle = {
    display: 'inline-block',
    maxWidth: '60vw',
    marginRight: '1vw'
  }

  const rightSideStyle = {
    display: 'inline-block',
    maxWidth: '39vw',
    textAlign: 'center',
    verticalAlign: 'top'
  }

  useEffect(() => { getFileList() }, [])

  return (
    <>
      <div style={lefSideStyle}>
        <FileList list={fileList} handleClick={getPdfFile} />
      </div>
      <div style={rightSideStyle}>
        <PdfNavigator
          pageNumber={pageNumber}
          numPages={numPages}
          setPageNumber={setPageNumber}
        />
        <button
          style={{ margin: 0, width: '100%' }}
          onClick={goBack}
        >
          Retour
        </button>
      </div>
      <div style={{ display: 'block', maxWidth:'100vw' }}>
      {
        pdfUrl === null ?
          'Veuillez choisir un catalogue' :
          pdfUrl === 'error' ?
            'Erreur lors du chargement du catalogue' :
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
      }
      </div>
    </>
  )
}

export default PdfViewer