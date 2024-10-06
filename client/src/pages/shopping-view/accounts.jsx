import React from 'react'
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShoppingOrders from '@/components/shopping-view/orders';
import Address from '@/components/shopping-view/address';

const Account = () => {
  return (
    <div className="flex flex-col">
        <div className="h-[300px] w-full overflow-hidden relative">
          <img src={accImg} alt="" className="w-full h-full object-cover object-center" />
        </div>
        <div className="container mx-auto grid grid-cols-1 py-8 gap-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue='orders'>
              <TabsList>
                <TabsTrigger value='orders'>Orders</TabsTrigger>
                <TabsTrigger value='address'>Address</TabsTrigger>
              </TabsList>
              <TabsContent value='orders'>
                  <ShoppingOrders />
              </TabsContent>
              <TabsContent value='address'>
                  <Address />
              </TabsContent>
            </Tabs>
          </div>
        </div>
    </div>
  )
}

export default Account
