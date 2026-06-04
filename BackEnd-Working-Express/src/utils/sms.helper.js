const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Función para pedirle a Twilio que genere y envíe el código
const sendSMS = async (to) => {
    try {
        await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
            .verifications
            .create({ to, channel: 'sms' });
        return true;
    } catch (error) {
        console.error('Error enviando SMS con Verify:', error);
        return false;
    }
};

// Función EXTRA que necesitarás para validar el código que el usuario ingrese
const checkSMSCode = async (to, code) => {
    try {
        const verificationCheck = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
            .verificationChecks
            .create({ to, code });
        
        return verificationCheck.status === 'approved';
    } catch (error) {
        console.error('Error verificando código con Twilio:', error);
        return false;
    }
};

module.exports = { sendSMS, checkSMSCode };
