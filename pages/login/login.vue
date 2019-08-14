<template>
	<view class="content">
		<view class="header">欢迎来到动画绘本馆</view>
		<view class="form">
			<view class="form_list">
				<input maxlength='11' v-model.trim="customerName" confirmType='完成' placeholder='请输入账号' placeholder-class="placeholderClass" />
			</view>
			<view class="form_list" v-if="!passwordShow">
				<input type="password" v-model.trim="password" confirmType='完成' placeholder='请输入密码' placeholder-class="placeholderClass" />
				<image src="../../static/hidden.png" mode="" @click="passwordShow=true"></image>
			</view>
			<view class="form_list" v-else>
				<input type="text" v-model.trim="password" confirmType='完成' placeholder='请输入密码' placeholder-class="placeholderClass" />
				<image src="../../static/visible.png" mode="" @click="passwordShow=false"></image>
			</view>
		</view>
		<button class="login_btn" type="primary" @click="login">登录</button>
	</view>
</template>

<script>
	import request from "@/utils/request"
	import { CacheManager } from "@/utils/index"
	export default {
		data() {
			return {
				title: 'Hello',
				customerName: "",
				password: "",
				passwordShow: false,
				model: ""
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.model = res.model
					console.log(res.model);
					console.log(res.pixelRatio);
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					console.log(res.language);
					console.log(res.version);
					console.log(res.platform);
				}
			});
		},
		onNavigationBarButtonTap(e) {
			uni.showToast({
				title:'点击了分享'
			})
			uni.navigateTo({
				url: '/pages/about/about'
			});
		},
		methods: {
			login() {
				let { customerName, password, model } = this.$data
				request('ella.home.login', {
					customerName,
					loginType: 'APP',
					resource: model,
					password,
				}).then((res) => {
					if (res.status === '1') {
						let { uid, mobile, name, icon, userType, classInfo } = res.data
						let { classCode } = classInfo[0]
						CacheManager.set({ uid, mobile, name, icon, userType, model, classCode})
						
						console.log(CacheManager.get('uid'))
						console.log(CacheManager.get('mobile'))
						console.log(CacheManager.get('name'))
						console.log(CacheManager.get('icon'))
						console.log(CacheManager.get('userType'))
						console.log(CacheManager.get('model'))
						console.log(CacheManager.get('classCode'))
						
						uni.reLaunch({
							url: '../index/index',
							animationType: 'pop-in'
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: none
						})
					}

				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 200upx;
	}

	.header {
		font-size: 42upx;
		font-weight: 700;
		text-align: center;
		margin-bottom: 100upx;
	}

	.form {
		width: 75%;
	}

	.form_list {
		border: 1upx solid #2C405A;
		height: 90upx;
		margin-bottom: 42upx;
		padding-left: 32upx;
		border-radius: 45upx;
		display: flex;
		align-items: center;
	}

	.form_list input {
		height: 60%;
		font-size: 32upx;
		flex: 1;
	}

	.form_list image {
		width: 56upx;
		height: 56upx;
		margin: 0 24upx;
	}

	.placeholderClass {
		font-size: 32upx;
	}

	.login_btn {
		margin-top: 42upx;
		border-radius: 40upx;
		width: 75%;
		background-color: #50E3C2 !important;
	}
</style>
