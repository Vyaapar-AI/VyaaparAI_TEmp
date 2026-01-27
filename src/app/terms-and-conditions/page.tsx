
export default function TermsAndConditionsPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Our Store';
  
  const genericPolicy = `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Please read these terms and conditions carefully before using Our Service.

Interpretation and Definitions
==============================

Interpretation
--------------

The words of which the initial letter is capitalized have meanings defined
under the following conditions. The following definitions shall have the same
meaning regardless of whether they appear in singular or in plural.

Definitions
-----------

For the purposes of these Terms and Conditions:

  * Affiliate means an entity that controls, is controlled by or is under
    common control with a party, where "control" means ownership of 50% or
    more of the shares, equity interest or other securities entitled to vote
    for election of directors or other managing authority.

  * Country refers to: India

  * Company (referred to as either "the Company", "We", "Us" or "Our" in this
    Agreement) refers to ${storeName}.

  * Device means any device that can access the Service such as a computer, a
    cellphone or a digital tablet.

  * Service refers to the Website.

  * Terms and Conditions (also referred as "Terms") mean these Terms and
    Conditions that form the entire agreement between You and the Company
    regarding the use of the Service.

  * Third-party Social Media Service means any services or content (including
    data, information, products or services) provided by a third-party that
    may be displayed, included or made available by the Service.

  * Website refers to ${storeName}, accessible from your store's URL

  * You means the individual accessing or using the Service, or the company,
    or other legal entity on behalf of which such individual is accessing or
    using the Service, as applicable.

Acknowledgment
==============

These are the Terms and Conditions governing the use of this Service and the
agreement that operates between You and the Company. These Terms and Conditions
set out the rights and obligations of all users regarding the use of the
Service.

Your access to and use of the Service is conditioned on Your acceptance of and
compliance with these Terms and Conditions. These Terms and Conditions apply
to all visitors, users and others who access or use the Service.

By accessing or using the Service You agree to be bound by these Terms and
Conditions. If You disagree with any part of these Terms and Conditions then
You may not access the Service.
`;
  
  const content = (process.env.NEXT_PUBLIC_TERMS_AND_CONDITIONS || genericPolicy).replace(/\[Store Name\]/g, storeName);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8 text-center">
        Terms and Conditions
      </h1>
      <div className="max-w-4xl mx-auto text-muted-foreground whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
        {content}
      </div>
    </div>
  );
}
