import { ContactUs } from '@/app/components/ContactUs';
import { useNavigate } from 'react-router-dom';

export default function ContactUsPage() {
  const navigate = useNavigate();

  return <ContactUs onBack={() => navigate(-1)} />;
}