import Image from "next/image";

export default function LogoImg() {
  return (
    <div className="flex justify-center bg-primary p-4 rounded">
      <Image
        src={
          "https://lirp.cdn-website.com/d0f7b8b4/dms3rep/multi/opt/Kopi+af+Kopi+af+Kopi+af+Kopi+af+Kopi+af+Kopi+af+paint+%282500+x+1080+px%29+%282500+x+2000+px%29+%282500+x+800+px%29+%282500+x+300+px%29+%282000+x+300+px%29+%282%29-1920w.png"
        }
        alt={"logo"}
        width={150}
        height={22}
      />
    </div>
  );
}
