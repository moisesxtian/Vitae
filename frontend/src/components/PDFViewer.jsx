import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import useResizeObserver from '@react-hook/resize-observer'; 
import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker.min?url';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfWorkerURL, import.meta.url).toString();

const PDFViewer = ({ pdfBlob }) => {
  const { ref, width = 0 } = useResizeObserver();
  const [blobURL, setBlobURL] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => { 
    if (pdfBlob) {
      const blob = new Blob([pdfBlob], { type: 'application/pdf' });
      setBlobURL(URL.createObjectURL(blob));
    }
  }, [pdfBlob]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center space-x-2 mb-2">
        <button onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}>➖ Zoom out</button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale((s) => s + 0.25)}>➕ Zoom in</button>
      </div>

      <Document file={blobURL} onLoadError={console.error}>
        <Page 
          pageNumber={1}
          width={width}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
