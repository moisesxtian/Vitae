// PDFViewer.jsx
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker.min?url';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfWorkerURL, import.meta.url).toString();

const PDFViewer = ({ pdfBlob }) => {
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    if (pdfBlob) {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      setBlobURL(URL.createObjectURL(blob));
    }
  }, [pdfBlob]);
  return (
    <Document file={blobURL} onLoadError={console.error}>
      <Page 
        pageNumber={1} 
        renderTextLayer={false}
        renderAnnotationLayer={false}
        customTextRenderer={false}
      />
    </Document>
  );
};

export default PDFViewer;
