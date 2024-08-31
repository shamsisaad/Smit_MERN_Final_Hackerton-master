import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';
import path from 'path';

// Function to generate certificate PDF
const generateCertificate = async (student, course, issueDate) => {
    try {
        // Load a blank certificate template
        const templatePath = path.resolve('./templates/certificateTemplate.pdf');
        const templateBytes = fs.readFileSync(templatePath);

        // Create a new PDF document from the template
        const pdfDoc = await PDFDocument.load(templateBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Customize the certificate with student and course information
        firstPage.drawText(student.Name, {
            x: 200,
            y: 300,
            size: 20,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(course.name, {
            x: 200,
            y: 250,
            size: 15,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(issueDate, {
            x: 200,
            y: 200,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Save the customized certificate to a buffer
        const pdfBytes = await pdfDoc.save();
        const fileName = `certificate_${student.rollNumber}.pdf`;

        // Save the PDF to the filesystem (you can change this to store in the cloud, like AWS S3, if needed)
        const outputPath = path.resolve(`./output/${fileName}`);
        fs.writeFileSync(outputPath, pdfBytes);

        return outputPath;  // Return the file path to use in email or for download
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('Failed to generate certificate PDF.');
    }
};

export default generateCertificate;
