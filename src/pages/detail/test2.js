const data = [
    {
        "_id": "1",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639195430
    },
    {
        "_id": "2",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639213175
    },
    {
        "_id": "3",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639252693
    },
    {
        "_id": "4",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639253262
    },
    {
        "_id": "5",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639285219
    },
    {
        "_id": "6",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639339041
    },
    {
        "_id": "7",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639339662
    },
    {
        "_id": "8",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 0,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1639358697
    },
    {
        "_id": "9",
        "lrn": "lumistaging88d13149563e5712830c65fe631b830a47f2312d",
        "customer_id": 0,
        "connected": 1,
        "mac_hc": "64:e0:03:77:ba:0e",
        "home_id": 968,
        "time": 1640147997
    }
]
const data2 = []
console.log(data.length);
data2.push(data[0])

for (let index = 0; index < data.length;index) {
    for (let index2 = (index+1); index2 < (data.length); index2++) {
        if (data[index].connected != data[index2].connected){
            data2.push(data[index2])
            

            index=index2
            break
        }
    }
    
    console.log('index', index); //loop 7 
  if (index == (data.length-1)){
    break
  }
}
console.log(data2);



