const { Board, Led } = require("johnny-five");
const exec = require("child_process").exec;
// For entrey connection socket
module.exports = (io) => {
  //console.log(io)
  const board = new Board();
  /*======= johnny-five  ========= */
  // The board's pins will not be accessible until
  // the board has reported that it is ready
  board.on("ready", (e) => {
    const successFull = "Ready!";
    
    /* ========== Socket.io =================*/
    io.on("connection", (socket) => {
      socket.emit("successFull", successFull);
      socket.on("on", (data) => {
        if (data) {
          const led = new Led(13);
          led.on();
          socket.emit("successOn", "The lights are on 💡");
        }
      });

      socket.on("pcOff", (data) => {
        //console.log(data)
        if (data == 'Windows') {
            console.log(data)
          // Create shutdown function
          function shutdown(callback) {
            exec("shutdown -s -t 0", function (error, stdout, stderr) {
              callback(stdout);
            }); 
        
            // Este para agar una mac
            // sudo shutdown -h now
            // Este es para apagar un linux
            // sudo shutdown -r now
          }
            shutdown(function (output) {
            console.log(output);
          }); 
          } else if (data == 'Linux') {
            console.log(data)
            // Create shutdown function
            function shutdown(callback) {
              exec("sudo shutdown -h now", function (error, stdout, stderr) {
                callback(stdout);
              }); 
            }
            
              shutdown(function (output) {
              console.log(output);
            }); 
          } else if (data == 'Macintosh') {
            console.log(data)
            // Create shutdown function
            function shutdown(callback) {
              exec("sudo shutdown -r now", function (error, stdout, stderr) {
                callback(stdout);
              }); 
            }
              shutdown(function (output) {
              console.log(output);
            }); 
          }
      });

      socket.on("off", (data) => {
        if (data) {
          const led = new Led(13);
          led.off();
          socket.emit("successOff", "The lights are Off");
        }
      });
    });
    /* ==============================*/
  });

  /*============== Chat public  ===================*/
  io.on("connection", (socketChat) => {
    console.log(socketChat.id);
    socketChat.on("messages", (data) => {
      socketChat.broadcast.emit("sendMessages", data);
    });
  });
};
