import * as argon2 from "argon2";
import * as fs from 'fs';
import fetch from "node-fetch";
import convert from "xml-js";
import util from "util";
import shippingTemplate from "./shippingTemplate.js";
import shippingReceiveTemplate from "./shippingReceiveTemplate.js";
import { MongoClient } from "mongodb";
import {} from 'dotenv/config'
const { MONGO_URI } = process.env;

export const getUser = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const targetUser = await db.collection("RegisteredUsers")
            .findOne({ 
                _id: userName,
            });
        let passwordCheck = await argon2.verify(targetUser.password, req.body.password);
        if (passwordCheck) {
            targetUser.userName = targetUser._id;
            delete targetUser._id;
            res.status(200).json({ status: 200, data: targetUser });
        }
        else if (!passwordCheck){
            res.status(400).json({ status: 400, data: req.body, Message: "User/password combination not found"})
        }
    } 
    catch (err) {
        res.status(500).json({ status: 500, data: req.body, Message: "Something went wrong on our end. Please try again later.", ErrorMessage: err.message });
    }
    client.close();
};

export const createUser = async (req, res) => {
    let newUser = req.body;
    newUser._id = newUser.userName;
    delete newUser.userName;
    newUser.friends = [];
    newUser.messages = [];
    const hash = await argon2.hash(newUser.password);
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        let duplicateUserCheck = await db.collection("RegisteredUsers").findOne({_id: req.body._id});
        if (!duplicateUserCheck){
            let result = await db.collection("RegisteredUsers").insertOne({...newUser, password: hash});
            console.log({result});
            res
            .status(201)
            .json({ status: 201, data: newUser, nameTaken:false, message: "User created" });
        }
        else if(duplicateUserCheck){
            res
            .status(201)
            .json({ status: 201, data: req.body, nameTaken: true, message: "Username already exists. User not created." });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

export const updateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const filter = {firstName: "Mama"};
        const update = {$set: {avatarUrl: "some URL goes here"}}
        await db.collection("Products").updateOne(filter, update);
        res.status(201).json({
            status: 201,
            message: "User updated",
        });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

export const deleteUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const filter = {firstName: req.body.firstName};
        await db.collection("RegisteredUsers").deleteOne(filter);
        res.status(201).json({
            status: 201,
            message: "User deleted",
    });
    } 
    catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

export const searchForUser = async (req, res) => {
    const userName = req.body.userName;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const targetUser = await db.collection("RegisteredUsers")
            .findOne({ 
                _id: userName,
            });
        if (targetUser) {
            console.log({userName});
            res.
            status(200).
            json({ 
                status: 200, 
                found: true, 
                data: userName, 
                message: "User found" 
            });
        }
        else if (!targetUser){
            res.
            status(400).
            json({ 
                status: 400, 
                found: false, 
                Message: "User not found"
            });
        }
    } 
    catch (err) {
        res.
        status(500).
        json({ 
            status: 500, 
            Message: "Something went wrong on our end. Please try again later.", 
            ErrorMessage: err.message 
        });
    }
    client.close();
};

export const addFriend = async (req, res) => {
    const targetUser = req.body.targetUser;
    const currentUser = req.body.currentUser;
    const client = new MongoClient(MONGO_URI);
    let duplicateFriend = false;
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const currentUserFromDB = await db.collection("RegisteredUsers")
            .findOne({_id: currentUser.userName});
        if (currentUserFromDB) {
            let friendsList = currentUserFromDB.friends;
            friendsList.forEach((el) => {
                if (el.friendUsername === targetUser){
                    duplicateFriend = true;
                }
            })
            if (duplicateFriend){
                res.
                status(400).
                json({
                    status: 400,
                    found: false,
                    data: req.body,
                    duplicate: true,
                    message: "User is already in your friends list",
                })
            }
            else {
                const targetUserFromDB = await db.collection("RegisteredUsers")
                .findOne(
                    {
                        _id: targetUser
                    }
                );
                let newFriend = {
                    friendUsername: targetUser,
                    friendAvatar: targetUserFromDB.avatarUrl,
                };
                friendsList.push(newFriend);
                const currentUserUpdate = await db.collection("RegisteredUsers")   
                .updateOne(
                    { 
                        _id: currentUser.userName,
                    }, 
                    {
                        $set: {friends: friendsList}
                    }
                );
                if (currentUserUpdate.modifiedCount === 1){
                    res.
                    status(200).
                    json({ 
                        status: 200, 
                        found: true, 
                        data: currentUserUpdate, 
                        targetUser: targetUser,
                        message: "User added to friends list" 
                    });
                }
            }
        }
        else {
            res.
            status(400).
            json({ 
                status: 400, 
                found: false, 
                message: "User not added to firends list."
            });
        }
    } 
    catch (err) {
        res.
        status(500).
        json({ 
            status: 500, 
            Message: "Something went wrong on our end. Please try again later.", 
            ErrorMessage: err.message 
        });
    }
    client.close();
};

