# README #

This  code example shows:
* How to install and include utility library in your project.
* How to write Node.js code to manipulate MIRN class and retrieve useful data.
* How to update MIRN business logic.
* How to run test.

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
### other properties ###
```javascript
mirn.market
mirn.jurisdiction
mirn.distributor
mirn.physical
mirn.logical
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
MIRN class also provide a method to display MIRN in three forms: standard, short and pretty.  The argument type is provided by welib library.  

```javascript
mirn.display(welib.DISPLAY.STANDARD);
mirn.display(welib.DISPLAY.SHORT);
mirn.display(welib.DISPLAY.PRETTY);
```

### Reset class properties
MIRN class can be reset by invoking reset function, it will then reprocess all property values.

```javascript
mirn.reset('5248000467');
```

### Sample code ###
```javascript
const welib = require('welib');
let mirn = new welib.mirn('53000014P0');

console.log(`Checksum : ${mirn.checksum}`);
console.log(`Market : ${mirn.market}`);
console.log(`Jurisdiction : ${mirn.jurisdiction}`);
console.log(`Distributor : ${mirn.distributor}`);
console.log(`Standard MIRN : ${mirn.display(welib.DISPLAY.STANDARD)}`);
console.log(`Short MIRN : ${mirn.display(welib.DISPLAY.SHORT)}`);
console.log(`Pretty MIRN : ${mirn.display(welib.DISPLAY.PRETTY)}`);
console.log(`Physical : ${mirn.physical}`);
console.log(`Logical : ${mirn.logical}`);
```
result:
```
Checksum : 4
Market : Retail Gas Market
Jurisdiction : Victoria
Distributor : AEMO
Standard MIRN : 53000014P04
Short MIRN : 53000014P0
Pretty MIRN : 53000014P0/4
Physical : true
Logical : false
```
## Change of business logic ##
All data including markets, jurisdictions, distributors and MIRN ranges are stored in data folder, modify data respectively in case of business logic change.

#### Library folder structure ####
```bash
.
├── data                          # business logic data 
├── lib                           # library modules
├── test                          # test scripts
├── index.ts                      # index file
```

## Run Test ##
execute the following command to start testing
```shell
jest
```
result:
```shell
 PASS  test/index.test.js
  weblib library
    mira class with MIRA 53000014P0 success cases
      ✓ checksum must be 4 (2 ms)
      ✓ market must be Retail Gas Market (1 ms)
      ✓ Jurisdiction must be Victoria (1 ms)
      ✓ Distributor must be AEMO
      ✓ MIRA standard display format must 53000014P04 
    mira class fail cases
      ✓ should throw market not exist error when pos 1 is 0 (10 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.421 s, estimated 1 s
Ran all test suites.
```
