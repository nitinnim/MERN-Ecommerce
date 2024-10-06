import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

    console.log(paymentId, payerId, orderId, "-data0")

    useEffect(() => {
        if(paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            console.log(paymentId, payerId, orderId, "-data")
            dispatch(capturePayment({paymentId, payerId, orderId})).then((data) => {
                if(data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderID');
                    window.location.href = "/shop/payment-success"
                }
            })
        }
    },[dispatch, paymentId, payerId]);

    return ( <Card>
        <CardHeader>
            <CardTitle>Proceesing Payment...Please Wait!</CardTitle>
        </CardHeader>
    </Card> );
}

export default PaypalReturnPage;