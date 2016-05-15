require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//  获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

// 利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = ( function genImageURL(imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i<j ; i++) {
      let singleImageData = imageDatasArr[i];

      singleImageData.imageURL = require('../images/' + singleImageData.fileName );

      imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);


class AppComponent extends React.Component {

  Constant: {

      centerPos: {
        left: 0,
        right: 0
      },

      hPosRange: {   //  水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },

      vPosRange: {   //  垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
  },

  /*
  * 重新布局所有的图片
  *@param centerIndex 指定居中排布哪个图片
  */

  rearrange: function() {
    let imgsArrangeArr = this.stage.imgsArrangeArr,
    Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,

    imgsArrangeTopArr = [],
    topImgNum = Math.ceil(Math.random() * 2),
    // 取一个或者不取
    topImgSpliceIndex = 0,

    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    //  居中centerINdex 的图片
    imgsArrangeCenterArr[0].pos = centerPos;

  },

  getInitialStage: function() {
    return {
      imgsArrangeArr : [
        // {
        //     pos: {
        //       left: '0',
        //       top: '0'
        //     }
        // }
      ]
    };
  },

  //  组件加载以后， 为每张图片计算其位置的范围
  componentDidMount: function() {

    //  首先拿到舞台的大小

    let stageDOM = React.findDOMNode(this.refs.stage),
         stageW = stageDOM.scrollWidth,
         stageH = stageDOM.scrollHeight,
         halfStageW = Math.ceil( stageW / 2 ),
         halfStageH = Math.ceil( stageH / 2 );

    //  拿到一个imageFigure的大小
    let imgFigureDOM = React.findDOMNode( this.refs.imgFigure0 ),
         imgW = imgFigureDOM.scrollWidth,
         imgH = imgFigureDOM.scrollHeight,
         halfImgW = Math.ceil(imgW / 2),
         halfImgH = Math.ceil(imgH / 2);


      this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfStageH
      }

      //  计算左侧，右侧图片排布位置的取值范围
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
      this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = halfStageH -halfImgH;


      //  计算上侧图片排布位置的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.Constant.vPosRange.x[0] = halfImgW - imgW;
      this.Constant.vPosRange.x[1] = halfImgW;

      this.rearrange(0);

  },

  render: function() {

    let controllerUnitd = [],
         imgFigures = [];

    imageDatas.forEach( function(value, index) {

      if ( !this.state.imgsArrangeArr[index] ) {
        this.stage.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }

      imgFigures.push(<imgFigure data={value} ref={'imgFigure' + index }/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }

}

AppComponent.defaultProps = {
};

export default AppComponent;
