const PDFViewer = ({ pdfBlob, onClose }) => {
  if (!pdfBlob) return null;

  const blobUrl = URL.createObjectURL(pdfBlob);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
      {/* Close Button */}
      <button
        onClick={() => {
          URL.revokeObjectURL(blobUrl);
          onClose();
        }}
        className="absolute top-6 right-6 bg-red-500 text-black  hover:bg-red-700 hover:text-white transition-all px-4 py-2 rounded-full shadow-md z-50"
      >
        ✕ Close
      </button>

      {/* PDF Viewer Container */}
      <div className="w-11/12 md:w-3/4 h-5/6  rounded-2xl overflow-hidden shadow-2xl ">
        <iframe
          src={blobUrl}
          title="PDF Preview"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
