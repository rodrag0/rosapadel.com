interface BrandTextProps {
  text: string;
  brandClassName?: string;
}

export default function BrandText({ text, brandClassName = "font-bold text-primary" }: BrandTextProps) {
  const parts = text.split(/(rosa)/gi);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === "rosa" ? (
          <span key={`${part}-${index}`} className={brandClassName}>
            rosa
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
