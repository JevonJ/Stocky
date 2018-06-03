import React, { Component } from 'react';
{/*import Avatar from "react-robust-avatar";*/}

{/*import AVImage from '../../images/blank-avatar.png'*/}

class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Stocky</a>
            {/*<p>
              <h6>Jevon Jansz</h6>
                <Avatar
                  src="http://hifizz.com/content/images/2017/11/WechatIMG444.jpeg"
                  defaultSrc="http://hifizz.com/content/images/2017/11/WechatIMG4.jpeg"
                  size="50px"
                  shape="circle"
                />
            </p>*/}
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                <a class="nav-link" href="#">Sign out</a>
                </li>
            </ul>
          </nav>
        );
    }
}

export default Header;