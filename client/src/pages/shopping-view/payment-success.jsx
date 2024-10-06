import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return ( <Card>
        <CardHeader>
            <CardTitle>Payment Successful</CardTitle>
        </CardHeader>
        <CardContent>
            <Button onClick={() => navigate('/shop/account')}>View Orders</Button>
        </CardContent>
    </Card> );
}

export default PaymentSuccess;