import { useState, useRef, useEffect } from "react";
import { FaSearch, FaFileVideo, FaBook, FaMusic, FaFileArchive, FaFileImage, FaFileAlt } from "react-icons/fa";

export default function Home() {
  const [query, setQuery] = useState("");
  const [fileType, setFileType] = useState("");
  const [resType, setResType] = useState("");
  const [engine, setEngine] = useState("google");
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [isFileTypeDropdownOpen, setIsFileTypeDropdownOpen] = useState(false);
  const [isEngineDropdownOpen, setIsEngineDropdownOpen] = useState(false);
  const [warning, setWarning] = useState(""); // Warning state for empty input

  const fileTypeDropdownRef = useRef(null);
  const engineDropdownRef = useRef(null);

  const engines = {
    google: { name: "Google" },
    googol: { name: "Googol" },
    startpage: { name: "Startpage" },
    searx: { name: "Searx" },
    filepursuit: { name: "FilePursuit" },
  };

  const fileTypes = [
    { type: "mkv|mp4|avi|mov|mpg|wmv|divx|mpeg", label: "TV/Movies", res: "video", icon: <FaFileVideo className="text-xl" /> },
    { type: "MOBI|CBZ|CBR|CBC|CHM|EPUB|FB2|LIT|LRF|ODT|PDF|PRC|PDB|PML|RB|RTF|TCR|DOC|DOCX", label: "Books", res: "ebook", icon: <FaBook className="text-xl" /> },
    { type: "mp3|wav|ac3|ogg|flac|wma|m4a|aac|mod", label: "Music", res: "audio", icon: <FaMusic className="text-xl" /> },
    { type: "exe|iso|dmg|tar|7z|bz2|gz|rar|zip|apk", label: "Software/Games", res: "archive", icon: <FaFileArchive className="text-xl" /> },
    { type: "jpg|png|bmp|gif|tif|tiff|psd", label: "Images", res: "picture", icon: <FaFileImage className="text-xl" /> },
    { type: "", label: "Other", res: "all", icon: <FaFileAlt className="text-xl" /> },
  ];

  const startSearch = () => {
    if (!query.trim()) {
      setWarning("Please enter a search query."); // Show warning if input is empty
      return;
    }

    let finalQuery = query + 
                    (fileType ? ` +(${fileType})` : "") + 
                    " -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) intitle:index.of";
    let url;

    switch (engine) {
      case "google":
        url = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
        break;
      case "googol":
        url = `https://googol.warriordudimanche.net/?q=${encodeURIComponent(finalQuery)}`;
        break;
      case "startpage":
        url = `https://www.startpage.com/do/dsearch?query=${encodeURIComponent(finalQuery)}`;
        break;
      case "searx":
        url = `https://searx.me/?q=${encodeURIComponent(finalQuery)}`;
        break;
      case "filepursuit":
        url = `https://filepursuit.com/search/${query.replace(/ /g, "+")}/type/${resType}`;
        break;
      default:
        return;
    }

    setWarning(""); // Clear warning if query is valid
    window.open(url, "_blank");
  };

  const handleFileTypeSelect = (fileType) => {
    setFileType(fileType.type);
    setResType(fileType.res);
    setSelectedFileType(fileType);
    setIsFileTypeDropdownOpen(false); // Close dropdown after selection
  };

  const handleEngineSelect = (engine) => {
    setEngine(engine);
    setIsEngineDropdownOpen(false); // Close dropdown after selection
  };

  const toggleFileTypeDropdown = () => {
    setIsFileTypeDropdownOpen(prev => !prev);
  };

  const toggleEngineDropdown = () => {
    setIsEngineDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (fileTypeDropdownRef.current && !fileTypeDropdownRef.current.contains(event.target)) {
      setIsFileTypeDropdownOpen(false);
    }
    if (engineDropdownRef.current && !engineDropdownRef.current.contains(event.target)) {
      setIsEngineDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 py-10 px-4">
      <h1 className="text-5xl font-bold text-center text-white mb-6 shadow-md">Find Me This</h1>
      <p className="text-center text-gray-400 mb-8 text-lg">Discover direct download links for almost anything.</p>

      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8 transition-transform">
        {/* Custom File Type Selector */}
        <div className="mb-6" ref={fileTypeDropdownRef}>
          <label className="block mb-2 font-semibold text-gray-300">Choose File Type</label>
          <div className="relative">
            <button
              onClick={toggleFileTypeDropdown}
              className="flex items-center w-full px-4 py-3 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-700 transition duration-300"
            >
              {selectedFileType ? selectedFileType.icon : <FaFileAlt className="text-xl" />} 
              <span className="ml-2">{selectedFileType ? selectedFileType.label : "Select File Type"}</span>
            </button>
            {isFileTypeDropdownOpen && (
              <div className="absolute w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg mt-2 z-10">
                {fileTypes.map((ft, index) => (
                  <div
                    key={index}
                    onClick={() => handleFileTypeSelect(ft)}
                    className="flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer text-gray-200 transition duration-300"
                  >
                    {ft.icon} <span className="ml-2">{ft.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Search Engine Selector */}
        <div className="mb-6" ref={engineDropdownRef}>
          <label className="block mb-2 font-semibold text-gray-300">Select Search Engine</label>
          <div className="relative">
            <button
              onClick={toggleEngineDropdown}
              className="flex items-center w-full px-4 py-3 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-700 transition duration-300"
            >
              <span className="ml-2">{engines[engine].name}</span>
            </button>
            {isEngineDropdownOpen && (
              <div className="absolute w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg mt-2 z-10">
                {Object.keys(engines).map((key) => (
                  <div
                    key={key}
                    onClick={() => handleEngineSelect(key)}
                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer text-gray-200 transition duration-300"
                  >
                    {engines[key].name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Query Input */}
        <div className="relative mb-6">
          <label className="block mb-2 font-semibold text-gray-300">Search Files</label>
          <div className="flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-5/6 px-4 py-3 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500 transition duration-300"
              placeholder="The Batman 2022"
            />
            <button
              onClick={startSearch}
              className="ml-2 p-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center h-10 w-10 transition duration-300"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          {warning && <p className="mt-2 text-sm text-red-500">{warning}</p>}
        </div>
      </div>
    </div>
  );
          }
