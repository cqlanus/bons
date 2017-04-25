var aws = require('aws-sdk')
const {env} = require('APP')
const Promise = require('bluebird')

aws.config.update({
  // signatureVersion: 'v4',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
})

module.exports = {
  sign(filename, filetype, res) {
    var s3 = new aws.S3()

    var params = {
      Bucket: 'new-bons',
      Key: (Date.now() + filename),
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read'
    }

    return s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        console.log(err)
        return err
      } else {
        const returnData = {
          signedRequest: data,
          url: `https://new-bons.s3.amazonaws.com/${params.Key}`
        }
        res.json(returnData)
      }
    })
  }
}
