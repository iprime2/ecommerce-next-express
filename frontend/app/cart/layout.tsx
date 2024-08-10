import Navbar from "@/components/Navbar";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar type="BUYER" />
      <div className="pt-16"> 
        {children}
      </div>
    </main>
  );
}
