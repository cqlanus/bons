var aws = require('aws-sdk')
const {env} = require('APP')

aws.config.update({
  signatureVersion: 'v4',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
})

module.exports = {
  sign: function(filename, filetype) {
    var s3 = new aws.S3()

    var params = {
      Bucket: 'bons-photos',
      Key: (Date.now() + filename),
      Expires: 60,
      ContentType: filetype
    }
    console.log('running')
    s3.getSignedUrl('putObject', params, function(err, data) {
      if (err) {
        console.log(err)
        return err
      } else {
        return data
      }
    })
  }
}
