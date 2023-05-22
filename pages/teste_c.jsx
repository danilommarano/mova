import React, { useState, useRef } from "react";

const UploadButton = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".svg" onChange={handleFileChange} />
    </div>
  );
};

const Canvas = ({ svgContent, setSvgRef }) => {
  const svgRef = useRef(null);

  const handleClick = () => {
    setSvgRef(svgRef.current);
    console.log(svgRef.current);
  };

  return (
    <div>
      <svg
        ref={svgRef}
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

const DownloadButton = ({ svgContent, svgRef }) => {
  const handleDownload = () => {
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "image.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download SVG</button>
    </div>
  );
};

const SVGEditor = () => {
  const [svgContent, setSvgContent] = useState(null);
  const [svgRef, setSvgRef] = useState(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgContent(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>SVG Editor</h1>
      <UploadButton onFileUpload={handleFileUpload} />
      {svgContent && <Canvas svgContent={svgContent} setSvgRef={setSvgRef} />}
      {svgContent && <DownloadButton svgContent={svgContent} svgRef={svgRef} />}
    </div>
  );
};

export default SVGEditor;
