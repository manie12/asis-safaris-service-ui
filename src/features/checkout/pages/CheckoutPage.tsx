import { Fragment, useMemo, useState, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { DSButton } from '@/design-system/components/DSButton';
import checkoutPageStyles, {
  checkoutPageMobileStyles,
  checkoutPageMobileProgressStyles,
} from '@/design-system/theme/checkoutPageStyles';
import { colorTokens, radiusTokens, spacingTokens } from '@/design-system/theme/tokens';
import WizardProgressBar from '@/shared/components/WizardProgressBar';

import { useCreateBooking } from '../api/useCreateBooking';
import { useStageDocs } from '../api/useStageDocs';

type CheckoutStep = 'contact' | 'payment' | 'confirmation';

type Traveler = {
  id: string;
  fullName: string;
  dob: string;
  passport: string;
  isLead?: boolean;
};

type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type TermsState = {
  booking: boolean;
  cancellation: boolean;
  privacy: boolean;
};

type CardDetails = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type BillingDetails = {
  country: string;
  city: string;
  address: string;
  postalCode: string;
};

const stepOrder: CheckoutStep[] = ['contact', 'payment', 'confirmation'];

const stepLabels: Record<CheckoutStep, string> = {
  contact: 'Contact & Travelers',
  payment: 'Payment',
  confirmation: 'Confirmation',
};

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free'] as const;

const roomPreferences = [
  { id: 'twin', label: 'Twin beds (2 separate beds)' },
  { id: 'double', label: 'Double bed (1 large bed)' },
  { id: 'separate', label: 'Separate rooms' },
];

const specialOccasions = [
  { id: 'none', label: 'None' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'other', label: 'Other celebration' },
];

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCardRoundedIcon },
  { id: 'bank', label: 'Bank Transfer', icon: AccountBalanceRoundedIcon },
  { id: 'installment', label: 'Installment Plan', icon: PaymentsRoundedIcon },
];

