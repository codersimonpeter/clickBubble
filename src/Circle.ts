class Circle extends egret.Sprite{

    // public static Event_Click:string = "event_click"; // 事件类型

    private shape: egret.Shape;
    private shapeX: number;
    private shapeY: number;
    private shapeR: number;
    private color: number;
    private colorList:number[] = [
        13408665,16777113,67109937,16750848,16776960,39372,
        13421721,13382553,10079232,16737894,16776960,3381708,
        13395456,10066329,13421619,16750899,16777164,39219,
        13421772,16737894,16737792,16777062,13395507,39372,
        16764057,13395456,13369446,16763955,16750848,6737151
    ];

    public constructor(cx: number, cy: number, cr: number){
        super();
        this.init(cx, cy, cr);
    }


    private init(cx: number, cy: number, cr: number){
        this.color = this.randomColor();
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0,0,cr);
        this.shape.graphics.endFill();

        this.shape.x = cr;
        this.shape.y = cr;

        this.shapeX = cx;
        this.shapeY = cy;
        this.shapeR = cr;
        this.addChild(this.shape);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        this.x = cx;
        this.y = cy;
    }

    private onTouch(e:egret.TouchEvent){
        let par = this.parent;
        this.touchEnabled = false;
        let tw = egret.Tween.get(this);
        tw.to({alpha:0.1},500,egret.Ease.sineOut);
        tw.call(function(){
            this.visible = false;
            par.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this);
        },this);
        // 画四个小圆
        let circleList:Circle[] = [];
        let tweenList:egret.Tween[] = [];
        let r = this.shapeR / 2;

        let tempX: number;
        let tempY: number;
        let tempR: number;
        let g: number = 0;

        for(let i = 0;i<2;i++){
            for(let j = 0;j<2;j++){
                tempX = this.shapeX + r*2*j;
                tempY = this.shapeY + r*2*i;
                circleList[g] = new Circle(tempX,tempY,r);
                circleList[g].alpha = 0.1;
                circleList[g].scaleX = 0.8;
                circleList[g].scaleY = 0.8;
                par.addChild(circleList[g]);
                tweenList[g] = egret.Tween.get(circleList[g]);
                tweenList[g].to({alpha:1,scaleX:1,scaleY:1},1000,egret.Ease.sineIn);
                g++;
            }
        }

    }
    // 获取颜色
    private randomColor():number {
        return this.colorList[Math.round(Math.random()*this.colorList.length)];
    }
}