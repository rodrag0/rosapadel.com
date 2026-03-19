export function getSectionHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

