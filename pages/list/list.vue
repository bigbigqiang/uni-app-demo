<template>
	<view class="content">
		<uni-nav-bar style="width: 100%;" left-icon="back" left-text="返回" title="动画绘本馆" fixed="true" @click-left="pageBack"></uni-nav-bar>
		<view class="status_bar"></view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in bannerList" v-bind:key="item.bannerCode">
				<view class="swiper-item">
					<image :src="item.bannerImageUrl"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="wiki">
			<view class="wiki_item" v-for="(item,index) in wikiList" :key="item.id">
				<image :src="item.imageUrl"></image>
				<text>{{item.sortTitle}}</text>
			</view>
		</view>
		<view class="block">
			<view class="header">今日推荐</view>
			<image class="recommend_image" :src="subjectDetails.topicImg"></image>
			<text class="topicTitle">{{subjectDetails.topicTitle}}</text>
		</view>
		
		<view class="block">
			<view class="header">免费专区</view>
			<view class="book_list">
				<view class="book_item" v-for="(item,index) in bookList" :key="item.bookCode">
					<image :src="item.coverUrl"></image>
					<text>{{item.bookName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import request from "@/utils/request"
	import { CacheManager } from "@/utils/index"
	export default {
		data() {
			return {
				title: 'Hello',
				uid: "",
				bannerList: [],
				wikiList: [],
				bookList: [],
				subjectDetails: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		components: {
			uniNavBar
		},
		onLoad() {
			let uid = CacheManager.get('uid')
			if (!uid) {
				CacheManager.clear();
				uni.reLaunch({
					url: "../login/login"
				})
			} else {
				this.uid = uid;
				this.getBannerList();
			}
		},
		methods: {
			pageBack(){
				uni.navigateBack()
			},
			getBannerList() {
				let { uid } = this.$data;
				let userType = CacheManager.get('userType');
				let classCode = CacheManager.get('classCode');

				request('ella.home.appHome', {
					uid,
					classCode,
					resource: 'ios',
					userType
				}).then((res) => {
					if (res.status === '1') {
						this.bannerList = res.data[0].bannerList || []
						this.wikiList = res.data[1].wikiList || []
						this.subjectDetails = res.data[2].subjectDetails || {}
						this.bookList = res.data[3].bookList || {}
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

<style lang="scss">
	.content {
		width: 100%;
	}
	.status_bar {
	   height: 44px;
	   width: 100%;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.swiper {
		width: 100%;
		height: 400rpx;
	}

	.swiper-item {
		width: 100%;
		height: 400rpx;

		image {
			display: block;
			height: 100%;
			width: 100%;
		}
	}
	.wiki{
		display: flex;
		width: 95%;
		padding: 0 2.5%;
		align-items: center;
		align-content: center;
		height: 200rpx;
		border-bottom:1rpx solid #ccc;
		.wiki_item{
			font-size:28rpx;
			text-align: center;
			flex:1;
			color: #777;
			image{
				display: block;
				height: 100rpx;
				width: 100rpx;
				margin: 0 auto 20rpx;
			}
		}
	}
	.block{
		width: 94%;
		padding: 40rpx 3% 20rpx;
		border-bottom:1rpx solid #ccc;
	}
	.header{
		font-size: 36rpx;
		font-weight: 700;
		padding-bottom: 16rpx;
	}
	.recommend_image{
		display: block;
		width: 100%;
		border-radius: 8rpx;
		height: 220rpx;
	}
	.topicTitle{
		display: block;
		width: 100%;
		color: #777;
		font-size: 32rpx;
		line-height: 2;
		white-space:nowrap;/*规定段落中的文本不进行换行*/
		overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
		text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
	}
	.book_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.book_item{
		width: 31%;
		font-size: 28rpx;
		color: #777;
		image{
			display: block;
			border-radius: 8rpx;
			width: 100%;
			height: 320rpx;
		}
	}
	
</style>
