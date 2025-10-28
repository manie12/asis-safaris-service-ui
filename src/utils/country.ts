const residencyMap: Record<string, string> = {
  KE: 'Kenya',
  TZ: 'Tanzania',
  UG: 'Uganda',
  US: 'United States',
  GB: 'United Kingdom'
};

export const resolveCountryName = (code: string) => residencyMap[code.toUpperCase()] ?? code;

export const isEastAfricaResident = (code: string) => ['KE', 'TZ', 'UG'].includes(code.toUpperCase());
