import ImageUploader from "@/components/admin-view/image-uploader";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploaderLoader, setImageUploaderLoader] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const {toast} = useToast();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Uploaded feature image"
        })
      }else{
        console.log(data, '-data')
        toast({
          title: "Image is missing"
        })
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // console.log(featureImageList, "featureImageList");

  return (
    <div>
      {/* <h1>Upload Feature Images</h1> */}
      <ImageUploader
        file={imageFile}
        setFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        imageUploaderLoader={imageUploaderLoader}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageUploaderLoader={setImageUploaderLoader}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, ind) => (
              <div className="relative" key={ind}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
