import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactUsPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Our Store';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS;

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone,
      href: `tel:${phone}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: address,
      href: '#',
    },
  ].filter(item => item.value);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We'd love to hear from you! Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.
        </p>
      </div>

      {contactInfo.length > 0 ? (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">{storeName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold leading-6 text-foreground">{item.label}</h3>
                    <p className="mt-1 text-base text-muted-foreground">
                      {item.href.startsWith('mailto:') || item.href.startsWith('tel:') ? (
                        <a href={item.href} className="hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-muted-foreground bg-muted/50 p-8 rounded-lg">
          <p>Contact information is not available.</p>
          <p className="text-sm mt-2">Please configure the contact details in the environment file.</p>
        </div>
      )}
    </div>
  );
}
