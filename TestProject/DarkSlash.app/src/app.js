// Autogenerated main.js file

game.oShop = null;
game.firstOpen = false;
function main() {
    vee.init();
	vee.PopMgr.autoGarbageCollect();
    vee.Analytics.activate();
    vee.IAPMgr.activate();
    if (cc.sys.os === cc.sys.OS_ANDROID){
//        vee.Ad.activate();
	    LyIntro.show();
    }
	if (cc.sys.os === cc.sys.OS_IOS) {
		vee.GameCenter.activate();
		vee.GameCenter.login();
		vee.Utils.scheduleOnce(function(){
			vee.Ad.activate(function() {
			});
		}, 2);
		vee.PopMgr.closeLayer();
		if (app.Config.Platform == app.Config.Platforms.AND_HEGAME) {
			var musicEnable = vee.Utils.launchAppById("hegame_musicenable");
			vee.Audio.setMusicEnabled(musicEnable);
			vee.Audio.setSoundEnabled(musicEnable);
		}
		GameManager.getInstance().gameHome();
	}
    cc.director.setDisplayStats(false);

}
VeeQuitBox.enableDownload = false;

var HeadPhone = vee.Class.extend({
	onEnter : function() {
		this.playAnimate("show", function() {
			this.playAnimate("hide", function() {
				GameManager.getInstance().gameHome();
			});
		}.bind(this));
	}
});

HeadPhone.show = function() {
	vee.PopMgr.popCCB("res/headphone.ccbi");
};

var LyIntro = vee.Class.extend({
	onCreate : function() {
		var aniName = "open";
		if (app.Config.Platform == app.Config.Platforms.AND_EGAME) {
			aniName = "open_egame";
		}
		this.playAnimate(aniName, function() {
//			vee.Utils.checkSignature();
			vee.PopMgr.closeLayer();
			if (app.Config.Platform == app.Config.Platforms.AND_HEGAME) {
				var musicEnable = vee.Utils.launchAppById("hegame_musicenable");
				vee.Audio.setMusicEnabled(musicEnable);
				vee.Audio.setSoundEnabled(musicEnable);
			}
			GameManager.getInstance().gameHome();
			if (!DataManager.getInstance().isFirstAtHome()) {
//				BuyItemAlertCtl.showHome();
			}
		});
	}
});

LyIntro.show = function() {
	vee.PopMgr.popCCB("res/intro.ccbi");
};

vee.configWithUrlData = function(urlData){
//	vee.PopMgr.popCCB(res.vLoading_ccbi, true);
	vee.Utils.scheduleOnce(function() {
		vee.PopMgr.closeLayer(); // Close loading
		var arrUrlData = urlData.split(":");
		if (arrUrlData[0] === "exchange") {
			var exchangeCode = arrUrlData[1];
			if (parseInt(exchangeCode) == 0) {
				vee.PopMgr.alert("兑换码无效", "兑换失败");
			} else if (parseInt(exchangeCode) == -1) {
				vee.PopMgr.alert("兑换码验证失败", "兑换失败");
			} else if (parseInt(exchangeCode) > 0) {
				vee.PopMgr.closeLayer(); // Success. Close exchange layer.
				DataManager.getInstance().addSoul(parseInt(exchangeCode));
				vee.Analytics.logReward(parseInt(exchangeCode), "兑换码");
				if (game.oShop._soulCtl) {
					game.oShop._soulCtl.addNumber(parseInt(exchangeCode));
				}
				BuySuccessCtl.showWithData({
					type : 99,
					icon : "res/shop/s_icon_soul_1.png",
					name : "魂 x "+exchangeCode
				});
			}
		}
	});
};

var VeeAbout = vee.Class.extend({

	onConfirm : function() {
		vee.PopMgr.closeLayer();
	},

	onClose : function() {
		vee.PopMgr.closeLayer();
	}
});

VeeAbout.show = function() {
	vee.PopMgr.popCCB("res/vAbout.ccbi", true);
}

vee.configIAPPrices = function(arr) {

}