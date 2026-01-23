
export default function ShippingPolicyPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Our Store';
  const content = (process.env.NEXT_PUBLIC_SHIPPING_POLICY || 'Content not available. Please configure the environment variables.').replace(/\[Store Name\]/g, storeName);

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
