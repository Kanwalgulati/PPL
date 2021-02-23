import React, { Component } from 'react';

const CheckBox = () =>{
        return(
            <>
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
            </>
        )
}
export default CheckBox;