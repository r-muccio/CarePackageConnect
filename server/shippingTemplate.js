let shippingTemplate = {
    declaration: { attributes: { version: '1.0', encoding: 'utf-8' } },
    // shippingTemplate.elements
    elements: [
        // shippingTemplate.elements[0]
        {
            type: 'element',
            name: 'mailing-scenario',
            attributes: { xmlns: 'http://www.canadapost.ca/ws/ship/rate-v4' },
            // shippingTemplate.elements[0].elements
            elements: [
            {
                type: 'element',
                name: 'quote-type',
                elements: [ { type: 'text', text: 'counter' } ]
            },
            {
                type: 'element',
                name: 'expected-mailing-date',
                elements: [ { type: 'text', text: '2022-05-23' } ]
            },
            {
                type: 'element',
                name: 'options',
                elements: [
                {
                    type: 'element',
                    name: 'option',
                    elements: [
                    {
                        type: 'element',
                        name: 'option-code',
                        elements: [ { type: 'text', text: 'LAD' } ]
                    }
                    ]
                }
                ]
            },
            {
            type: 'element',
            name: 'parcel-characteristics',
            elements: [
                {
                    type: 'element',
                    name: 'weight',
                    elements: [ { type: 'text', text: '0.5' } ]
                },
                {
                type: 'element',
                name: 'dimensions',
                elements: [
                    {
                        type: 'element',
                        name: 'length',
                        elements: [ { type: 'text', text: '25' } ]
                    },
                    {
                        type: 'element',
                        name: 'width',
                        elements: [ { type: 'text', text: '20' } ]
                    },
                    {
                        type: 'element',
                        name: 'height',
                        elements: [ { type: 'text', text: '10' } ]
                    }
                ]
                }
            ]
            },
            {
                type: 'element',
                name: 'origin-postal-code',
                elements: [ { type: 'text', text: 'L4R1L6' } ]
            },
            {
                type: 'element',
                name: 'destination',
                elements: [
                {
                    type: 'element',
                    name: 'domestic',
                    elements: [
                    {
                        type: 'element',
                        name: 'postal-code',
                        elements: [ { type: 'text', text: 'L1N1Y5' } ]
                    }
                    ]
                }
                ]
            }
        ]
        }
    ]
}

let shippingTemplateNoDimensions = {
        declaration: { attributes: { version: '1.0', encoding: 'utf-8' } },
        elements: [
            // shippingTemplateNoDimensions.elements[0]
            {
                type: 'element',
                name: 'mailing-scenario',
                attributes: { xmlns: 'http://www.canadapost.ca/ws/ship/rate-v4' },
                elements: [
                    // shippingTemplateNoDimensions.elements[0].elements[0]
                    {
                        type: 'element',
                        name: 'quote-type',
                        elements: [ { type: 'text', text: 'counter' } ]
                    },
                    // shippingTemplateNoDimensions.elements[0].elements[1]
                    {
                        type: 'element',
                        name: 'expected-mailing-date',
                        elements: [ 
                            // shippingTemplateNoDimensions.elements[0].elements[1].elements[0].text
                            { type: 'text', text: '2022-04-27' } 
                        ]
                    },
                // shippingTemplateNoDimensions.elements[0].elements[2]
                {
                    type: 'element',
                    name: 'options',
                    elements: [
                    // shippingTemplateNoDimensions.elements[0].elements[2].elements[0]
                        {
                            type: 'element',
                            name: 'option',
                            elements: [
                                {
                                    type: 'element',
                                    name: 'option-code',
                                    // shippingTemplateNoDimensions.elements[0].elements[2].elements[0].elements[0].elements[0].text
                                    elements: [ { type: 'text', text: 'LAD' } ]
                                }
                            ]
                        }
                    ]
                },
                // shippingTemplateNoDimensions.elements[0].elements[3]
                {
                    type: 'element',
                    name: 'parcel-characteristics',
                    elements: [
                        {
                            type: 'element',
                            name: 'weight',
                            elements: [ 
                                // shippingTemplateNoDimensions.elements[0].elements[3].elements[0].text
                                { type: 'text', text: '0.5' } 
                            ]
                        }
                    ]
                },
                // shippingTemplateNoDimensions.elements[0].elements[4]
                {
                    type: 'element',
                    name: 'origin-postal-code',
                    // shippingTemplateNoDimensions.elements[0].elements[4].elements[0].text
                    elements: [ { type: 'text', text: 'L4R1L6' } ]
                },
                // shippingTemplateNoDimensions.elements[0].elements[5]
                {
                    type: 'element',
                    name: 'destination',
                    elements: [
                        {
                            type: 'element',
                            name: 'domestic',
                            elements: [
                                {
                                    type: 'element',
                                    name: 'postal-code',
                                    elements: [ { type: 'text', text: 'L1N1Y5' } ]
                                }
                            ]
                        }
                    ]
                }
            ]
            }
        ]
    }

    // const findingValues = () => {
    //         // console.log(shippingTemplateNoDimensions.elements[0].elements[2].elements[0].elements);
    //         // console.log(shippingTemplateNoDimensions.elements[0].elements[2].name);
    //         console.log(shippingTemplateNoDimensions.elements[0].elements[1].elements[0].text)

    //     let mailingDate = shippingTemplateNoDimensions.elements[0].elements[1].elements[0].text;

    // }

    // findingValues();

    // module.exports = {shippingTemplateNoDimensions};

    export default shippingTemplate;


// let shippingTemplateNoDimensions = {
//     declaration: { attributes: { version: '1.0', encoding: 'utf-8' } },
//         elements: [
//             {
//             type: 'element',
//             name: 'mailing-scenario',
//             attributes: {xmlns: 'http://www.canadapost.ca/ws/ship/rate-v4'},
//             elements: [
//                 { 
//                     type: 'element', 
//                     name: 'quote-type', 
//                     elements: [ { type: 'text', text: 'counter' } ] 
//                 },
//                 {
//                     type: 'element',
//                     name: 'expected-mailing-date',
//                     elements: [ { type: 'text', text: '2022-04-25' } ]
//                 },
//                 { 
//                     type: 'element', 
//                     name: 'options', 
//                     elements: [ 
//                         { 
//                             type: 'element', 
//                             name: 'option', 
//                             elements: [ {
//                                 type: 'element',
//                                 name: 'option',
//                                 elements: [ 
//                                     { 
//                                         type: 'element', 
//                                         name: 'option-code', 
//                                         elements: [Array] 
//                                     } 
//                                 ]
//                             } ] 
//                         } 
//                     ] 
//                 },
//                 {
//                     type: 'element',
//                     name: 'parcel-characteristics',
//                     elements: [ 
//                         { 
//                             type: 'element', 
//                             name: 'weight', 
//                             elements: [ [Object] ] 
//                         } 
//                     ]
//                 },
//                 {
//                     type: 'element',
//                     name: 'origin-postal-code',
//                     elements: [ 
//                         { 
//                             type: 'text', 
//                             text: 'L4R1L6' 
//                         } 
//                     ]
//                 },
//                 { 
//                     type: 'element', 
//                     name: 'destination', 
//                     elements: [ 
//                         { 
//                             type: 'element', 
//                             name: 'domestic', 
//                             elements: [ [Object] ] 
//                         } 
//                     ] 
//                 }]
//                 }
//         ]
// }