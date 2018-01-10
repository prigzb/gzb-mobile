export default {
  mcloud: {
    eid: '101', //云之家的企业ID
    appId: '10132',//云之家轻应用的appid
    appSecret: 'gzbfdc_nc_20170815_test01',//云之家轻应用的appSecret

    pubId: '', //云之家发送消息专用的公共号ID
    pubSecret: '', //云之家发送消息专用的公共号Secret

    aesKey: 'gzbfdc_nc_201708', //16位的AES秘钥,内容无所谓,但要求一定要16位
    rsaFilePath: './101.key', //云之家安全认证的RSA企业私钥文件,从金蝶的企业云服务平台下载

    urlPrefix: 'http://xt.gzbfdc.com',//云之家API服务器路径
  }
}
