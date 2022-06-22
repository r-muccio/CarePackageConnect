let shippingReceiveTemplate = {
    declaration: { attributes: { version: '1.0', encoding: 'UTF-8' } },
    elements: [
        // shippingReceiveTemplate.elements[0]
        {
            type: 'element',
            name: 'price-quotes',
            attributes: { xmlns: 'http://www.canadapost.ca/ws/ship/rate-v4' },
            elements: [
            // shippingReceiveTemplate.elements[0].elements[0]
            // highestEls
            {
                type: 'element',
                name: 'price-quote',
                elements: [
                // higherEls
                {
                    type: 'element',
                    name: 'service-code',
                    elements: [ { type: 'text', text: 'DOM.PC' } ]
                },
                {
                    type: 'element',
                    name: 'service-link',
                    attributes: {
                    rel: 'service',
                    href: 'https://ct.soa-gw.canadapost.ca/rs/ship/service/DOM.PC?country=CA',
                    'media-type': 'application/vnd.cpc.ship.rate-v4+xml'
                    }
                },
                {
                    type: 'element',
                    name: 'service-name',
                    elements: [ { type: 'text', text: 'Priority' } ]
                },
                {
                    type: 'element',
                    name: 'price-details',
                    elements: [
                    // middleEls
                    {
                        type: 'element',
                        name: 'base',
                        elements: [ { type: 'text', text: '27.09' } ]
                    },
                    {
                        type: 'element',
                        name: 'taxes',
                        elements: [
                        // lowerEls
                        {
                            type: 'element',
                            name: 'gst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'pst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'hst',
                            attributes: { percent: '13.000' },
                            elements: [ { type: 'text', text: '4.61' } ]
                        }
                        ]
                    },
                    // middleEls
                    {
                        type: 'element',
                        name: 'due',
                        elements: [ { type: 'text', text: '40.10' } ]
                    },
                    {
                        type: 'element',
                        name: 'options',
                        elements: [
                        // lowerEls
                        {
                            type: 'element',
                            name: 'option',
                            elements: [
                            // lowestEls
                            {
                                type: 'element',
                                name: 'option-code',
                                elements: [ { type: 'text', text: 'DC' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Delivery confirmation'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        },
                        // lowerEls
                        {
                            type: 'element',
                            name: 'option',
                            elements: [
                            // lowestEls
                            {
                                type: 'element',
                                name: 'option-code',
                                elements: [ { type: 'text', text: 'LAD' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Leave at door - do not card'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    },
                    // middleEls
                    {
                        type: 'element',
                        name: 'adjustments',
                        elements: [
                        // lowerEls
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            // lowestEls
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'FUELSC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'Fuel surcharge' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '8.40' } ]
                            },
                            {
                                type: 'element',
                                name: 'qualifier',
                                elements: [
                                {
                                    type: 'element',
                                    name: 'percent',
                                    elements: [ { type: 'text', text: '31.0' } ]
                                }
                                ]
                            }
                            ]
                        },
                        // lowerEls
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'V1DISC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'SMB Savings' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    }
                    ]
                },
                // higherEls
                {
                    type: 'element',
                    name: 'weight-details',
                    elements: [
                    {
                        type: 'element',
                        name: 'cubed-weight',
                        elements: [ { type: 'text', text: '2.4' } ]
                    }
                    ]
                },
                {
                    type: 'element',
                    name: 'service-standard',
                    elements: [
                    {
                        type: 'element',
                        name: 'am-delivery',
                        elements: [ { type: 'text', text: 'false' } ]
                    },
                    {
                        type: 'element',
                        name: 'guaranteed-delivery',
                        elements: [ { type: 'text', text: 'true' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-transit-time',
                        elements: [ { type: 'text', text: '2' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-delivery-date',
                        elements: [ { type: 'text', text: '2022-05-19' } ]
                    }
                    ]
                }
                ]
            },
            {
                type: 'element',
                name: 'price-quote',
                elements: [
                {
                    type: 'element',
                    name: 'service-code',
                    elements: [ { type: 'text', text: 'DOM.RP' } ]
                },
                {
                    type: 'element',
                    name: 'service-link',
                    attributes: {
                    rel: 'service',
                    href: 'https://ct.soa-gw.canadapost.ca/rs/ship/service/DOM.RP?country=CA',
                    'media-type': 'application/vnd.cpc.ship.rate-v4+xml'
                    }
                },
                {
                    type: 'element',
                    name: 'service-name',
                    elements: [ { type: 'text', text: 'Regular Parcel' } ]
                },
                {
                    type: 'element',
                    name: 'price-details',
                    elements: [
                    {
                        type: 'element',
                        name: 'base',
                        elements: [ { type: 'text', text: '12.71' } ]
                    },
                    {
                        type: 'element',
                        name: 'taxes',
                        elements: [
                        {
                            type: 'element',
                            name: 'gst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'pst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'hst',
                            attributes: { percent: '13.000' },
                            elements: [ { type: 'text', text: '2.16' } ]
                        }
                        ]
                    },
                    {
                        type: 'element',
                        name: 'due',
                        elements: [ { type: 'text', text: '18.81' } ]
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
                                elements: [ { type: 'text', text: 'DC' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Delivery confirmation'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            },
                            {
                                type: 'element',
                                name: 'qualifier',
                                elements: [
                                {
                                    type: 'element',
                                    name: 'included',
                                    elements: [ { type: 'text', text: 'true' } ]
                                }
                                ]
                            }
                            ]
                        },
                        {
                            type: 'element',
                            name: 'option',
                            elements: [
                            {
                                type: 'element',
                                name: 'option-code',
                                elements: [ { type: 'text', text: 'LAD' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Leave at door - do not card'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    },
                    {
                        type: 'element',
                        name: 'adjustments',
                        elements: [
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'FUELSC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'Fuel surcharge' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '3.94' } ]
                            },
                            {
                                type: 'element',
                                name: 'qualifier',
                                elements: [
                                {
                                    type: 'element',
                                    name: 'percent',
                                    elements: [ { type: 'text', text: '31.0' } ]
                                }
                                ]
                            }
                            ]
                        },
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'V1DISC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'SMB Savings' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    }
                    ]
                },
                {
                    type: 'element',
                    name: 'weight-details',
                    elements: [
                    {
                        type: 'element',
                        name: 'cubed-weight',
                        elements: [ { type: 'text', text: '2' } ]
                    }
                    ]
                },
                {
                    type: 'element',
                    name: 'service-standard',
                    elements: [
                    {
                        type: 'element',
                        name: 'am-delivery',
                        elements: [ { type: 'text', text: 'false' } ]
                    },
                    {
                        type: 'element',
                        name: 'guaranteed-delivery',
                        elements: [ { type: 'text', text: 'false' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-transit-time',
                        elements: [ { type: 'text', text: '3' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-delivery-date',
                        elements: [ { type: 'text', text: '2022-05-20' } ]
                    }
                    ]
                }
                ]
            },
            {
                type: 'element',
                name: 'price-quote',
                elements: [
                {
                    type: 'element',
                    name: 'service-code',
                    elements: [ { type: 'text', text: 'DOM.XP' } ]
                },
                {
                    type: 'element',
                    name: 'service-link',
                    attributes: {
                    rel: 'service',
                    href: 'https://ct.soa-gw.canadapost.ca/rs/ship/service/DOM.XP?country=CA',
                    'media-type': 'application/vnd.cpc.ship.rate-v4+xml'
                    }
                },
                {
                    type: 'element',
                    name: 'service-name',
                    elements: [ { type: 'text', text: 'Xpresspost' } ]
                },
                {
                    type: 'element',
                    name: 'price-details',
                    elements: [
                    {
                        type: 'element',
                        name: 'base',
                        elements: [ { type: 'text', text: '15.99' } ]
                    },
                    {
                        type: 'element',
                        name: 'taxes',
                        elements: [
                        {
                            type: 'element',
                            name: 'gst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'pst',
                            elements: [ { type: 'text', text: '0.00' } ]
                        },
                        {
                            type: 'element',
                            name: 'hst',
                            attributes: { percent: '13.000' },
                            elements: [ { type: 'text', text: '2.72' } ]
                        }
                        ]
                    },
                    {
                        type: 'element',
                        name: 'due',
                        elements: [ { type: 'text', text: '23.67' } ]
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
                                elements: [ { type: 'text', text: 'DC' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Delivery confirmation'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        },
                        {
                            type: 'element',
                            name: 'option',
                            elements: [
                            {
                                type: 'element',
                                name: 'option-code',
                                elements: [ { type: 'text', text: 'LAD' } ]
                            },
                            {
                                type: 'element',
                                name: 'option-name',
                                elements: [
                                {
                                    type: 'text',
                                    text: 'Leave at door - do not card'
                                }
                                ]
                            },
                            {
                                type: 'element',
                                name: 'option-price',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    },
                    {
                        type: 'element',
                        name: 'adjustments',
                        elements: [
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'FUELSC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'Fuel surcharge' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '4.96' } ]
                            },
                            {
                                type: 'element',
                                name: 'qualifier',
                                elements: [
                                {
                                    type: 'element',
                                    name: 'percent',
                                    elements: [ { type: 'text', text: '31.0' } ]
                                }
                                ]
                            }
                            ]
                        },
                        {
                            type: 'element',
                            name: 'adjustment',
                            elements: [
                            {
                                type: 'element',
                                name: 'adjustment-code',
                                elements: [ { type: 'text', text: 'V1DISC' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-name',
                                elements: [ { type: 'text', text: 'SMB Savings' } ]
                            },
                            {
                                type: 'element',
                                name: 'adjustment-cost',
                                elements: [ { type: 'text', text: '0' } ]
                            }
                            ]
                        }
                        ]
                    }
                    ]
                },
                {
                    type: 'element',
                    name: 'weight-details',
                    elements: [
                    {
                        type: 'element',
                        name: 'cubed-weight',
                        elements: [ { type: 'text', text: '2.4' } ]
                    }
                    ]
                },
                {
                    type: 'element',
                    name: 'service-standard',
                    elements: [
                    {
                        type: 'element',
                        name: 'am-delivery',
                        elements: [ { type: 'text', text: 'false' } ]
                    },
                    {
                        type: 'element',
                        name: 'guaranteed-delivery',
                        elements: [ { type: 'text', text: 'true' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-transit-time',
                        elements: [ { type: 'text', text: '2' } ]
                    },
                    {
                        type: 'element',
                        name: 'expected-delivery-date',
                        elements: [ { type: 'text', text: '2022-05-19' } ]
                    }
                    ]
                }
                ]
            }
            ]
        }
        ]
    }

    export default shippingReceiveTemplate;