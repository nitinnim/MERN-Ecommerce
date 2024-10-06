import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CommonForm from "../common/form";
import { useState } from "react";
import {
  getAllOrdersOfAllUsers,
  getOrderDetails,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../hooks/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrdersDetails({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {toast} = useToast();

  function handleUpdateStatus(e) {
    e.preventDefault();
    console.log(formData, "-formData");
    const { status } = formData;

    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetails(orderDetails?._id));
          dispatch(getAllOrdersOfAllUsers());
          setFormData(initialFormData);
          toast({
            title: data?.payload?.message,
          });
        }
      }
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle className="sr-only">Showing Order Details</DialogTitle>
      <div className="grid gap-6 mt-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order status</p>
            <Badge
              className={`${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : "bg-black"
              } px-3 py-1`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>
        <Separator />
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="font-medium">Orders Details</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails &&
                orderDetails?.cartItems &&
                orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((order) => (
                      <TableRow key={order?.title}>
                        <TableCell>{order?.title}</TableCell>
                        <TableCell>{order?.quantity}</TableCell>
                        <TableCell>${order?.price}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrdersDetails;
