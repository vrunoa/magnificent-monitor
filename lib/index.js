import request from 'request';
import { Server as http } from 'http';
import Table from 'cli-table';

export default function magnificent({
  host = "http://localhost",
  port = "12345",
  interval = 15
  }) {
  
  let request_url = host;
  if(port) request_url+= ':'+port;

  let server = http();

  let responses = {};
  let responses_history = {};
  let monitor_log = () => {
    let sumOK = 0, sumFails = 0, calls = 0;;
    for(let key in responses) {
      calls++;
      if(responses[key].statusCode == 200) {
        sumOK++;
      }else {
        sumFails++;
      }
    }
    responses = {};
    let table = new Table({
      head: ['Service calls', 'Fails', 'Response OK']
      , colWidths: [20, 20, 20]
    });
    table.push([calls, sumFails, sumOK]);
    console.log(table.toString());
  }

  let check_server = () => {
    // check monitor status
    request(request_url, (err, response, body) => {
      if(err) { 
        console.log("Magnificent server no longer available!");
        process.exit(0);
      }
      let time = new Date();
      responses[time.getTime()] = {
        statusCode : response.statusCode,
        time: time
      }
    });
  }
  
  // set monitor server check interval
  interval = (interval || 15)*1000;
  check_server();
  setInterval( () => {
    check_server();
  }, interval);

  // set monitor log interval
  setInterval( () => {
    monitor_log();
  }, 60*1000);
    
  server.listen(process.env.PORT, '0.0.0.0', function(err) {
    if(err) console.log(err);
  });
}
