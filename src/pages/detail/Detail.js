import React, { useState } from "react";
import { FormText } from "reactstrap";

const Detail = function (props) {

    console.log(props.location.state);

  return (
    <div>
   <FormText>{props.location.state}</FormText>
    </div>
  )
}

export default Detail;
