import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/components/rosa/LanguageProvider";

const NotFound = () => {
  const location = useLocation();
  const { copy } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{copy.notFound.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{copy.notFound.body}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {copy.notFound.cta}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
