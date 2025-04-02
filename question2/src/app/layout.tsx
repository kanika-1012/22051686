// question2/src/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import Navigation from 'components/Navigation';

export const metadata: Metadata = {
  title: 'Social Media Analytics',
  description: 'Real-time analytics for social media data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}