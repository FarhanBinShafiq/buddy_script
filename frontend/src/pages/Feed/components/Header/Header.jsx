import React from 'react';

const Header = () => {
  return (
    <>
      <div className="_header_nav_profile">
        <div className="_header_nav_profile_image">
          <img src="/assets/images/profile.png" alt="Image" className="_nav_profile_img" />
        </div>
        <div className="_header_nav_dropdown">
          <p className="_header_nav_para">Dylan Field</p>
          <button id="_profile_drop_show_btn" className="_header_nav_dropdown_btn _dropdown_toggle" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
              <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
            </svg>
          </button>
        </div>
        {/* dropdown */}
        <div id="_prfoile_drop" className="_nav_profile_dropdown _profile_dropdown">
          <div className="_nav_profile_dropdown_info">
            <div className="_nav_profile_dropdown_image">
              <img src="/assets/images/profile.png" alt="Image" className="_nav_drop_img" />
            </div>
            <div className="_nav_profile_dropdown_info_txt">
              <h4 className="_nav_dropdown_title">Dylan Field</h4>
              <a href="profile.html" className="_nav_drop_profile">
                View Profile
              </a>
            </div>
          </div>
          <hr />
          <ul className="_nav_dropdown_list">
            <li className="_nav_dropdown_list_item">
              <a href="#0" className="_nav_dropdown_link">
                <div className="_nav_drop_info">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                      <path fill="#377DFF" d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zm0 1.375h-1.17c-.287 0-.562.113-.764.312-.179.177-.288.41-.308.628l-.012.29c-.098 1.262-1.172 2.253-2.486 2.253a2.475 2.475 0 01-1.013-.231l-.182-.095a1.1 1.1 0 00-1.488.407l-.616.993a1.05 1.05 0 00.296 1.392l.247.153A2.43 2.43 0 013.181 9.5c0 .802-.401 1.552-1.095 2.023l-.147.091c-.486.276-.674.873-.448 1.342l.053.102.597 1.01c.14.248.374.431.652.509.246.069.51.05.714-.04l.103-.05a2.506 2.506 0 011.882-.248 2.456 2.456 0 011.823 2.1l.02.335c.059.535.52.95 1.079.95h1.17c.566 0 1.036-.427 1.08-.95l.005-.104a2.412 2.412 0 01.726-1.732 2.508 2.508 0 011.779-.713c.331.009.658.082.992.23l.3.15c.469.202 1.026.054 1.309-.344l.068-.105.61-1a1.045 1.045 0 00-.288-1.383l-.257-.16a2.435 2.435 0 01-1.006-1.389 2.393 2.393 0 01.25-1.847c.181-.31.429-.575.752-.795l.152-.095c.485-.278.672-.875.448-1.346l-.067-.127-.012-.027-.554-.945a1.095 1.095 0 00-1.27-.487l-.105.041-.098.049a2.515 2.515 0 01-1.88.259 2.47 2.47 0 01-1.511-1.122 2.367 2.367 0 01-.325-.97l-.012-.24a1.056 1.056 0 00-.307-.774 1.096 1.096 0 00-.779-.323zm-.58 5.02c1.744 0 3.16 1.39 3.16 3.105s-1.416 3.105-3.16 3.105c-1.746 0-3.161-1.39-3.161-3.105s1.415-3.105 3.16-3.105zm0 1.376c-.973 0-1.761.774-1.761 1.729 0 .955.788 1.73 1.76 1.73s1.76-.775 1.76-1.73-.788-1.73-1.76-1.73z" />
                    </svg>
                  </span>
                  Settings
                </div>
                <button type="submit" className="_nav_drop_btn_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                    <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                  </svg>
                </button>
              </a>
            </li>
            <li className="_nav_dropdown_list_item">
              <a href="#0" className="_nav_dropdown_link">
                <div className="_nav_drop_info">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path stroke="#377DFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19a9 9 0 100-18 9 9 0 000 18z" />
                      <path stroke="#377DFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009" />
                    </svg>
                  </span>
                  Help & Support
                </div>
                <button type="submit" className="_nav_drop_btn_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                    <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                  </svg>
                </button>
              </a>
            </li>
            <li className="_nav_dropdown_list_item">
              <a href="#0" className="_nav_dropdown_link">
                <div className="_nav_drop_info">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                      <path stroke="#377DFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667" />
                    </svg>
                  </span>
                  Log Out
                </div>
                <button type="submit" className="_nav_drop_btn_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                    <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                  </svg>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="_header_mobile_menu">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_header_mobile_menu_top_inner">
              <div className="_header_mobile_menu_logo">
                <a href="feed.html" className="_mobile_logo_link">
                  <img src="/assets/images/logo.svg" alt="Image" className="_nav_logo" />
                </a>
              </div>
              <div className="_header_mobile_menu_right">
                <form className="_header_form_grp">
                  <a href="#0" className="_header_mobile_search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                      <circle cx="7" cy="7" r="6" stroke="#666" />
                      <path stroke="#666" stroke-linecap="round" d="M16 16l-3-3" />
                    </svg>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="_mobile_navigation_bottom_wrapper">
        <div className="_mobile_navigation_bottom_wrap">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <ul className="_mobile_navigation_bottom_list">
                  <li className="_mobile_navigation_bottom_item">
                    <a href="feed.html" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
                        <path className="_mobile_svg" fill="#000" fillOpacity=".6" stroke="#666666" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z" />
                        <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z" />
                      </svg>
                    </a>
                  </li>
                  <li className="_mobile_navigation_bottom_item">
                    <a href="friend-request.html" className="_mobile_navigation_bottom_link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
                        <path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zm9.742-2.27c2.967.432 3.59 1.787 3.59 2.849 0 .648-.261 1.83-2.013 2.48a.953.953 0 01-.327.058.919.919 0 01-.858-.575.886.886 0 01.531-1.153c.83-.307.83-.647.83-.81 0-.522-.682-.886-2.027-1.082a.9.9 0 01-.772-1.017c.074-.488.54-.814 1.046-.75zm-18.439.75a.9.9 0 01-.773 1.017c-1.345.196-2.027.56-2.027 1.082 0 .163 0 .501.832.81a.886.886 0 01.531 1.153.92.92 0 01-.858.575.953.953 0 01-.327-.058C.262 16.6 0 15.418 0 14.77c0-1.06.623-2.417 3.592-2.85.506-.061.97.263 1.045.751zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0zm0 1.787c-2.072 0-3.758 1.64-3.758 3.655-.003.977.381 1.89 1.085 2.58a3.772 3.772 0 002.642 1.076l.03.894v-.894c2.073 0 3.76-1.639 3.76-3.656 0-2.015-1.687-3.655-3.76-3.655zm7.58-.62c2.153.344 3.717 2.136 3.717 4.26-.004 2.138-1.647 3.972-3.82 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zM6.81 1.903a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li className="_mobile_navigation_bottom_item">
                    <a href="no" className="_mobile_navigation_bottom_link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none" viewBox="0 0 25 27">
                        <path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.935 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0zm0 1.842C8.13 1.842 4.97 5.204 4.97 8.22c0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.041-1.41-2.221-1.41-4.774 0-3.017-3.161-6.38-7.696-6.38z" clipRule="evenodd" />
                      </svg>
                      <span className="_counting">6</span>
                    </a>
                  </li>
                  <li className="_mobile_navigation_bottom_item">
                    <a href="chat_list(for_mbl).html" className="_mobile_navigation_bottom_link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0zm.001 1.663a10.293 10.293 0 00-7.304 3.003A10.253 10.253 0 002.63 16.244c.261.642.514 1.267.514 1.917 0 .649-.225 1.302-.422 1.878-.163.475-.41 1.191-.252 1.349.156.16.881-.092 1.36-.255.576-.195 1.228-.42 1.874-.424.648 0 1.259.244 1.905.503 3.96 1.818 8.645.99 11.697-2.039 4.026-4 4.026-10.509 0-14.508a10.294 10.294 0 00-7.303-3.002zm4.407 9.607c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01zm-4.476 0c.616 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.121-1.11c0-.613.493-1.108 1.11-1.108h.01zm-4.477 0c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01z" clipRule="evenodd" />
                      </svg>
                      <span className="_counting">2</span>
                    </a>
                  </li>
                  <div className="_header_mobile_toggle">
                    <form action="/mobileMenu.html">
                      <button type="submit" className="_header_mobile_btn_link" value="go to mobile menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                          <path stroke="#666" strokeLinecap="round" strokeWidth="1.5" d="M1 1h16M1 7h16M1 13h16" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;