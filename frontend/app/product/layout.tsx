import Navbar from "@/components/Navbar";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar type="BUYER" />
      <div className="pt-16"> 
        {children}
      </div>
    </div>
  );
}
