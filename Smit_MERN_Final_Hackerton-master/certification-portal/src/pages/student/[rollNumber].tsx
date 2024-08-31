import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DownloadCertificate = () => {
  const router = useRouter();
  const { rollNumber } = router.query;

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/students/download-certificate/${rollNumber}`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${rollNumber}-certificate.pdf`;
        link.click();
      } catch (err) {
        console.error('Error downloading certificate', err);
      }
    };
    if (rollNumber) fetchCertificate();
  }, [rollNumber]);

  return <p>Downloading certificate...</p>;
};

export default DownloadCertificate;
