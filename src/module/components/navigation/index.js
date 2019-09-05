import _defineProperty from"@babel/runtime/helpers/defineProperty";import _slicedToArray from"@babel/runtime/helpers/slicedToArray";var _jsxFileName="/Users/mnshkv/develop/opensource/popupNavigation/lib/components/navigation/index.js";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}import React,{useState,useEffect,useRef}from'react';import{View,Dimensions,Animated,Alert,StatusBar}from'react-native';import PopUp from'./pop_up';var _Dimensions$get=Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var Navigator=function Navigator(props){var _useState=useState(null),_useState2=_slicedToArray(_useState,2),popUpScreen=_useState2[0],setPopUpScreen=_useState2[1];var background=new Animated.Value(0);var backgroundRef=useRef(background);var popupRef=useRef(React.createRef());var pages=props.pages;var initPage=pages.find(function(page){return page.init;})||pages[0];var scale=backgroundRef.current.interpolate({inputRange:[0,1],outputRange:[1,0.9],extrapolate:'clamp'});var border=backgroundRef.current.interpolate({inputRange:[0,1],outputRange:[0,12],extrapolate:'clamp'});var animateBackground=function animateBackground(value){Animated.spring(backgroundRef.current,{toValue:1,tension:68,friction:12,toValue:value,useNativeDriver:true}).start();};useEffect(function(){if(popUpScreen!=null){animateBackground(1);}else{animateBackground(0);}},[popUpScreen]);present=function present(name){var params=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var presentPage=pages.find(function(page){return page.name===name;});setPopUpScreen({name:presentPage.name,props:_objectSpread({},presentPage.props,{},params)});};dismiss=function dismiss(){var animted=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(animted){popupRef.current.snapTo(height);}setTimeout(function(){setPopUpScreen(null);},animted?150:0);};renderInitPage=function renderInitPage(){return React.createElement(initPage.screen,_objectSpread({},initPage.props,{present:present,dismiss:dismiss}));};renderPopUp=function renderPopUp(){if(!popUpScreen){return null;}var page=pages.find(function(p){return p.name===popUpScreen.name;});var renderContent=function renderContent(){return React.createElement(page.screen,_objectSpread({},popUpScreen.props,{dismiss:dismiss}));};return React.createElement(View,{style:[{flex:1,position:'absolute',top:0,left:0}],__source:{fileName:_jsxFileName,lineNumber:78}},React.createElement(StatusBar,{backgroundColor:'#000',animated:true,barStyle:"light-content",__source:{fileName:_jsxFileName,lineNumber:79}}),React.createElement(PopUp,{ref:popupRef,snapPoints:page.snapPoints||[50,height],renderContent:renderContent,dismiss:dismiss,scrollStyle:page.popupStyle,__source:{fileName:_jsxFileName,lineNumber:80}}));};return React.createElement(View,{style:{width:width,height:height,backgroundColor:'#000'},__source:{fileName:_jsxFileName,lineNumber:92}},React.createElement(StatusBar,{backgroundColor:'#fff',animated:true,barStyle:"dark-content",__source:{fileName:_jsxFileName,lineNumber:93}}),React.createElement(Animated.View,{style:{width:width,height:height,overflow:'hidden',transform:[{scale:scale}],backgroundColor:'#fff',borderRadius:border},__source:{fileName:_jsxFileName,lineNumber:94}},renderInitPage()),renderPopUp());};export default Navigator;
//# sourceMappingURL=index.js.map