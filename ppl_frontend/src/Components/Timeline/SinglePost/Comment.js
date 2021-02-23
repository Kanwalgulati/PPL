import React from 'react'
const Comment = (props) => {
    let userName = ""
    let comment = ""
    console.log("Comment : ",props.data)
    return(
        <>
            {/* {console.log("Hello",props.data.comment)} */}
        <li>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">{userName}</div>
                    </div>
                    <div className="list_info">
                        {comment}
                    </div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
        </>
    )
}
export default Comment