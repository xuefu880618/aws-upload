exports.handler = async (event) => {

  const fs = require('fs')
  const SSH = require('simple-ssh');
  const pemfile = 'my.pem';
  const user = 'ec2-user';
  const host = 'myinternaladdress.region.compute.internal';

  // all this config could be passed in via the event
  const ssh = new SSH({
    host: host,
    user: user,
    key: fs.readFileSync(pemfile)
  });

  let cmd = "ls";
  if (event.cmd == "long") {
    cmd += " -l";
  }

  let prom = new Promise(function(resolve, reject) {

    let ourout = "";

    ssh.exec('your command', {
      exit: function() {
        ourout += "\nsuccessfully exited!";
        resolve(ourout);
      },
      out: function(stdout) {
        ourout += stdout;
      }
    }).start({
      success: function() {
        console.log("successful connection!");
      },
      fail: function(e) {
        console.log("failed connection, boo");
        console.log(e);
      }
    });

  });

  const res = await prom;

  const response = {
    statusCode: 200,
    body: res,
  };
  return response;
};