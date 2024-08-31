import { useState } from 'react';
import { sendCertificateByEmail } from '../utils/api'; // Import the sendCertificateByEmail API
import axios from 'axios';

const CertificatePage = () => {
    const [batch, setBatch] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [message, setMessage] = useState('');

    // Function to generate certificates for a batch
    const handleGenerateCertificates = async () => {
        try {
            const response = await axios.post('/api/certificate/generate', { batch });
            if (response.status === 200) {
                setMessage('Certificates generated and notifications sent!');
            }
        } catch (error) {
            setMessage('Error generating certificates');
        }
    };

    // Function to download the certificate by roll number
    const handleDownloadCertificate = async () => {
        try {
            const response = await axios.get(`/api/certificate/download?rollNumber=${rollNumber}`, {
                responseType: 'blob',
            });

            // Create a link element, set its href to the blob URL, and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificate_${rollNumber}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            setMessage('Certificate not found');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-5">Certificate Management</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Generate Certificates for Batch</h2>
                <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Enter Batch Name"
                    className="p-2 border border-gray-300 rounded mb-3"
                />
                <button
                    onClick={handleGenerateCertificates}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                    Generate Certificates
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Download Certificate by Roll Number</h2>
                <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="Enter Roll Number"
                    className="p-2 border border-gray-300 rounded mb-3"
                />
                <button
                    onClick={handleDownloadCertificate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Download Certificate
                </button>
            </div>

            {message && <p className="text-red-500">{message}</p>}
        </div>
    );
};

export default CertificatePage;
