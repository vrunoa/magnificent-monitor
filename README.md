# Magnificent Monitor Service

#Install
```npm install magnificent-monitor```

# Usage
**command-line**
```javascript
  npm install -g magnificent-monitor
  magnificent-monitor --host [host] --port [port] --interval
```

**API**
```javascript
var magnificent = require('magnificent-monitor')
    magnificent({host:"http://localhost", port:"12345", interval:"15"});
```
