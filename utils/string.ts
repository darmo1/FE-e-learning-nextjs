export const stringHyphenated = (text: string): string => {
    return text.replace(/\s+/g, "-").toLowerCase().trim();
  };
  
  export const fromHyphenatedToString = (text: string): string => {
    return text.replace(/-/g, " ").trim();
  };

  export function replaceTokenUrl(template: string, ...args: (string | number)[]): string {
    return template.replace(/{(\d+)}/g, (_, index) => {
      const value = args[Number(index)];
      if (value === undefined) {
        throw new Error(`No argument provided for token {${index}}`);
      }
      return String(value);
    });
  }
  
  