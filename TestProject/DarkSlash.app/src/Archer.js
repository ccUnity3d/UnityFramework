/**
* Created by yuan on 14-8-8.
*/
/// <reference path="DistantEnemy" />
/// <reference path="Missile/Arrow" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Archer = (function (_super) {
    __extends(Archer, _super);
    Archer["__ts"]=true;
    function Archer() {
        if(_super.__ts){_super.apply(this, arguments)}else if(typeof _super.prototype.ctor==="function"){_super.prototype.ctor.apply(this, arguments)};
    }
    Archer.prototype._readyToAttack = function (dir) {
        this.setState(3 /* READY_ATTACK */);
        var pullBow = cc.CallFunc.create(function () {
            vee.Audio.playEffect("sfx_bow_pull.mp3");
            this._setPreAttackAnimate(dir);
        }.bind(this));
        var delay = cc.DelayTime.create(this._attackPrepareTime);
        var blade = cc.CallFunc.create(function () {
            var angle = vee.Utils.angleOfLine(this.getPosition(), this._runningDestPos);
            this.attack(angle);
        }, this);
        var seq = cc.Sequence.create(pullBow, delay, blade);
        seq.setTag(4 /* READY_ATTACK */);
        this.runAction(seq);
    };
    Archer.prototype.shoot = function (angle) {
        if (!this._missileListener || !this._missileListener.onAddMissile) {
            return;
        }
        var containerSize = this.getParent().getContentSize();
        var longestDistanceOfContainer = Math.sqrt(Math.pow(containerSize.width, 2) * Math.pow(containerSize.height, 2));
        var longestPos = vee.Utils.getPointWithAngle(cc.p(0, 0), longestDistanceOfContainer, angle);
        var moveTo = cc.MoveTo.create(vee.Utils.distanceBetweenPoints(this.getPosition(), longestPos) / this._attackSpeed, longestPos);

        var arrow = new Arrow(this._missileListener.getMissileActionManager());
        this._missileListener.onAddMissile(arrow);
        arrow.setOwner(this);
        arrow.setPosition(this.getPosition());
        arrow.setRotation(angle);
        moveTo.setTag(0 /* FLYING */);
        arrow.runAction(moveTo);
    };
    Archer.prototype._afterAttack = function (angle) {
        this.setState(5 /* AFTER_ATTACK */);
        this._attackAnimate(angle);
        var delay = cc.DelayTime.create(this._afterAttackDuration);
        var callback = cc.CallFunc.create(function () {
            this.setState(1 /* STATIC */);
        }, this);
        var seq = cc.Sequence.create(delay, callback);
        seq.setTag(6 /* AFTER_ATTACK */);
        this.runAction(seq);
    };
    return Archer;
})(DistantEnemy);
