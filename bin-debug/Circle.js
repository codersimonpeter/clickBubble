var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(cx, cy, cr) {
        var _this = _super.call(this) || this;
        _this.colorList = [
            13408665, 16777113, 67109937, 16750848, 16776960, 39372,
            13421721, 13382553, 10079232, 16737894, 16776960, 3381708,
            13395456, 10066329, 13421619, 16750899, 16777164, 39219,
            13421772, 16737894, 16737792, 16777062, 13395507, 39372,
            16764057, 13395456, 13369446, 16763955, 16750848, 6737151
        ];
        _this.init(cx, cy, cr);
        return _this;
    }
    Circle.prototype.init = function (cx, cy, cr) {
        this.color = this.randomColor();
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0, 0, cr);
        this.shape.graphics.endFill();
        this.shape.x = cr;
        this.shape.y = cr;
        this.shapeX = cx;
        this.shapeY = cy;
        this.shapeR = cr;
        this.addChild(this.shape);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.x = cx;
        this.y = cy;
    };
    Circle.prototype.onTouch = function (e) {
        var par = this.parent;
        this.touchEnabled = false;
        var tw = egret.Tween.get(this);
        tw.to({ alpha: 0.1 }, 500, egret.Ease.sineOut);
        tw.call(function () {
            this.visible = false;
            par.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this);
        }, this);
        // 画四个小圆
        var circleList = [];
        var tweenList = [];
        var r = this.shapeR / 2;
        var tempX;
        var tempY;
        var tempR;
        var g = 0;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                tempX = this.shapeX + r * 2 * j;
                tempY = this.shapeY + r * 2 * i;
                circleList[g] = new Circle(tempX, tempY, r);
                circleList[g].alpha = 0.1;
                circleList[g].scaleX = 0.8;
                circleList[g].scaleY = 0.8;
                par.addChild(circleList[g]);
                tweenList[g] = egret.Tween.get(circleList[g]);
                tweenList[g].to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.sineIn);
                g++;
            }
        }
    };
    // 获取颜色
    Circle.prototype.randomColor = function () {
        return this.colorList[Math.round(Math.random() * this.colorList.length)];
    };
    return Circle;
}(egret.Sprite));
__reflect(Circle.prototype, "Circle");
//# sourceMappingURL=Circle.js.map