export const deleteFriend = async (req, res) => {
    const {targetUser, currentUser} = req.body;
    const client = new MongoClient(MONGO_URI);
    let newFriendList = [];
    try {
        await client.connect();
        const db = client.db("CarePackageConnect");
        const currentUserFromDB = await db.collection("RegisteredUsers")
            .findOne({_id: currentUser.userName});
        if (currentUserFromDB) {
            currentUserFromDB.friends.forEach((el) => {
                if (el.friendUsername !== targetUser){
                    newFriendList.push(el);
                }
            })
            const currentUserUpdate = await db.collection("RegisteredUsers")   
            .updateOne(
                { 
                    _id: currentUser.userName,
                }, 
                {
                    $set: {friends: newFriendList}
                }
            );
            if (currentUserUpdate.modifiedCount === 1){
                const updatedCurrentUserFromDB = await db.collection("RegisteredUsers")
                    .findOne({_id: currentUser.userName});
                res.
                status(200).
                json({ 
                    status: 200, 
                    found: true, 
                    data: updatedCurrentUserFromDB, 
                    targetUser: targetUser,
                    message: "User added to friends list" 
                });
            }
            else {
                res.
                status(400).
                json({ 
                status: 400, 
                found: false, 
                message: "User not removed from friends list."
                });
            }
        }
        else {
            res.
            status(400).
            json({ 
                status: 400, 
                found: false, 
                message: "User not removed from friends list."
            });
        }
    } 
    catch (err) {
        res.
        status(500).
        json({ 
            status: 500, 
            Message: "Something went wrong on our end. Please try again later.", 
            ErrorMessage: err.message 
        });
    }
    client.close();
};

export const sendMessage = async (req, res) => {
    let targetUser = req.body.targetUser;
    let messageInfo = {
        from: req.body.currentUser,
        senderAvatar: req.body.currentUserAvatar,
        msg: req.body.msg,
        time: req.body.time,
        timestamp: req.body.timestamp
    }
    const client = new MongoClient(MONGO_URI);
    try{
        await client.connect();
        const db = client.db("CarePackageConnect");
        const targetUserFromDB = await db.collection("RegisteredUsers").findOne({_id: targetUser});
        let messages = targetUserFromDB.messages;
        messages.push(messageInfo);
        const targetUserUpdate = await db.collection("RegisteredUsers")   
                .updateOne(
                    { 
                        _id: targetUser,
                    }, 
                    {
                        $set: {messages: messages}
                    }
                );
        if (targetUserUpdate.modifiedCount === 1){
            res.
            status(200).
            json({ 
                status: 200, 
                success: true, 
                message: "Message sent successfully" 
            });
        }
        else {
            res.
            status(400).
            json({ 
                status: 400, 
                success: false,
                message: "Message failed to send",
                data: req.body,
            });
        }
    }
    catch (err) {
        res.
        status(500).
        json({ 
            status: 500, 
            Message: "Something went wrong on our end. Please try again later.", 
            ErrorMessage: err.message 
    });
    }
};

