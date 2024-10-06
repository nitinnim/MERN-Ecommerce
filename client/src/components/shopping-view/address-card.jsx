import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  currentSelectedAddressId
}) {
  // console.log(addressInfo,"-card");

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`${currentSelectedAddressId?._id===addressInfo?._id ? 'border-red-900 border-[4px] ' : 'border-black'} cursor-pointer border-red-700`}
    >
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>pincode: {addressInfo.pincode}</Label>
        <Label>phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
        <div className="flex justify-between items-center">
          <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
          <Button onClick={() => handleDeleteAddress(addressInfo)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressCard;
