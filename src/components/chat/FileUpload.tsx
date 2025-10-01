const FileUpload = ({
  selectedFiles,
  onFilesSelected,
}: {
  selectedFiles: File[];
  onFilesSelected: (files: File[]) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    onFilesSelected(filesArray);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      {selectedFiles.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600">
          {selectedFiles.map((file, index) => (
            <li key={index}>• {file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;

