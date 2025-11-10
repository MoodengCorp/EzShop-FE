import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomerSignupForm } from '@/components/ui_custom/CustomerSignupForm'
import { SellerSignupForm } from '@/components/ui_custom/SellerSignupForm'

export default function Signup() {
  return (
    <Tabs
      defaultValue="customer"
      className="mx-auto flex w-[1050px] flex-col overflow-hidden"
    >
      <TabsList className="mx-auto mb-8">
        <TabsTrigger value="customer">일반고객</TabsTrigger>
        <TabsTrigger value="seller">입점고객</TabsTrigger>
      </TabsList>
      <TabsContent value="customer" className="flex justify-center">
        <CustomerSignupForm />
      </TabsContent>
      <TabsContent value="seller" className="flex justify-center">
        <SellerSignupForm />
      </TabsContent>
    </Tabs>
  )
}
