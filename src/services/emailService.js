const nodemailer= require('nodemailer');

let sendSimpleEmail=async(dataSent)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "dcmclgtdat4@gmail.com", // generated ethereal user
          pass: "lcrvfuvgnrkwhioc", // generated ethereal password
        },
      });

      let a=dataSent.data.map(item=>{
          return (
            `${item.email},`
          )
      })
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Nam dz π»" <dcmclgtdat4@gmail.com>', // sender address
        to: a, // list of receivers
        subject: "New Status β", // Subject line
        text: "Hello world?", // plain text body
        html: `<h2>Hello Qa Manager !</h2>
                <div><b>Staff ${dataSent.name} id number ${dataSent.id} has post a new Status</b></div>
                <div>Have a nice day !!</div>
                `, // html body
      });
}


let sendSimpleEmail1=async(dataSent)=>{
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "dcmclgtdat4@gmail.com", // generated ethereal user
        pass: "lcrvfuvgnrkwhioc", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Admin System π©π© π»" <dcmclgtdat4@gmail.com>', // sender address
      to: dataSent.userReceived, // list of receivers
      subject: "New Status πΉπΉπΉ", // Subject line
      text: "Hello world?", // plain text body
      html: `<h2>Hello User ${dataSent.userReceived} π¦ΈββοΈπ¦ΈββοΈ !</h2>
              <div><b>Staff ${dataSent.userSent} has commented on your Status</b></div>
              <div>Have a nice day π¦π¦π¦ !!</div>
              `, // html body
    });
}


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
}



main().catch(console.error);
module.exports={sendSimpleEmail,sendSimpleEmail1}