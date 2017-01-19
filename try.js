Web3 = require("web3")
console.log(web3)

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.net.peerCount //verify that the node is connnected to at least 1 peer, if not: panic
web3.eth.syncing // if result = "false" we are good to go; if not: you can still make the calls but the blockchain won't be up to date
// 
// we are going to make rpc call to parse the blockchain
// and prepare raw transaction for broadcasting
// basic acc: "0x59c151e117cb44884c861b02ffc164a8a0a8e266"
// password: "eylab"
// ######### USAGE 
// acc = '0x59c151e117cb44884c861b02ffc164a8a0a8e266'
// web3.personal.unlockAccount(acc, "eylab")
//'acc' has to be unlocked before every transaction
// alternativemy web3.personal.unlockAccount(acc, "eylab", 1000) would unlock 'acc' for 1000 seconds

// ######### adding the ABI for MotorLedger
MotorLedger = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"MotorList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_newAddress","type":"address"},{"name":"_description","type":"string"}],"name":"modifyMotor","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_MechsList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_description","type":"string"},{"name":"_identifiertendeur","type":"bytes32"},{"name":"_logtendeur","type":"string"},{"name":"_identifiervilebrequin","type":"bytes32"},{"name":"_logvilebrequin","type":"string"}],"name":"addMotor","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_AllowedMechsContract","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"bytes32"},{"indexed":false,"name":"TrackAddress","type":"address"},{"indexed":false,"name":"description","type":"string"}],"name":"MotorAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"bytes32"},{"indexed":false,"name":"TrackAddress","type":"address"},{"indexed":false,"name":"description","type":"string"}],"name":"MotorChanged","type":"event"}])

// ######### adding the ABI for Motor 

Motor = web3.eth.contract([{"constant":false,"inputs":[{"name":"_logvilebrequin","type":"string"},{"name":"_identifiervilebrequin","type":"bytes32"}],"name":"changevilebrequin","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"identifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tendeur","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"vilebrequin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_logtendeur","type":"string"},{"name":"_identifiertendeur","type":"bytes32"}],"name":"changetendeur","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_description","type":"string"},{"name":"_part1","type":"address"},{"name":"_part2","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_WhatPart","type":"string"},{"indexed":false,"name":"newPart","type":"address"}],"name":"PartReplaced","type":"event"}])

// ######### adding the ABI for Part

Part = web3.eth.contract([{"constant":false,"inputs":[{"name":"_log","type":"string"}],"name":"LogChange","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"log","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PartIdentifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MotorIdentifier","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[{"name":"_identifierMotor","type":"bytes32"},{"name":"_identifierPart","type":"bytes32"},{"name":"_log","type":"string"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"change","type":"string"}],"name":"PartChangeLog","type":"event"}])

// ######### Defining the MotorLedger Instance with his address

MotorLedgerInstance = MotorLedger.at('0x37EB3708b071DE5e873B2918b2157332eAdcEC37')

// ######### Defining the MotorLedger events

EventAdded = MotorLedgerInstance.MotorAdded({},{fromBlock: 0, toBlock: 'latest'})
EventChanged = MotorLedgerInstance.MotorChanged({},{fromBlock: 0, toBlock: 'latest'})



EventAdded.get()
EventChanged.get()