import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { getAllOrdersOfUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./shoppingOrderDetailsView";

function ShoppingOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userOrders } = useSelector((state) => state.shopOrder);
  const { orderDetails } = useSelector((state) => state.shopOrder);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function viewOrderDetails(order) {
    // console.log(order._id, "-target");
    dispatch(getOrderDetails(order._id));
  }

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?.id));
  }, [dispatch]);
  // console.log(orderDetails, "-orderDetails");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [dispatch, orderDetails]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Order-Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders && userOrders.length > 0
              ? userOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`px-3 py-1 ${
                          order.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : "bg-black"
                        }`}
                      >
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button onClick={() => viewOrderDetails(order)}>
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
