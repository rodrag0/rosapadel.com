import { Maximize2, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLanguage } from "./LanguageProvider";
import { productPresentation, productScreens } from "@/lib/productScreens";

type Screen = keyof typeof productScreens;

export default function AppScreenshot({
  screen,
  className = "",
  mobile = false,
  responsive = false,
  priority = false,
  caption = true,
}: {
  screen: Screen;
  className?: string;
  mobile?: boolean;
  responsive?: boolean;
  priority?: boolean;
  caption?: boolean;
}) {
  const { language } = useLanguage();
  const copy = productPresentation[language];
  const item = productScreens[screen];
  const source = mobile ? item.mobile : item.desktop;
  const visual = (enlarged = false) => (
    <picture>
      {responsive && <source media="(max-width: 700px)" srcSet={item.mobile} />}
      <img
        src={source}
        alt={item.name}
        width={mobile ? 585 : 2160}
        height={mobile ? 1170 : 1440}
        loading={priority || enlarged ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
  return (
    <figure
      className={`product-screen ${mobile ? "product-screen-mobile" : ""} ${responsive ? "product-screen-responsive" : ""} ${className}`}
    >
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="product-screen-open"
            aria-label={`${copy.enlarge}: ${item.name}`}
            title={copy.enlarge}
          >
            {visual()}
            <span className="product-screen-zoom">
              <Maximize2 size={18} aria-hidden="true" />
            </span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="product-viewer-overlay" />
          <Dialog.Content className="product-viewer">
            <header>
              <div>
                <Dialog.Title>{item.name}</Dialog.Title>
                <Dialog.Description>{copy.appCaption}</Dialog.Description>
              </div>
              <Dialog.Close
                className="product-viewer-close"
                aria-label={copy.close}
                title={copy.close}
              >
                <X size={22} />
              </Dialog.Close>
            </header>
            <div className="product-viewer-image">{visual(true)}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {caption && <figcaption>{copy.appCaption}</figcaption>}
    </figure>
  );
}
