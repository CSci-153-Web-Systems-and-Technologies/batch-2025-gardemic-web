'use client'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-aclonica">
        {children}
    </div>
  );
}
