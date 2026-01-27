
export default function RefundPolicyPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Our Store';

  const genericPolicy = `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Thank you for shopping at ${storeName}.

If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.

The following terms are applicable for any products that You purchased with Us.

Interpretation and Definitions
==============================

Interpretation
--------------

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

Definitions
-----------

For the purposes of this Return and Refund Policy:

  * Company (referred to as either "the Company", "We", "Us" or "Our" in this
    Agreement) refers to ${storeName}.

  * Goods refer to the items offered for sale on the Service.

  * Orders mean a request by You to purchase Goods from Us.

  * Service refers to the Website.

  * Website refers to ${storeName}, accessible from your store's URL

  * You means the individual accessing or using the Service, or the company,
    or other legal entity on behalf of which such individual is accessing or
    using the Service, as applicable.


Your Order Cancellation Rights
==============================

You are entitled to cancel Your Order within 14 days without giving any reason for doing so.

The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.

In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by the contact methods available on our Contact Us page.

We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.
`;

  const content = (process.env.NEXT_PUBLIC_REFUND_POLICY || genericPolicy).replace(/\[Store Name\]/g, storeName);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8 text-center">
        Refund Policy
      </h1>
      <div className="max-w-4xl mx-auto text-muted-foreground whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
        {content}
      </div>
    </div>
  );
}
