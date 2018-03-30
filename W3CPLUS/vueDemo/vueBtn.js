/**
 * Created by MiracleTJF on 2018/2/7.
 */
Vue.component('vue-btn', {
    props: [
        'btnText',
        'btnType',
        'btnSize',
        'btnOutline',
        'btnActive',
        'btnBlock'
    ],
    template: `<button type="button" class="btn" :class='[computedType,computedSize,computedOutline,computedActive,computedBlock]'>{{btnText}}</button>`,
    computed : {
        computedType : function(){
            return this.btnType ? `btn-${this.btnType}` : ''
        },
        computedSize : function(){
            return this.btnSize ? `btn-${this.btnSize}` : ''
        },
        computedOutline : function(){
            return this.btnOutline? `btn-outline-${this.btnOutline}` : ''
        },
        computedActive : function(){
            return this.btnActive == 'true'? 'active':''
        },
        computedBlock : function(){
            return this.btnBlock == 'true'? 'btn-block':''
        }
    }
    }
)