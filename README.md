# README #

This  code example shows:
* How to install and include utility library in your project.
* How to write Node.js code to manipulate MIRN class and get useful data.
* How to update MIRN business logic.

## Prerequisite ##
***
To set up and run this library, you must first:
* Install NodeJs (https://nodejs.org/en/download/)

## Usage with welib Library ##
***
To install the library package and dependencies, go to the project root and run the following command:
```shell
npm install michaeltangfong/welib
```
then include the module
```javascript
const welib = require('welib');
```

## MIRN Class ##
you can start using MIRN class by initialise **MIRN** value with or without checksum, then it will process and update all its properties
```javascript
let mirn = new welib.mirn('53000014P0');
```
*please note a valid MIRN must be provided otherwise error will be thrown, sample error message:
> Error: invalid MIRN, market code in pos 1 not exist

### checksum ###
to obtain checksum, simply access checksum class property 
```javascrip
mirn.checksum
```
result:
```
4
```
### other properties ###
```javascript
mirn.market
mirn.jurisdiction
mirn.distributor
mirn.physical
mirn.logical
```
result:
```
Retail Gas Market
Victoria
AEMO
true
false
```

### Class properties summary ###

| Property      | Datatype  | Optional  | Sample Data
| ------------- |:---------:| ---------:|------------------:|
| checksum      | String    | N         | 4
| market        | String    | N         | Retail Gas Market
| jurisdiction  | String    | N         | Victoria
| distributor   | String    | N         | AEMO
| physical      | Boolean   | Y         | true
| logical       | Boolean   | Y         | false


### Displaying MIRN 
MIRN class also provide a method to display three form: standard, short and pretty, types are provided by welib library.  

```javascript
mirn.display(welib.DISPLAY.STANDARD);
mirn.display(welib.DISPLAY.SHORT);
mirn.display(welib.DISPLAY.PRETTY);
```
result:
```
53000014P04
53000014P0
53000014P0/4
```

### Reset class properties
MIRN class can be reset by invoking reset function, it will then reprocess all properties.

```javascript
mirn.reset(welib.DISPLAY.STANDARD);
mirn.display(welib.DISPLAY.SHORT);
mirn.display(welib.DISPLAY.PRETTY);
```
result:
```
53000014P04
53000014P0
53000014P0/4
```

## Change of business logic ##
All data including markets, jurisdictions, distributors and MIRN ranges are stored in data folder in json format, data can be modified in files in case of business logic change.

#### Library folder structure ####
```bash
.
├── data                          # business logic data 
├── lib                           # library modules
├── test                          # test scripts
├── index.ts                      # index file
```