const totalAmount = 12180;
const depositAmount = 2500;

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('contact');

  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
  });

  const [travelers, setTravelers] = useState<Traveler[]>([
    {
      id: 'traveler-1',
      fullName: 'Sarah Johnson',
      dob: '1985-03-15',
      passport: '',
      isLead: true,
    },
    {
      id: 'traveler-2',
      fullName: '',
      dob: '',
      passport: '',
    },
  ]);

  const [roomPreference, setRoomPreference] = useState(roomPreferences[0]?.id ?? '');
  const [dietarySelections, setDietarySelections] = useState<string[]>([]);
  const [specialOccasion, setSpecialOccasion] = useState('none');
  const [photographyService, setPhotographyService] = useState(false);
  const [additionalRequests, setAdditionalRequests] = useState('');

  const [termsAccepted, setTermsAccepted] = useState<TermsState>({
    booking: false,
    cancellation: false,
    privacy: false,
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'installment'>('card');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardName: 'Sarah Johnson',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    country: 'United States',
    city: '',
    address: '',
    postalCode: '',
  });
  const [payDepositOnly, setPayDepositOnly] = useState(false);
  const [agreePaymentTerms, setAgreePaymentTerms] = useState(false);
  const [isSummaryDrawerOpen, setSummaryDrawerOpen] = useState(false);

  const createBooking = useCreateBooking();
  const stageDocs = useStageDocs();

  const currentIndex = stepOrder.indexOf(currentStep);

  const heroSteps = useMemo(
    () =>
      stepOrder.map((step, index) => ({
        id: step,
        label: stepLabels[step],
        number: index + 1,
        status: index < currentIndex ? 'completed' : index === currentIndex ? 'active' : 'upcoming',
      })),
    [currentIndex],
  );

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

  const isContactStepValid =
    contactDetails.firstName.trim() !== '' &&
    contactDetails.lastName.trim() !== '' &&
    contactDetails.email.trim() !== '' &&
    contactDetails.phone.trim() !== '' &&
    travelers.every((traveler) => traveler.fullName.trim() && traveler.dob.trim()) &&
    allTermsAccepted;

  const isPaymentStepValid =
    (paymentMethod !== 'card' ||
      (cardDetails.cardName.trim() &&
        cardDetails.cardNumber.replace(/\s+/g, '').length >= 12 &&
        cardDetails.expiry.trim() &&
        cardDetails.cvc.trim().length >= 3)) &&
    billingDetails.country.trim() &&
    billingDetails.city.trim() &&
    billingDetails.address.trim() &&
    billingDetails.postalCode.trim() &&
    agreePaymentTerms;

  const isPrimaryActionEnabled =
    currentStep === 'contact'
      ? isContactStepValid
      : currentStep === 'payment'
      ? isPaymentStepValid
      : !createBooking.isPending;

  const primaryActionLabel =
    currentStep === 'contact'
      ? 'Proceed to Payment'
      : currentStep === 'payment'
      ? 'Review & Confirm'
      : createBooking.isPending
      ? 'Processing...'
      : 'Confirm Booking';

  const secondaryActionLabel = currentStep === 'contact' ? null : 'Back';

  const payableAmount = currentStep === 'payment' && payDepositOnly ? depositAmount : totalAmount;

  const openSummaryDrawer = () => setSummaryDrawerOpen(true);
  const closeSummaryDrawer = () => setSummaryDrawerOpen(false);

  const handlePrimaryAction = async () => {
    if (currentStep === 'contact') {
      setCurrentStep('payment');
      return;
    }

    if (currentStep === 'payment') {
      setCurrentStep('confirmation');
      return;
    }

    if (currentStep === 'confirmation') {
      await handleSubmit();
    }
  };

  const handleSecondaryAction = () => {
    if (currentStep === 'contact') {
      return;
    }

    const previousIndex = Math.max(currentIndex - 1, 0);
    setCurrentStep(stepOrder[previousIndex]);
  };

  const handleSubmit = async () => {
    await createBooking.mutateAsync({
      travelers: travelers.map((traveler) => ({
        fullName: traveler.fullName,
        dateOfBirth: traveler.dob,
        passportNumber: traveler.passport,
        isLead: traveler.isLead ?? false,
      })),
      contactPreferences: {
        email: contactDetails.email,
        phone: contactDetails.phone,
        preferredChannel: 'email',
      },
    });
  };

  const handleDocsUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('documents', file));
    await stageDocs.mutateAsync(formData);
  };

  const handleContactChange = (field: keyof ContactDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setContactDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleTravelerChange = (travelerId: string, field: keyof Traveler) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTravelers((prev) =>
        prev.map((traveler) =>
          traveler.id === travelerId
            ? {
                ...traveler,
                [field]: value,
              }
            : traveler,
        ),
      );
    };

  const toggleDietarySelection = (option: string) => {
    setDietarySelections((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const togglePhotographyService = () => {
    setPhotographyService((prev) => !prev);
  };

  const handleTermToggle = (key: keyof TermsState) => (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted((prev) => ({ ...prev, [key]: event.target.checked }));
  };

  const handlePaymentMethodChange = (method: typeof paymentMethod) => {
    setPaymentMethod(method);
    if (method !== 'card') {
      setPayDepositOnly(false);
    }
  };

  const handleCardInputChange = (field: keyof CardDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setCardDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleBillingChange = (field: keyof BillingDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setBillingDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const renderHero = () => (
    <Box component="section" sx={checkoutPageStyles.heroSection}>
      <Box sx={checkoutPageStyles.heroContainer}>
        <Typography component="h1" sx={checkoutPageStyles.heroTitle}>
          Complete Your Booking
        </Typography>
        <Typography sx={checkoutPageStyles.heroDescription}>
          You&apos;re just a few steps away from your dream safari adventure.
        </Typography>
        <Box sx={checkoutPageStyles.heroProgressWrap}>
          {heroSteps.map((step, index) => (
            <Fragment key={step.id}>
              <Box sx={checkoutPageStyles.heroProgressStep}>
                <Box
                  sx={{
                    ...checkoutPageStyles.heroProgressNode,
                    backgroundColor:
                      step.status === 'completed'
                        ? colorTokens.safari[500]
                        : step.status === 'active'
                        ? colorTokens.safari[500]
                        : 'rgba(214,198,178,0.6)',
                    color:
                      step.status === 'upcoming'
                        ? 'rgba(74,57,42,0.7)'
                        : colorTokens.neutral.white,
                  }}
                >
                  {step.status === 'completed' ? '✓' : step.number}
                </Box>
                <Typography fontSize={13} fontWeight={step.status === 'upcoming' ? 500 : 600} color={step.status === 'upcoming' ? 'rgba(74,57,42,0.6)' : colorTokens.safari[700]}>
                  {stepLabels[step.id]}
                </Typography>
              </Box>
              {index < heroSteps.length - 1 ? (
                <Box
                  sx={{
                    width: 64,
                    height: 4,
                    borderRadius: 999,
                    backgroundColor: index < currentIndex ? colorTokens.safari[500] : 'rgba(214,198,178,0.6)',
                  }}
                />
              ) : null}
            </Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );

  const renderContactStep = () => (
    <Stack spacing={spacingTokens.lg} sx={checkoutPageStyles.formStack}>
      <Box sx={checkoutPageStyles.card}>
        <Box sx={checkoutPageStyles.sectionHeader}>
          <Box sx={{ display: 'inline-flex', padding: spacingTokens.sm, borderRadius: radiusTokens.md, backgroundColor: 'rgba(238,92,40,0.12)', color: colorTokens.safari[600] }}>
            <PersonRoundedIcon />
          </Box>
          <Typography component="h2" sx={checkoutPageStyles.sectionTitle}>
            Contact Details
          </Typography>
        </Box>
        <Box sx={checkoutPageStyles.inputGridTwo}>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="first-name">
              First Name *
            </Typography>
            <Box
              component="input"
              id="first-name"
              type="text"
              value={contactDetails.firstName}
              onChange={handleContactChange('firstName')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="last-name">
              Last Name *
            </Typography>
            <Box
              component="input"
              id="last-name"
              type="text"
              value={contactDetails.lastName}
              onChange={handleContactChange('lastName')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="email">
              Email Address *
            </Typography>
            <Box
              component="input"
              id="email"
              type="email"
              value={contactDetails.email}
              onChange={handleContactChange('email')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="phone">
              Phone Number *
            </Typography>
            <Box
              component="input"
              id="phone"
              type="tel"
              value={contactDetails.phone}
              onChange={handleContactChange('phone')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Box sx={{ ...checkoutPageStyles.sectionHeader, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.md }}>
            <Box sx={{ display: 'inline-flex', padding: spacingTokens.sm, borderRadius: radiusTokens.md, backgroundColor: 'rgba(238,92,40,0.12)', color: colorTokens.safari[600] }}>
              <GroupRoundedIcon />
            </Box>
            <Typography component="h2" sx={checkoutPageStyles.sectionTitle}>
              Traveler Information
            </Typography>
          </Box>
          <Typography sx={checkoutPageStyles.pill}>2 Travelers</Typography>
        </Box>
        <Stack spacing={spacingTokens.md}>
          {travelers.map((traveler, index) => (
            <Box key={traveler.id} sx={checkoutPageStyles.travelerCard}>
              <Typography fontWeight={600} color={colorTokens.earth[700]}>
                Traveler {index + 1} {traveler.isLead ? '(Lead Guest)' : ''}
              </Typography>
              <Box sx={checkoutPageStyles.inputGridThree}>
                <Box>
                  <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor={`${traveler.id}-name`}>
                    Full Name *
                  </Typography>
                  <Box
                    component="input"
                    id={`${traveler.id}-name`}
                    type="text"
                    placeholder="Enter full name"
                    value={traveler.fullName}
                    onChange={handleTravelerChange(traveler.id, 'fullName')}
                    sx={checkoutPageStyles.inputControl}
                  />
                </Box>
                <Box>
                  <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor={`${traveler.id}-dob`}>
                    Date of Birth *
                  </Typography>
                  <Box
                    component="input"
                    id={`${traveler.id}-dob`}
                    type="date"
                    value={traveler.dob}
                    onChange={handleTravelerChange(traveler.id, 'dob')}
                    sx={checkoutPageStyles.inputControl}
                  />
                </Box>
                <Box>
                  <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor={`${traveler.id}-passport`}>
                    Passport Number
                  </Typography>
                  <Box
                    component="input"
                    id={`${traveler.id}-passport`}
                    type="text"
                    placeholder="Upload later option available"
                    value={traveler.passport}
                    onChange={handleTravelerChange(traveler.id, 'passport')}
                    sx={checkoutPageStyles.inputControl}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Box sx={checkoutPageStyles.sectionHeader}>
          <Box sx={{ display: 'inline-flex', padding: spacingTokens.sm, borderRadius: radiusTokens.md, backgroundColor: 'rgba(238,92,40,0.12)', color: colorTokens.safari[600] }}>
            <StarRoundedIcon />
          </Box>
          <Typography component="h2" sx={checkoutPageStyles.sectionTitle}>
            Special Requests
          </Typography>
        </Box>

        <Box>
          <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="room-preference">
            Room Preferences
          </Typography>
          <Box
            component="select"
            id="room-preference"
            value={roomPreference}
            onChange={(event) => setRoomPreference(event.target.value)}
            sx={checkoutPageStyles.inputControl}
          >
            {roomPreferences.map((option) => (
              <Box key={option.id} component="option" value={option.id}>
                {option.label}
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography component="span" sx={checkoutPageStyles.inputLabel}>
            Dietary Requirements
          </Typography>
          <Box sx={checkoutPageStyles.checkboxRow}>
            {dietaryOptions.map((option) => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
                <input
                  type="checkbox"
                  checked={dietarySelections.includes(option)}
                  onChange={() => toggleDietarySelection(option)}
                  style={{ width: 16, height: 16 }}
                />
                {option}
              </label>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="special-occasion">
            Special Occasions
          </Typography>
          <Box
            component="select"
            id="special-occasion"
            value={specialOccasion}
            onChange={(event) => setSpecialOccasion(event.target.value)}
            sx={checkoutPageStyles.inputControl}
          >
            {specialOccasions.map((option) => (
              <Box key={option.id} component="option" value={option.id}>
                {option.label}
              </Box>
            ))}
          </Box>
        </Box>

        <label style={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
          <input type="checkbox" checked={photographyService} onChange={togglePhotographyService} style={{ width: 16, height: 16 }} />
          Add professional safari photographer (+$450)
        </label>

        <Box>
          <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="additional-requests">
            Additional Requests
          </Typography>
          <Box
            component="textarea"
            id="additional-requests"
            value={additionalRequests}
            onChange={(event) => setAdditionalRequests(event.target.value)}
            placeholder="Any other special requests or requirements..."
            sx={{ ...checkoutPageStyles.inputControl, ...checkoutPageStyles.textareaControl }}
          />
        </Box>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Box sx={checkoutPageStyles.sectionHeader}>
          <Box sx={{ display: 'inline-flex', padding: spacingTokens.sm, borderRadius: radiusTokens.md, backgroundColor: 'rgba(238,92,40,0.12)', color: colorTokens.safari[600] }}>
            <UploadFileRoundedIcon />
          </Box>
          <Typography component="h2" sx={checkoutPageStyles.sectionTitle}>
            Documents &amp; ID Verification
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacingTokens.md }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: spacingTokens.xs, backgroundColor: 'rgba(191,219,254,0.35)', border: '1px solid rgba(96,165,250,0.4)', borderRadius: 1, padding: spacingTokens.sm }}>
            <InfoOutlinedIcon sx={{ fontSize: 18, color: '#2563eb', marginTop: 0.5 }} />
            <Box>
              <Typography fontSize={13} fontWeight={600} color="#1d4ed8">
                Optional – Upload Later
              </Typography>
              <Typography fontSize={12} color="#1e3a8a" marginTop={0.5}>
                You can upload these documents now or we&apos;ll send a secure link after booking.
              </Typography>
            </Box>
          </Box>

          <Box sx={checkoutPageStyles.inputGridTwo}>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel}>
                Residency Verification (for discounts)
              </Typography>
              <Box component="label" sx={checkoutPageStyles.uploadZone}>
                <CloudUploadRoundedIcon sx={{ fontSize: 28, color: 'rgba(120,113,108,0.8)', marginBottom: spacingTokens.xs }} />
                <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                  Click to upload or drag &amp; drop
                </Typography>
                <Typography fontSize={11} color="rgba(74,57,42,0.6)" marginTop={0.5}>
                  ID, Passport, or Utility Bill
                </Typography>
                <Box
                  component="input"
                  type="file"
                  hidden
                  onChange={(event) => handleDocsUpload(event.target.files)}
                />
              </Box>
            </Box>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel}>
                Passport Copies
              </Typography>
              <Box component="label" sx={checkoutPageStyles.uploadZone}>
                <CloudUploadRoundedIcon sx={{ fontSize: 28, color: 'rgba(120,113,108,0.8)', marginBottom: spacingTokens.xs }} />
                <Typography fontSize={13} color="rgba(74,57,42,0.7)">
                  Click to upload or drag &amp; drop
                </Typography>
                <Typography fontSize={11} color="rgba(74,57,42,0.6)" marginTop={0.5}>
                  Required for park entry
                </Typography>
                <Box
                  component="input"
                  type="file"
                  hidden
                  onChange={(event) => handleDocsUpload(event.target.files)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Typography fontWeight={600} color={colorTokens.earth[800]}>
          Booking Agreements
        </Typography>
        <Stack spacing={spacingTokens.sm} sx={checkoutPageStyles.termsStack}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
            <input type="checkbox" checked={termsAccepted.booking} onChange={handleTermToggle('booking')} style={{ marginTop: 4 }} />
            <span>
              I agree to the <span style={{ color: colorTokens.safari[600], textDecoration: 'underline', cursor: 'pointer' }}>Terms &amp; Conditions</span> and <span style={{ color: colorTokens.safari[600], textDecoration: 'underline', cursor: 'pointer' }}>Booking Policy</span>.
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
            <input type="checkbox" checked={termsAccepted.cancellation} onChange={handleTermToggle('cancellation')} style={{ marginTop: 4 }} />
            <span>
              I understand the <span style={{ color: colorTokens.safari[600], textDecoration: 'underline', cursor: 'pointer' }}>Cancellation Policy</span> and refund terms.
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
            <input type="checkbox" checked={termsAccepted.privacy} onChange={handleTermToggle('privacy')} style={{ marginTop: 4 }} />
            <span>
              I agree to the <span style={{ color: colorTokens.safari[600], textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span> and data processing terms.
            </span>
          </label>
        </Stack>
      </Box>
    </Stack>
  );

  const renderPaymentStep = () => (
    <Stack spacing={spacingTokens.lg} sx={checkoutPageStyles.formStack}>
      <Box sx={checkoutPageStyles.card}>
        <Box sx={checkoutPageStyles.sectionHeader}>
          <Box sx={{ display: 'inline-flex', padding: spacingTokens.sm, borderRadius: radiusTokens.md, backgroundColor: 'rgba(238,92,40,0.12)', color: colorTokens.safari[600] }}>
            <CreditCardRoundedIcon />
          </Box>
          <Typography component="h2" sx={checkoutPageStyles.sectionTitle}>
            Choose Payment Method
          </Typography>
        </Box>
        <Stack spacing={spacingTokens.sm}>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            return (
              <Box
                key={method.id}
                component="button"
                type="button"
                onClick={() => handlePaymentMethodChange(method.id as typeof paymentMethod)}
                aria-pressed={isSelected}
                sx={{
                  border: `1px solid ${isSelected ? colorTokens.safari[400] : 'rgba(214,198,178,0.6)' }`,
                  borderRadius: radiusTokens.lg,
                  padding: spacingTokens.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: spacingTokens.md,
                  backgroundColor: isSelected ? 'rgba(255,247,237,0.9)' : 'rgba(255,255,255,0.92)',
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
                  <Icon sx={{ fontSize: 24, color: colorTokens.safari[600] }} />
                  <Typography fontWeight={600} color={colorTokens.earth[800]}>
                    {method.label}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? colorTokens.safari[500] : 'rgba(214,198,178,0.8)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? colorTokens.safari[500] : 'transparent',
                  }}
                >
                  {isSelected ? <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colorTokens.neutral.white }} /> : null}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {paymentMethod === 'card' ? (
        <Box sx={checkoutPageStyles.card}>
          <Typography fontWeight={600} color={colorTokens.earth[800]}>
            Card Details
          </Typography>
          <Box sx={checkoutPageStyles.inputGridTwo}>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="card-name">
                Name on Card
              </Typography>
              <Box
                component="input"
                id="card-name"
                type="text"
                value={cardDetails.cardName}
                onChange={handleCardInputChange('cardName')}
                sx={checkoutPageStyles.inputControl}
              />
            </Box>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="card-number">
                Card Number
              </Typography>
              <Box
                component="input"
                id="card-number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange('cardNumber')}
                sx={checkoutPageStyles.inputControl}
              />
            </Box>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="card-expiry">
                Expiry Date
              </Typography>
              <Box
                component="input"
                id="card-expiry"
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardInputChange('expiry')}
                sx={checkoutPageStyles.inputControl}
              />
            </Box>
            <Box>
              <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="card-cvc">
                Security Code
              </Typography>
              <Box
                component="input"
                id="card-cvc"
                type="text"
                placeholder="CVC"
                value={cardDetails.cvc}
                onChange={handleCardInputChange('cvc')}
                sx={checkoutPageStyles.inputControl}
              />
            </Box>
          </Box>
          <label style={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
            <input type="checkbox" checked={payDepositOnly} onChange={(event) => setPayDepositOnly(event.target.checked)} style={{ width: 16, height: 16 }} />
            Pay deposit only now (${depositAmount.toLocaleString()})
          </label>
        </Box>
      ) : (
        <Box sx={checkoutPageStyles.card}>
          <Typography fontWeight={600} color={colorTokens.earth[800]}>
            Payment Instructions
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.7)">
            We&apos;ll send detailed {paymentMethod === 'bank' ? 'bank transfer instructions' : 'installment plan options'} to your email after confirming availability.
          </Typography>
        </Box>
      )}

      <Box sx={checkoutPageStyles.card}>
        <Typography fontWeight={600} color={colorTokens.earth[800]}>
          Billing Details
        </Typography>
        <Box sx={checkoutPageStyles.inputGridTwo}>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="billing-country">
              Country
            </Typography>
            <Box
              component="input"
              id="billing-country"
              type="text"
              value={billingDetails.country}
              onChange={handleBillingChange('country')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="billing-city">
              City
            </Typography>
            <Box
              component="input"
              id="billing-city"
              type="text"
              value={billingDetails.city}
              onChange={handleBillingChange('city')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="billing-address">
              Address
            </Typography>
            <Box
              component="input"
              id="billing-address"
              type="text"
              value={billingDetails.address}
              onChange={handleBillingChange('address')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
          <Box>
            <Typography component="label" sx={checkoutPageStyles.inputLabel} htmlFor="billing-postal">
              Postal Code
            </Typography>
            <Box
              component="input"
              id="billing-postal"
              type="text"
              value={billingDetails.postalCode}
              onChange={handleBillingChange('postalCode')}
              sx={checkoutPageStyles.inputControl}
            />
          </Box>
        </Box>
        <label style={{ display: 'flex', alignItems: 'center', gap: spacingTokens.xs, fontSize: 13, color: colorTokens.earth[700] }}>
          <input type="checkbox" checked={agreePaymentTerms} onChange={(event) => setAgreePaymentTerms(event.target.checked)} style={{ width: 16, height: 16 }} />
          I authorise payment and agree to the secure processing of my information.
        </label>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Typography fontWeight={600} color={colorTokens.earth[800]}>
          Security &amp; Privacy
        </Typography>
        <Stack spacing={spacingTokens.sm}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
            <LockRoundedIcon sx={{ color: colorTokens.safari[600] }} />
            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
              Transactions secured with industry-standard SSL encryption.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
            <ShieldRoundedIcon sx={{ color: colorTokens.safari[600] }} />
            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
              Flexible cancellation policy with partial refunds up to 30 days prior.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );

  const renderConfirmationStep = () => (
    <Stack spacing={spacingTokens.lg} sx={checkoutPageStyles.formStack}>
      <Box sx={checkoutPageStyles.confirmationBanner}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
          <CheckCircleRoundedIcon sx={{ fontSize: 32, color: '#16a34a' }} />
          <Typography component="h2" fontFamily={'"Playfair Display", serif'} fontSize={26} fontWeight={700} color={colorTokens.earth[800]}>
            Final Step – Confirm Your Safari
          </Typography>
        </Box>
        <Typography fontSize={14} color="rgba(74,57,42,0.75)">
          Review your trip details and confirm your booking. We&apos;ll send a detailed itinerary and payment receipt immediately after confirmation.
        </Typography>
      </Box>

      <Box sx={checkoutPageStyles.card}>
        <Typography fontWeight={600} color={colorTokens.earth[800]}>
          Booking Overview
        </Typography>
        <Stack spacing={spacingTokens.sm}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
            <FlightTakeoffRoundedIcon sx={{ color: colorTokens.safari[600] }} />
            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
              Ultimate Kenya &amp; Tanzania Safari
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
            <CalendarMonthRoundedIcon sx={{ color: colorTokens.safari[600] }} />
            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
              July 15 – 25, 2024 • 10 days / 9 nights
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacingTokens.sm }}>
            <GroupRoundedIcon sx={{ color: colorTokens.safari[600] }} />
            <Typography fontSize={13} color="rgba(74,57,42,0.7)">
              {travelers.length} Traveler{travelers.length > 1 ? 's' : ''} – {roomPreferences.find((item) => item.id === roomPreference)?.label ?? 'Room requested'}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: spacingTokens.sm, borderColor: 'rgba(210,195,176,0.4)' }} />
        <Typography fontWeight={600} color={colorTokens.earth[800]}>
          Traveler List
        </Typography>
        <Stack spacing={spacingTokens.xs}>
          {travelers.map((traveler) => (
            <Typography key={traveler.id} fontSize={13} color="rgba(74,57,42,0.75)">
              • {traveler.fullName || 'Pending name'} — DOB: {traveler.dob || '—'}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Box sx={checkoutPageStyles.confirmationGrid}>
        <Box sx={checkoutPageStyles.confirmationCard}>
          <Typography fontWeight={600} color={colorTokens.earth[800]}>
            Contact Details
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.75)">
            {contactDetails.firstName} {contactDetails.lastName}
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.75)">
            <MailRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }} />
            {contactDetails.email}
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.75)">
            <PhoneRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }} />
            {contactDetails.phone}
          </Typography>
        </Box>
        <Box sx={checkoutPageStyles.confirmationCard}>
          <Typography fontWeight={600} color={colorTokens.earth[800]}>
            Payment Summary
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.75)">
            Method: {paymentMethods.find((method) => method.id === paymentMethod)?.label ?? 'Card'}
          </Typography>
          <Typography fontSize={13} color="rgba(74,57,42,0.75)">
            {payDepositOnly ? `Deposit due today: $${depositAmount.toLocaleString()}` : `Amount due: $${totalAmount.toLocaleString()}`}
          </Typography>
          <Typography fontSize={12} color="rgba(74,57,42,0.65)">
            Remaining balance will be invoiced 45 days prior to departure.
          </Typography>
        </Box>
      </Box>
    </Stack>
  );

  const renderSummaryDetails = (variant: 'desktop' | 'mobile' = 'desktop') => (
    <Stack spacing={spacingTokens.xs}>
      <Box>
        <Typography fontWeight={600} color={colorTokens.earth[700]}>
          Ultimate Kenya &amp; Tanzania Safari
        </Typography>
        <Typography fontSize={13} color="rgba(74,57,42,0.65)">
          July 15 – 25, 2024 (10 days)
        </Typography>
        <Typography fontSize={13} color="rgba(74,57,42,0.65)">
          2 Adults
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(210,195,176,0.5)' }} />
      <Stack spacing={spacingTokens.xs}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(74,57,42,0.7)' }}>
          <span>Safari package (2 guests)</span>
          <span>$11,780</span>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(74,57,42,0.7)' }}>
          <span>Park fees &amp; permits</span>
          <span>$680</span>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(74,57,42,0.7)' }}>
          <span>Government taxes</span>
          <span>$320</span>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
          <span>Package discount</span>
          <span>- $600</span>
        </Box>
      </Stack>
      <Box
        sx={
          variant === 'desktop'
            ? checkoutPageStyles.summaryTotal
            : checkoutPageMobileStyles.summaryDrawerTotal
        }
      >
        <Box>
          <Typography fontWeight={700} color={colorTokens.earth[800]}>
            {currentStep === 'payment' && payDepositOnly ? 'Deposit Due' : 'Total Amount'}
          </Typography>
          <Typography fontSize={11} color="rgba(74,57,42,0.6)">
            All taxes and fees included
          </Typography>
        </Box>
        <Typography
          fontWeight={700}
          color={colorTokens.safari[600]}
          fontSize={variant === 'desktop' ? 28 : undefined}
          sx={variant === 'mobile' ? checkoutPageMobileStyles.summaryDrawerAmount : undefined}
        >
          ${payableAmount.toLocaleString()}
        </Typography>
      </Box>
    </Stack>
  );

  const renderSupportButtons = (variant: 'desktop' | 'mobile') => (
    <Stack spacing={spacingTokens.xs}>
      <DSButton
        fullWidth
        startIcon={<WhatsAppIcon sx={{ fontSize: 18 }} />}
        sx={{
          justifyContent: 'center',
          backgroundImage: 'none',
          backgroundColor: '#22c55e',
          color: colorTokens.neutral.white,
          '&:hover': {
            backgroundColor: '#16a34a',
          },
        }}
      >
        WhatsApp Support
      </DSButton>
      <DSButton
        fullWidth
        tone="outline"
        startIcon={<PhoneRoundedIcon sx={{ fontSize: 16 }} />}
        sx={{ justifyContent: 'center' }}
      >
        Call +254 700 123 456
      </DSButton>
      {variant === 'mobile' ? (
        <DSButton
          fullWidth
          tone="ghost"
          startIcon={<MailRoundedIcon sx={{ fontSize: 16 }} />}
          sx={{
            justifyContent: 'center',
            backgroundImage: 'none',
            color: colorTokens.safari[600],
            '&:hover': {
              backgroundColor: 'rgba(238,92,40,0.08)',
            },
          }}
        >
          Email travel@asissafari.com
        </DSButton>
      ) : null}
    </Stack>
  );

  const renderSummaryCard = () => (
    <Box sx={checkoutPageStyles.summaryCard}>
      <Typography component="h3" fontFamily={'"Playfair Display", serif'} fontSize={22} fontWeight={700} color={colorTokens.earth[800]}>
        Booking Summary
      </Typography>
      {renderSummaryDetails('desktop')}
      <DSButton
        fullWidth
        startIcon={<LockRoundedIcon sx={{ fontSize: 18 }} />}
        onClick={handlePrimaryAction}
        disabled={!isPrimaryActionEnabled}
        sx={{ opacity: isPrimaryActionEnabled ? 1 : 0.7 }}
      >
        {primaryActionLabel}
      </DSButton>
      {secondaryActionLabel ? (
        <DSButton fullWidth tone="outline" onClick={handleSecondaryAction}>
          {secondaryActionLabel}
        </DSButton>
      ) : null}
      <Typography fontSize={11} textAlign="center" color="rgba(74,57,42,0.6)">
        <ShieldRoundedIcon sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }} />
        Secure SSL encryption
      </Typography>
      <Box sx={checkoutPageStyles.helpStack}>
        <Typography fontWeight={600} color={colorTokens.earth[700]}>
          Need Help?
        </Typography>
        {renderSupportButtons('desktop')}
      </Box>
    </Box>
  );

  const renderCurrentStep = () =>
    currentStep === 'contact'
      ? renderContactStep()
      : currentStep === 'payment'
      ? renderPaymentStep()
      : renderConfirmationStep();

  const renderDesktopLayout = () => (
    <>
      {renderHero()}
      <Box component="section" sx={checkoutPageStyles.layoutSection}>
        <Box sx={checkoutPageStyles.layoutContainer}>
          <Box sx={checkoutPageStyles.contentGrid}>
            {renderCurrentStep()}
            {renderSummaryCard()}
          </Box>
        </Box>
      </Box>
    </>
  );

  const renderMobileLayout = () => (
    <>
      <Box sx={checkoutPageMobileStyles.container}>
        <Box sx={checkoutPageMobileStyles.heroSection}>
          <Box sx={checkoutPageMobileStyles.heroContent}>
            <Box sx={checkoutPageMobileStyles.heroBadge}>
              <FlightTakeoffRoundedIcon sx={{ fontSize: 18 }} />
              <span>
                Step {currentIndex + 1} of {stepOrder.length}
              </span>
            </Box>
            <Box>
              <Typography component="h1" sx={checkoutPageMobileStyles.heroTitle}>
                Complete Your Safari Booking
              </Typography>
              <Typography sx={checkoutPageMobileStyles.heroSubtitle}>
                Finalize your details to secure the Ultimate Kenya &amp; Tanzania adventure.
              </Typography>
            </Box>
            <WizardProgressBar
              steps={heroSteps}
              styles={checkoutPageMobileProgressStyles}
              renderNodeContent={(step, index) =>
                step.status === 'completed' ? <CheckCircleRoundedIcon sx={{ fontSize: 18 }} /> : index + 1
              }
            />
            <Box sx={checkoutPageMobileStyles.heroMeta}>
              <Box sx={checkoutPageMobileStyles.heroMetaItem}>
                <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[600] }} />
                July 15 – 25, 2024
              </Box>
              <Box sx={checkoutPageMobileStyles.heroMetaItem}>
                <GroupRoundedIcon sx={{ fontSize: 16, color: colorTokens.safari[600] }} />
                2 Travelers
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={checkoutPageMobileStyles.contentSection}>
          {renderCurrentStep()}
          <Box
            component="button"
            type="button"
            onClick={openSummaryDrawer}
            sx={[checkoutPageMobileStyles.summaryTrigger, { outline: 'none' }]}
          >
            <Box sx={checkoutPageMobileStyles.summaryTriggerLabel}>
              <ReceiptLongRoundedIcon sx={{ fontSize: 20 }} />
              View booking summary
            </Box>
            <ExpandLessRoundedIcon sx={{ color: colorTokens.safari[600] }} />
          </Box>
          <Box sx={checkoutPageMobileStyles.supportCard}>
            <Typography sx={checkoutPageMobileStyles.supportTitle}>Need help finalizing?</Typography>
            <Typography sx={checkoutPageMobileStyles.supportDescription}>
              Our safari specialists can answer questions 24/7.
            </Typography>
            <Box sx={checkoutPageMobileStyles.supportActions}>
              <DSButton
                fullWidth
                startIcon={<WhatsAppIcon sx={{ fontSize: 18 }} />}
                sx={{
                  ...checkoutPageMobileStyles.supportButton,
                  backgroundImage: 'none',
                  backgroundColor: '#22c55e',
                  color: colorTokens.neutral.white,
                  '&:hover': { backgroundColor: '#16a34a' },
                }}
              >
                WhatsApp
              </DSButton>
              <DSButton
                fullWidth
                tone="outline"
                startIcon={<PhoneRoundedIcon sx={{ fontSize: 18 }} />}
                sx={checkoutPageMobileStyles.supportButton}
              >
                Call Support
              </DSButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={isSummaryDrawerOpen}
        onClose={closeSummaryDrawer}
        PaperProps={{ sx: checkoutPageMobileStyles.summaryDrawerPaper }}
      >
        <Box sx={checkoutPageMobileStyles.summaryDrawerHandle} />
        <Box sx={checkoutPageMobileStyles.summaryDrawerHeader}>
          <Typography sx={checkoutPageMobileStyles.summaryDrawerTitle}>Booking Summary</Typography>
          <IconButton aria-label="Close booking summary" onClick={closeSummaryDrawer}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={checkoutPageMobileStyles.summaryDrawerContent}>{renderSummaryDetails('mobile')}</Box>
        <Box sx={checkoutPageMobileStyles.summaryDrawerFooter}>
          <Typography sx={checkoutPageMobileStyles.summaryDrawerSecure}>
            <ShieldRoundedIcon sx={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4 }} />
            Secure SSL encryption
          </Typography>
          <Box sx={checkoutPageMobileStyles.summaryDrawerHelp}>
            <Typography fontWeight={600} color={colorTokens.earth[700]}>
              Need Help?
            </Typography>
            {renderSupportButtons('mobile')}
          </Box>
        </Box>
      </Drawer>

      <Box sx={checkoutPageMobileStyles.bottomBar}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={checkoutPageMobileStyles.bottomBarLabel}>
            {currentStep === 'payment' && payDepositOnly
              ? 'Deposit due today'
              : currentStep === 'confirmation'
              ? 'Amount to charge'
              : 'Total trip value'}
          </Typography>
          <Typography sx={checkoutPageMobileStyles.bottomBarAmount}>
            ${payableAmount.toLocaleString()}
          </Typography>
          <Box
            component="button"
            type="button"
            aria-label="View booking summary"
            onClick={openSummaryDrawer}
            sx={[
              checkoutPageMobileStyles.bottomBarSummaryTrigger,
              { background: 'none', border: 'none', padding: 0, cursor: 'pointer' },
            ]}
          >
            <ReceiptLongRoundedIcon sx={{ fontSize: 16 }} />
            View summary
          </Box>
        </Box>
        <DSButton
          fullWidth
          startIcon={<LockRoundedIcon sx={{ fontSize: 18 }} />}
          onClick={handlePrimaryAction}
          disabled={!isPrimaryActionEnabled}
        >
          {primaryActionLabel}
        </DSButton>
      </Box>
    </>
  );

  return (
    <Box
      component="main"
      sx={isMobile ? checkoutPageMobileStyles.main : checkoutPageStyles.main}
    >
      {isMobile ? renderMobileLayout() : renderDesktopLayout()}
    </Box>
  );
};

export default CheckoutPage;
