const data = [
    {
        "_id": "61b42326e71e4a19733e2452",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639195430
    },
    {
        "_id": "61b46877e975f003660de062",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639213175
    },
    {
        "_id": "61b502d59466c01793124ea2",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639252693
    },
    {
        "_id": "61b5050e0a64074186258132",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639253262
    },
    {
        "_id": "61b581e388a59c24f51e7702",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639285219
    },
    {
        "_id": "61b654217820217be61f0fe2",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639339041
    },
    {
        "_id": "61b6568e6b187e1cf13b3572",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639339662
    },
    {
        "_id": "61b6a0e92724e5748e5b5612",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639358697
    },
    {
        "_id": "61c2ac1db73c0936033db466",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1640147997
    }
]
const data2 = []

data.forEach(myFunction)


function myFunction(value, index, array) {
    if (index <= (data.length - 2)) {
        data2.push({ fillColor: value.connected == 0 ? '#B8C3BF' : '#008C4F', x: value.connected == 0 ? "Offline" : "Online", y: [value.time, data[index + 1].time] })
    }
}

console.log({data2});