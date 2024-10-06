import { useState } from "react";
import AlertDialogDemo from "../common/alert";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setCurrentEditedId,
  setFormData,
  setOpenAddProductDialog,
  handleDelete,
}) {
  function editProduct() {
    setCurrentEditedId(product._id);
    setFormData(product);
    setOpenAddProductDialog(true);
  }

  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            className="w-full h-[300px] object-cover rounded-t-lg"
            alt={product.title}
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mt-2 mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className={`text-lg font-bold`}>{product.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => editProduct()}>Edit</Button>
          <Button
            onClick={() => {
              setConfirmationModal({
                text1: "Are you absolutely sure?",
                text2: "This item will be deleted permanently",
                btn1text: "Cancel",
                btn2text: "Delete",
                btn2Handler: () => handleDelete(product._id),
                btn1Handler: () => setConfirmationModal(null),
              });
            }}
          >
            Delete
          </Button>
        </CardFooter>
        {/* confirmation modal */}
        <div>
          {confirmationModal && (
            <AlertDialogDemo modalData={confirmationModal} />
          )}
        </div>
      </div>
    </Card>
  );
}

export default AdminProductTile;
