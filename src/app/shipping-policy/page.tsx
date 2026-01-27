
export default function ShippingPolicyPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Our Store';
  
  const genericPolicy = `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: [Terms and Conditions URL].

Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.

WHAT ARE MY SHIPPING & DELIVERY OPTIONS?
=========================================

We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.

Free Shipping
-------------

We offer free standard shipping on all orders.

DO YOU DELIVER INTERNATIONALLY?
===============================

We do not offer international shipping at this time.

WHAT HAPPENS IF MY ORDER IS DELAYED?
====================================

If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.

QUESTIONS ABOUT RETURNS?
========================

If you have questions about returns, please review our Return Policy: [Refund Policy URL]

HOW CAN YOU CONTACT US ABOUT THIS POLICY?
=========================================

If you have any further questions or comments, you may contact us by the methods available on our Contact Us page.
`;

  const content = (process.env.NEXT_PUBLIC_SHIPPING_POLICY || genericPolicy).replace(/\[Store Name\]/g, storeName);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8 text-center">
        Shipping Policy
      </h1>
      <div className="max-w-4xl mx-auto text-muted-foreground whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
        {content}
      </div>
    </div>
  );
}
