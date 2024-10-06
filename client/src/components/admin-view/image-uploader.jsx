import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ImageUploader({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageUploaderLoader,
  setImageUploaderLoader,
  isEditedMode,
  isCustomStyling=false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    // console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropedFile = e.dataTransfer.files?.[0];
    if(dropedFile) setFile(dropedFile);
  }

  function handleFileRemover() {
    setFile(null);
    if(inputRef.current) {
        inputRef.current.value = '';
    }
  }

  async function uploadImageToCloudinary() {
    setImageUploaderLoader(true);
    const data = new FormData();
    data.append('my_file', file);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
    // console.log("response - ", response);
    if(response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageUploaderLoader(false);
    } 

  }

  useEffect(() => {
    if(file !== null) uploadImageToCloudinary();
  }, [file])

  return (
    <div className={`w-full my-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'} `}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${isEditedMode ? 'opacity-40' : ''}`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditedMode}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 ${isEditedMode ? '' : 'cursor-pointer'}`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          imageUploaderLoader ? <Skeleton className="h-10 bg-gray-400" /> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <FileIcon className="w-8 h-8 text-primary mr-2"/>
            </div>
            <p className="text-sm font-medium">{file.name}</p>
            <Button variant="ghost" size='icon' className="text-muted-foreground hover:text-foreground" onClick={handleFileRemover}>
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
