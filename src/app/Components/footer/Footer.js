import React from 'react'
import blog_logo_image from "../../assets/blog-logo-image.png";
import "./footer.css"
export const Footer = () => {
  return (
    <>
      
          {/* <!-- open--> */}
          <div className="more_details">
            <div id="first">
            <img src={blog_logo_image} id="allBlog-logo" alt="blog-icon"/>
              <p>
                Find a workplace that works for
                <br />
                you NEW Discover what an employer
                <br />
                is really like before you make
                <br />
                your next move..
              </p>
            </div>

            <div id="first">
              <h5> Company Info</h5>
              <p>
                About Us
                <br />
                Careers
                <br />
                FAQ
                <br />
                Feedback
              </p>
            </div>

            <div id="first">
              <h5>Information</h5>
              <p>
                Customer Service
                <br />
                Woot's Return Policy
                <br />
                Product Warranty
                <br />
                Product Recall Notices
              </p>
            </div>

            <div id="first">
              <h5>Customer Care</h5>
              <p>
                Facebook
                <br />
                Twitter
                <br />
                Forums
                <br />
                Everything But Woot
              </p>
            </div>
          </div> {/* !-- close --> */}  
    </>
  )
}
