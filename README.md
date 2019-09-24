## Installation

npm install primer-default  
  
## Development  
  
To run dev environment:  
npm run start

To compile scripts:  
npm run build  
  
## USAGE  
To import React component:  
```
import React, { Component } from 'react';  
import {App} from 'primer-default'  
.....  
class App extends Component {  
  render() {  
    return (  
      <div><App /></div>  
    )  
  }  
```  
To import event dispatcher:  
```
import {AppDispatcher} from 'primer-default'  
```  

## RELEASES  
  
0.1.0 Initial Release  
0.15.0 SAVI-1871 update with changes from Sprint 19  
------  
  
This app was bootstrapped using the create-savi-app module.  
