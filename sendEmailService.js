export class SendEmailService {

    sendEmail(to, subject, content) {
        console.log(`Email envoyé à ${to}`);
        console.log(`Sujet: ${subject}`);
        console.log(`Contenu: ${content}`);
        return true;
    }
}
