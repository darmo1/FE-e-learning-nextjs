export const stringHyphenated = (text: string): string => {
    return text.replace(/\s+/g, "-").toLowerCase().trim();
  };
  
  export const fromHyphenatedToString = (text: string): string => {
    return text.replace(/-/g, " ").trim();
  };
  