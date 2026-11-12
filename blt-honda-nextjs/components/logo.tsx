import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="BLT Honda Özel Servis"
      width={400}
      height={80}
      className="h-12 w-auto object-contain hover:opacity-90 transition-opacity"
      priority
    />
  );
}