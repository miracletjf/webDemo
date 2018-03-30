<template>
    <button type="button" class="btn"
            :class='[computedType,computedSize,computedOutline,computedActive,computedBlock]'>
        {{btnText}}
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props : {
            btnText: {
                type: String,
                default: ''
            },
            btnType: {
                type: String,
                default: ''
            },
            btnSize: {
                type: String,
                default: ''
            },
            btnOutline: {
                type: String,
                default: ''
            },
            btnActive: {

            },
            btnBlock: {

            }
        },
        component : {
            // 控制按钮的类型
            computedType: function () {
                return this.btnType ? `btn-${this.btnType}` : ''
            },
            // 控制按钮大小尺寸
            computedSize: function () {
                return this.btnSize ? `btn-${this.btnSize}` : ''
            },
            // 控制按钮边框
            computedOutline: function () {
                return this.btnOutline ? `btn-outline-${this.btnOutline}` : ''
            },
            // 控制按钮是否激活
            computedActive: function () {
                return  this.btnActive === 'true' ? 'active' : ''
            },
            // 控制按钮是否是块元素
            computedBlock: function () {
                return this.btnBlock === 'true' ? 'btn-block' : ''
            }
        }
    }
</script>

<style scoped>
    .btn {
        display: inline-block;
        font-weight: 400;
    }
</style>