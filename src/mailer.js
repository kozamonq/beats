const nodemailer = require('nodemailer')
const {google} = require('googleapis')


const CLIENT_ID = '390630933487-0uafennov2t34q2h6o3fkk0m3tn410db.apps.googleusercontent.com'
const CLIENT_SECRET = '29ZCSpkrfYEpN_6YM05qRw-m'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Ntn92q79qgRCgYIARAAGAQSNwF-L9IrwfQNSXEW3vDFTIun-Xtxp6a_4_Rf6GN8jG2IfaiUqsmpugpkO-L4Z7PdysEhMHcp6Rc'



const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

export const sendMail = async() => {

    try{
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'beatsplaysoporte@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'BEATS PLAY <beatsplaysoporte@gmail.com>',
            to: `victor.oteroroldan@gmail.com`,
            subject: `Confirmación de pedido (XXX)`,
            text: `Hola XXX, tu compra ha sido exitosa! A continuación tendrás el link de Descarga del Beat. <br>XXX</br> `,
            html: `${texto}`
        };

        const result = await transport.sendMail(mailOptions)
        return result

    }catch(error){
        return error
    }
}

sendMail().then(result=>console.log('Email sent...', result))
.catch(error => console.log(error.message))