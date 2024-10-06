import AdminOrdersDetails from "@/components/admin-view/orders-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllOrdersOfAllUsers,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const { allOrders, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function viewOrderDetails(order) {
    dispatch(getOrderDetails(order._id));
  }

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenProductDetailsDialog(true);
    }
  }, [dispatch, orderDetails]);

  useEffect(() => {
    dispatch(getAllOrdersOfAllUsers());
  }, [dispatch]);
  // console.log(allOrders, "-allOrders");

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
            {allOrders && allOrders.length > 0
              ? allOrders.map((order) => (
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
                        open={openProductDetailsDialog}
                        onOpenChange={() => {
                          setOpenProductDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button onClick={() => viewOrderDetails(order)}>
                          View Details
                        </Button>
                        <AdminOrdersDetails orderDetails={orderDetails} />
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
};

export default AdminOrders;
