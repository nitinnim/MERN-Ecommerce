import { addressFormControls } from "@/config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../hooks/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({setCurrentSelectedAddress, currentSelectedAddressId}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [isEditting, setIsEditting] = useState(null);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { user } = useSelector((state) => state.auth);

  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleAddAddress(e) {
    e.preventDefault();
    if (addressList.length >= 3 && !isEditting) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });
      return;
    }

    {
      isEditting
        ? dispatch(
            editAddress({
              userId: user.id,
              addressId: isEditting,
              formData: formData,
            })
          ).then((data) => {
            console.log(data, "-edited");
            if (data?.payload?.success) {
              setFormData(initialAddressFormData);
              setIsEditting(null);
              dispatch(getAllAddress({ userId: user?.id }));
              toast({
                title: "Address Edited Successfully",
              });
            }
          })
        : dispatch(
            addNewAddress({
              ...formData,
              userId: user?.id,
            })
          ).then((data) => {
            // console.log("add address - ", data);
            if (data?.payload?.success) {
              dispatch(getAllAddress({ userId: user?.id }));
              setFormData(initialAddressFormData);
              toast({
                title: "Address added to the list",
              });
            }
          });
    }
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  function handleDeleteAddress(addressInfo) {
    // console.log(addressInfo, "-info");
    dispatch(
      deleteAddress({ userId: user?.id, addressId: addressInfo?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllAddress({ userId: user?.id }));
        toast({
          title: "Address id deleted from the list",
        });
      }
    });
  }

  function handleEditAddress(addressInfo) {
    setIsEditting(addressInfo._id);

    setFormData({
      ...formData,
      address: addressInfo.address,
      city: addressInfo.city,
      phone: addressInfo.phone,
      pincode: addressInfo.pincode,
      notes: addressInfo.notes,
    });
  }

  useEffect(() => {
    dispatch(getAllAddress({ userId: user?.id }));
  }, [dispatch]);

  // console.log(addressList, "-addresslist");

  return (
    <Card>
      <div className="p-1 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                addressInfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                key={address._id}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                currentSelectedAddressId={currentSelectedAddressId}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {isEditting ? "Edit Your Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={isEditting ? "Edit" : "Add"}
          onSubmit={handleAddAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
