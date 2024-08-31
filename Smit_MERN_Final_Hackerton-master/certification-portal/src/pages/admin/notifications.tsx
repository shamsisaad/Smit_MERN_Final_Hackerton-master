import { useState, useEffect } from 'react';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch notifications for certificate generation from the API
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications');
                const data = await response.json();

                if (response.ok) {
                    setNotifications(data);
                } else {
                    setError('Failed to fetch notifications.');
                }
            } catch (err) {
                setError('An error occurred while fetching notifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleGenerateCertificate = async (batchId: string) => {
        try {
            const response = await fetch(`/api/certificate/generate/${batchId}`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Certificate generated successfully.');
            } else {
                alert('Failed to generate certificate.');
            }
        } catch (err) {
            alert('An error occurred while generating the certificate.');
        }
    };

    const handleDownloadCertificate = async (batchId: string) => {
        try {
            const response = await fetch(`/api/certificate/download/${batchId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `batch_${batchId}_certificate.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                alert('Failed to download the certificate.');
            }
        } catch (err) {
            alert('An error occurred while downloading the certificate.');
        }
    };

    const handleSendEmailNotification = async (batchId: string) => {
        try {
            const response = await fetch(`/api/notifications/send-email/${batchId}`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Notification sent successfully.');
            } else {
                alert('Failed to send the email notification.');
            }
        } catch (err) {
            alert('An error occurred while sending the email notification.');
        }
    };

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Certificate Generation Notifications</h1>
            
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Batch Name</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notification: any) => (
                            <tr key={notification.batchId}>
                                <td className="border px-4 py-2">{notification.batchName}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleGenerateCertificate(notification.batchId)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
                                    >
                                        Generate Certificate
                                    </button>
                                    <button
                                        onClick={() => handleDownloadCertificate(notification.batchId)}
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition"
                                    >
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => handleSendEmailNotification(notification.batchId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Send Email Notification
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NotificationsPage;
