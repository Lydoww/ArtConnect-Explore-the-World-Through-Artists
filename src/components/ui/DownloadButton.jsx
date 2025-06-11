import React, { useState } from "react";
import { Download, Check } from "lucide-react";

const DownloadButton = ({ imageUrl, fileName }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "download.jpg";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      setDownloaded(true);

      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      type="button"
      aria-label={downloaded ? "Downloaded" : "Download"}
      className="p-0 m-0 border-none bg-transparent cursor-pointer text-white"
    >
      {downloaded ? <Check size={18} color="green" /> : <Download size={18} />}
    </button>
  );
};

export default DownloadButton;
