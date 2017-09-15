
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private table:egret.DisplayObjectContainer;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let stageWidth = this.stage.stageWidth;
        let stageHeight = this.stage.stageHeight;

        let bg = new egret.Bitmap();
        let data: egret.Texture = RES.getRes("back_jpg");
        bg.texture = data;
        bg.width = stageWidth;
        bg.height = stageHeight;
        this.addChild(bg);

        this.table = new egret.DisplayObjectContainer();
        this.addChild(this.table);

        this.refresh();

        let simon = new egret.Bitmap();
        simon.texture = RES.getRes("simon_png");
        simon.width = 110;
        simon.height = 110;
        this.addChild(simon);
        simon.touchEnabled = true;
        simon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.refresh,this);
        simon.x = 50;
        simon.y = 720;

        // 创建提示信息
        let msg:egret.TextField = new egret.TextField();
        msg.text = "不开心的时候就捏捏这个，希望你每天都过得开心~~"
        msg.width = 350;
        msg.height = 300;
        msg.textColor = 0x000000;
        this.addChild(msg);
        msg.x = 180;
        msg.y = 730;
        // 创建版本标志
        let vers: egret.TextField = new egret.TextField();
        vers.text = "version：1.0\n\nauthor：Simon\n";
        vers.width = 200;
        vers.height = 300;
        vers.size = 16;
        vers.x = 10;
        vers.y = 890;
        this.addChild(vers);

        let info:egret.TextField = new egret.TextField();
        info.text = "power by egret";
        info.width = 200;
        info.height = 100;
        info.size = 16;
        info.x = 400;
        info.y = 920;
        this.addChild(info);
        // let 
    }

    private refresh(){
        this.table.removeChildren();
        let r = 50;
        for(let i = 0;i<6;i++){
            for(let j = 0;j<5;j++){
                let x:number = 20+r*2*j;
                let y:number = 40+r*2*i;
                let circle = new Circle(x,y,r);
                this.table.addChild(circle);
            }
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


