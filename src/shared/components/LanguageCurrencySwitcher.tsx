import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import { useTenant } from '@/hooks/useTenant';
import { currencyFormatter } from '@/i18n/currency';

const supportedCurrencies = ['USD', 'EUR', 'KES'] as const;

type Currency = (typeof supportedCurrencies)[number];

const LanguageCurrencySwitcher = () => {
  const { i18n } = useTranslation();
  const { countryCode, switchTenant } = useTenant();

  const supportedLanguages = Array.isArray(i18n.options.supportedLngs)
    ? (i18n.options.supportedLngs as string[])
    : [i18n.language];

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng);
  };

  const changeCurrency = (currency: Currency) => {
    // Placeholder: tie into pricing preferences.
    currencyFormatter(0, currency);
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Select
        size="small"
        value={i18n.language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        {supportedLanguages.map((lng) => (
          <MenuItem key={lng} value={lng}>
            {lng.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
      <Select
        size="small"
        value={countryCode}
        onChange={(event) => switchTenant(event.target.value)}
      >
        <MenuItem value="KE">Kenya</MenuItem>
        <MenuItem value="TZ">Tanzania</MenuItem>
        <MenuItem value="UG">Uganda</MenuItem>
      </Select>
      <Select
        size="small"
        defaultValue="USD"
        onChange={(event) => changeCurrency(event.target.value as Currency)}
      >
        {supportedCurrencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageCurrencySwitcher;
