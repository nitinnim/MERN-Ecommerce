import ImageUploader from "@/components/admin-view/image-uploader";
import AdminProductTile from "@/components/admin-view/Product-tile";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/product-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function onSubmit() {}

const Products = () => {
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploaderLoader, setImageUploaderLoader] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    {
      currentEditedId !== null
        ? dispatch(
            editProduct({ id: currentEditedId, productDetails: formData })
          ).then((data) => {
            console.log(data, "-edit");
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setOpenAddProductDialog(false);
              setFormData(initialState);
              setCurrentEditedId(null);
              toast({
                title: "Product Edited successfully",
              });
            }
          })
        : dispatch(
            addProduct({
              ...formData,
              image: uploadedImageUrl,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setOpenAddProductDialog(false);
              setImageFile(null);
              setFormData(initialState);
              toast({
                title: "Product added successfully",
              });
            }
          });
    }
  }

  // console.log("Products - ", productList)

  function handleDeleteProduct(productId) {
    dispatch(deleteProduct({ id: productId })).then(data => {
      if (data?.payload?.success)
      dispatch(fetchAllProduct());
      toast({
        title: "Product Deleted successfully",
      });
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex justify-end mb-5 w-full">
        <Button
          onClick={() => {
            setOpenAddProductDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product.title}
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                setOpenAddProductDialog={setOpenAddProductDialog}
                handleDelete={handleDeleteProduct}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openAddProductDialog}
        onOpenChange={() => {
          setOpenAddProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <ImageUploader
              file={imageFile}
              setFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              imageUploaderLoader={imageUploaderLoader}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageUploaderLoader={setImageUploaderLoader}
              isEditedMode={currentEditedId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
