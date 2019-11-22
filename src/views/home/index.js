import React, { Component } from 'react'
import Aux from "../../hoc/_Aux";
import {NavLink} from 'react-router-dom';
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";

import '../../assets/css/main.css';
import '../../assets/css/util.css';
import Background1 from '../../assets/images/bg01.jpg';
import Background2 from '../../assets/images/bg02.jpg';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


var sectionStyle1 = {
    backgroundImage: `url(${Background1})`
};

var sectionStyle2 = {
    backgroundImage: `url(${Background2})`
};

class Home extends React.Component {
    componentDidMount() {
        $('.simpleslide100').each(function(){
            var delay = 7000;
            var speed = 1000;
            var itemSlide = $(this).find('.simpleslide100-item');
            var nowSlide = 0;

            $(itemSlide).hide();
            $(itemSlide[nowSlide]).show();
            nowSlide++;
            if(nowSlide >= itemSlide.length) {nowSlide = 0;}

            setInterval(function(){
                $(itemSlide).fadeOut(speed);
                $(itemSlide[nowSlide]).fadeIn(speed);
                nowSlide++;
                if(nowSlide >= itemSlide.length) {nowSlide = 0;}
            },delay);
        });
    }
    render() {
        return (
            <Aux>
                <Breadcrumb/>
                <div>
                    <div className="simpleslide100">
                        <div className="simpleslide100-item bg-img1" style={sectionStyle1}/>
                        <div className="simpleslide100-item bg-img1" style={sectionStyle2}/>
                    </div>

                    <div className="flex-col-c-sb size1 overlay1">
                        <div className="w-full flex-w flex-sb-m p-l-80 p-r-80 p-t-22 p-lr-15-sm">
                            <div className="wrappic1 m-r-30 m-t-10 m-b-10">
                            </div>

                            <div className="flex-w m-t-10 m-b-10">
                                <a href="#" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                    <i className="feather icon-smartphone auth-icon"/>
                                </a>
                                &nbsp;
                                <NavLink to="/auth/signup" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                    <i className="feather icon-user-plus auth-icon"/>
                                </NavLink>
                                &nbsp;
                                <NavLink to="/auth/signin" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                    <i className="feather icon-unlock auth-icon"/>
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex-col-c-m p-l-15 p-r-15 p-t-50 p-b-120">
                            <h3 className="l1-txt1 txt-center p-b-40 respon1">
                                Argo is Coming Soon
                            </h3>

                            <div className="flex-w flex-c-m cd100">
                                <div className="flex-col-c wsize1 m-b-30">
                                    <span className="l1-txt2 p-b-9 year">2020Y</span>
                                </div>

                                <div className="flex-col-c wsize1 m-b-30">
                                    <span className="l1-txt2 p-b-9 quarter">1Q</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-w flex-c-m p-b-35">
                            <a href="#" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                <i className="fa fa-facebook"/>
                            </a>

                            <a href="#" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                <i className="fa fa-twitter"/>
                            </a>

                            <a href="#" className="size3 flex-c-m how-social trans-04 m-r-3 m-l-3 m-b-5">
                                <i className="fa fa-youtube-play"/>
                            </a>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}
export default Home;