export const getRate = async (req, res) => {
    // STEP 1: SEND DATA TO CANADA POST API

    const setShipDate =(dateString)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'expected-mailing-date'){
                highestEl.elements[0].text = dateString;
            }
        });
    };

    const setDeliveryOption =(deliveryOption)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'options'){
                highestEl.elements[0].elements[0].elements[0].text = deliveryOption;
                
            }
        })
    };

    const setWeight =(weightString)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'parcel-characteristics'){
                highestEl.elements.forEach((higherEl) => {
                    if (higherEl.name ==='weight'){
                        higherEl.elements[0].text = weightString
                    }
                })
                
            }
        })
    }

    const setDimensions =(length, width, height)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'parcel-characteristics'){
                highestEl.elements.forEach((higherEl) => {
                    if (higherEl.name ==='dimensions'){
                        higherEl.elements.forEach((middleEl) => {
                            if (middleEl.name === 'length'){
                                middleEl.elements[0].text = length;
                            }
                            if (middleEl.name === 'width'){
                                middleEl.elements[0].text = width;
                            }
                            if (middleEl.name === 'height'){
                                middleEl.elements[0].text = height;
                            };
                        });
                    };
                });    
            };
        });
    };

    const setOriginPC =(originPC)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'origin-postal-code'){
                highestEl.elements[0].text = originPC;
            };
        });
    };

    const setDestinationPC =(destinationPC)=> {
        shippingTemplate.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'domestic'){
                highestEl.elements.forEach((higherEl) => {
                    if (higherEl.name === 'postal-code'){
                        higherEl.elements[0].text = destinationPC;
                    };
                });
            };
        });
    };

    setShipDate(req.body.expectedMailingDate);
    setDeliveryOption(req.body.deliveryOption);
    setWeight(req.body.weight);
    setDimensions(req.body.length, req.body.width, req.body.height);
    setOriginPC(req.body.startingPC);
    setDestinationPC(req.body.destinationPC);

    let backToXml = convert.js2xml(shippingTemplate, {compact: false, ignoreComment: true, spaces: 4});

    let options = {
        method: "POST",
        headers: {
            "Accept": "application/vnd.cpc.ship.rate-v4+xml",
            "Content-type": "application/vnd.cpc.ship.rate-v4+xml",
            "Authorization": "Basic YzdjNzY5NzA4ZDFjZDllNDoxYjk3ZjM5YThjNmU0ZTlhMzM5ZDYz",
            "Accept-language": "en-CA"
        },
        body: backToXml,
    };

    // STEP 2: PROCESS INFO RECEIVED FROM CANADA POST API

    let result = await fetch('https://ct.soa-gw.canadapost.ca/rs/ship/price', options);
    let resultText = await result.text();
    let convertedResult = convert.xml2js(resultText, {compact: false, spaces: 4});
    let quoteInfo = { 1 : {}, 2 : {}, 3 : {} };

    const deriveQuotes = () => {
        let counter = 1;

        convertedResult.elements[0].elements.forEach((highestEl) => {
            if (highestEl.name === 'price-quote'){
                highestEl.elements.forEach((higherEl) => {
                    if (higherEl.name === 'service-name'){
                        quoteInfo[counter].serviceName = higherEl.elements[0].text;
                    };
                    if (higherEl.name === 'price-details'){
                        higherEl.elements.forEach((middleEl) => {
                            if (middleEl.name === 'base'){
                                quoteInfo[counter].basePrice = middleEl.elements[0].text;
                            };
                            if (middleEl.name === 'taxes'){
                                middleEl.elements.forEach((lowerEl) => {
                                    if (lowerEl.name === 'hst'){
                                        quoteInfo[counter].hst = lowerEl.elements[0].text;
                                    };
                                });
                            };
                            if (middleEl.name === 'adjustments'){
                                middleEl.elements.forEach((lowerEl) => {
                                    if (lowerEl.name === 'adjustment'){
                                        lowerEl.elements.forEach((lowestEl) => {
                                            if (lowestEl.name === 'adjustment-name' && 
                                            lowestEl.elements[0].text === 'Fuel surcharge'){
                                                quoteInfo[counter].surchargeType = lowestEl.elements[0].text;
                                                for (let i=0; i<lowerEl.elements.length; i++){
                                                    if (lowerEl.elements[i].name === 'adjustment-cost'){
                                                        quoteInfo[counter].surchargeAmount = lowerEl.elements[i].elements[0].text;
                                                    };
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            if (middleEl.name === 'due') {
                                quoteInfo[counter].amountDue = middleEl.elements[0].text;
                            };
                            if (middleEl.name === 'options'){
                                middleEl.elements.forEach((lowerEl) => {
                                    if (lowerEl.name === 'option'){
                                        quoteInfo[counter][lowerEl.elements[0].elements[0].text] = [];
                                        for (let i=0; i<lowerEl.elements.length; i++){
                                            quoteInfo[counter][lowerEl.elements[0].elements[0].text].push(lowerEl.elements[i].elements[0].text);
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (higherEl.name === 'service-standard'){
                        higherEl.elements.forEach((middleEl) => {
                            if (middleEl.name === 'expected-transit-time'){
                                quoteInfo[counter].transitTime = middleEl.elements[0].text;
                            }
                            if (middleEl.name === 'expected-delivery-date'){
                                quoteInfo[counter].deliveryDate = middleEl.elements[0].text;
                            }
                        })
                    }
                })
                counter += 1;
            }
        });
    };

    deriveQuotes();

    if (!quoteInfo 
        || quoteInfo.length < 3
        || !quoteInfo['1'].serviceName){
        res.status(400).json({
            status: 400,
            message: "Unable to get quotes. Please try again",
            data: req.body,
        });
    }
    else {
        res.status(200).json({
            status: 200,
            message: "Welcome to the mailroom.",
            data: quoteInfo,
        });
    }
};


// THIS IS NOT DEAD CODE - IT IS REFERENCE MATERIAL FOR FURTHER DEVELOPING THIS APP - DO NOT DELETE

// const sampleGet = async (req, res) => {
//     // let backToXml = convert.js2xml(shippingTemplate, {compact: false, ignoreComment: true, spaces: 4});
//     // console.log(backToXml);
//     // let shippingDate = shippingTemplate.elements[0].elements[1].elements[0].text;
//     // shippingDate = req.body.expectedMailingDate;
//     // console.log(util.inspect(shippingTemplate, {showHidden: false, depth: null, colors: true}))
//     let options = {
//         method: "POST",
//         headers: {
//             "Accept": "application/vnd.cpc.ship.rate-v4+xml",
//             "Content-type": "application/vnd.cpc.ship.rate-v4+xml",
//             "Authorization": "Basic YzdjNzY5NzA4ZDFjZDllNDoxYjk3ZjM5YThjNmU0ZTlhMzM5ZDYz",
//             "Accept-language": "en-CA"
//         },
//         body: backToXml,
//     }
//     let response = await fetch('https://ct.soa-gw.canadapost.ca/rs/ship/price', options);
//     let responseee = await response.text();
//     let convertedResponse = convert.xml2js(responseee, {compact: false, spaces: 4});
//     // console.log(convertedResponse);
//     console.log(util.inspect(convertedResponse, {showHidden: false, depth: null, colors: true}))
//     // let result1 = convert.xml2json(testReqData, {compact: true, spaces: 4});
//     // let result2 = convert.xml2js(testReqData, {compact: false, spaces: 4});
//     // let backToXml = convert.js2xml(shippingTemplate, {compact: false, ignoreComment: true, spaces: 4});
//     // console.log(backToXml);
//     // console.log(result1, '\n', result2);
//     // let reqBody = {"declaration":{"attributes":{"version":"1.0","encoding":"utf-8"}},"elements":[{"type":"element","name":"mailing-scenario","attributes":{"xmlns":"http://www.canadapost.ca/ws/ship/rate-v4"},"elements":[{"type":"element","name":"quote-type","elements":[{"type":"text","text":"counter"}]},{"type":"element","name":"expected-mailing-date","elements":[{"type":"text","text":"2022-04-25"}]},{"type":"element","name":"options","elements":[{"type":"element","name":"option","elements":[{"type":"element","name":"option-code","elements":[{"type":"text","text":"LAD"}]}]}]},{"type":"element","name":"parcel-characteristics","elements":[{"type":"element","name":"weight","elements":[{"type":"text","text":"0.5"}]}]},{"type":"element","name":"origin-postal-code","elements":[{"type":"text","text":"L4R1L6"}]},{"type":"element","name":"destination","elements":[{"type":"element","name":"domestic","elements":[{"type":"element","name":"postal-code","elements":[{"type":"text","text":"L1N1Y5"}]}]}]}]}]}  
//     // let xml = require('fs').readFileSync('test.xml', 'utf8');
//     // let result = convert.xml2json(xml); // or convert.xml2json(xml, options)
//     // let flipFlop = convert.json2xml(result);
//     // let finalResult = JSON.parse(result);
//     // // console.log(finalResult.elements[0].elements[2].elements[0].elements);
//     // console.log(util.inspect(finalResult, {showHidden: false, depth: null, colors: true}))
// // let jsObject = require('fs').readFileSync('shippingTemplate.js', 'utf8');
// // let jsObject = await JSON.stringify(shippingTemplate);
// // let options = {compact: false, ignoreComment: true, spaces: 4};
// // let result = convert.json2xml(jsObject, options);
// // console.log(result);
   // console.log(util.inspect(shippingTemplate, {showHidden: false, depth: null, colors: true}))
    // let xml = fs.readFileSync('test.xml', 'utf8');
    // let jsFromXml = convert.xml2js(xml, {compact: false, spaces: 4});
    // console.log(util.inspect(jsFromXml, {showHidden: false, depth: null, colors: true}))
    // console.log(util.inspect(convertedResult, {showHidden: false, depth: null, colors: true}))
// };
