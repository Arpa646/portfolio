import React from "react";

const PDFDownload = () => {
  // Replace this with the direct download link from Google Drive or your server
  const fileUrl =
    "https://drive.google.com/uc?export=download&id=1Hxb91UNto43uH0yQoDuZuaKU9ENf6JH7";

  return (
    <div className="pdf-download-section">
      <a href={fileUrl} download="Arpa_Akter_CV.pdf">
        <button className="border  border-gray-500 text-white px-4 py-2 rounded">
          Download CV
        </button>
      </a>
    </div>
  );
};

export default PDFDownload;
