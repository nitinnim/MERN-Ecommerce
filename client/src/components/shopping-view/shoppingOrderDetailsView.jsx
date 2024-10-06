import { useSelector } from "react-redux";
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

function ShoppingOrdersDetails({ orderDetails }) {
  // console.log(orderDetails, '-details')
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-red-600 overflow-y-auto">
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
                className={`px-3 py-1 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="grid gap-6 max-h-[170px] overflow-auto">
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
        </div>
      </DialogContent>
    </div>
  );
}

export default ShoppingOrdersDetails;
