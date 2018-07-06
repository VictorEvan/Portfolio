const titleCase = (str, mode) => {
  let regex = /(^|\s|-)\S/g;
  if (mode === "link") {
    return str.toLowerCase().replace(regex, (L) => L.toUpperCase());
  } else if (mode === "title") {
    return str.toLowerCase().replace(regex, (L) => L.startsWith("-") ? ` ${L.charAt(1).toUpperCase()}` : L.toUpperCase());
  }
}

export default titleCase;