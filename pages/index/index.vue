<template>
	<view class="content">

		<uni-nav-bar title="动画绘本馆" fixed="true"></uni-nav-bar>
		<view class="status_bar"></view>
		<view style="width: 100%" v-for="(option, index) in indexData" :key="index">
			<swiper v-if="option.partType === 'BANNER'" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, num) in option.bannerList" v-bind:key="item.bannerCode">
					<view class="swiper-item">
						<image :src="item.bannerImageUrl"></image>
					</view>
				</swiper-item>
			</swiper>
			<view v-else-if="option.partType === 'WIKI'" class="wiki" >
				<navigator url="/pages/list/list" class="wiki_item" v-for="(item,index) in option.wikiList" :key="item.id">
					<image :src="item.imageUrl"></image>
					<text>{{item.sortTitle}}</text>
				</navigator>
			</view>
			<view v-else-if="option.partType === 'SUBJECT'" class="block">
				<view class="header">{{option.partTitle}}</view>
				<image class="recommend_image" :src="option.subjectDetails.topicImg"></image>
				<text class="topicTitle">{{option.subjectDetails.topicTitle}}</text>
			</view>
			<view v-else-if="option.partType === 'AD'" class="block">
				<image class="recommend_image" :src="option.adDetails.imageUrl"></image>
			</view>
			<view v-else-if="option.partType === 'CUSTOM'" class="block">
				<view class="header">{{option.partTitle}}</view>
				<view class="book_list">
					<view class="book_item" v-for="(item,index) in option.bookList" :key="item.bookCode">
						<image lazy-load :src="item.coverUrl"></image>
						<text>{{item.bookName}}</text>
					</view>
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
				indexData: [],
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
		onShow() {
			uni.getSavedFileList({
				success: function(res) {
					console.log(res.fileList.length);
					res.fileList.map((item) => {
						console.log(item)
					})
				}
			});
// 			let downloadTask = uni.downloadFile({
// 				url: 'http://book.ellabook.cn/c1e6282dc2714dd1a33f7b5238a66364', //仅为示例，并非真实接口地址。
// 				complete: () => {},
// 				success: (res) => {
// 					if (res.statusCode === 200) {
// 						console.log('下载成功');
// 						for(let key in res){
// 							console.log('key---', key, '>>>>', res[key])
// 						}
// 						var tempFilePaths = res.tempFilePath;
// 						uni.saveFile({
// 							tempFilePath: res.tempFilePath,
// 							success: function(res) {
// 								console.log('保存路径',res.savedFilePath);
// 							}
// 						});
// 					}
// 				}
// 			});
// 			downloadTask.onProgressUpdate((res) => {
// 				console.log('下载进度' + res.progress);
// 				console.log('已经下载的数据长度' + res.totalBytesWritten);
// 				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
// 
// 				// 测试条件，取消下载任务。
// 				// if (res.progress > 50) {
// 				// 	downloadTask.abort();
// 				// }
// 			})

		},
		methods: {
			getBannerList() {
				let {
					uid
				} = this.$data;
				let userType = CacheManager.get('userType');
				let classCode = CacheManager.get('classCode');

				request('ella.home.appHome', {
					uid,
					classCode,
					resource: 'ios',
					userType
				}).then((res) => {
					if (res.status === '1') {
						this.indexData = res.data || []
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

	.wiki {
		display: flex;
		width: 95%;
		padding: 0 2.5%;
		align-items: center;
		align-content: center;
		height: 200rpx;
		border-bottom: 1rpx solid #ccc;

		.wiki_item {
			font-size: 28rpx;
			text-align: center;
			flex: 1;
			color: #777;

			image {
				display: block;
				height: 100rpx;
				width: 100rpx;
				margin: 0 auto 20rpx;
			}
		}
	}

	.block {
		width: 94%;
		padding: 40rpx 3% 20rpx;
		border-bottom: 1rpx solid #ccc;
	}

	.header {
		font-size: 36rpx;
		font-weight: 700;
		padding-bottom: 16rpx;
	}

	.recommend_image {
		display: block;
		width: 100%;
		border-radius: 8rpx;
		height: 220rpx;
	}

	.topicTitle {
		display: block;
		width: 100%;
		color: #777;
		font-size: 32rpx;
		line-height: 2;
		white-space: nowrap;
		/*规定段落中的文本不进行换行*/
		overflow: hidden;
		/*内容会被修剪，并且其余内容是不可见的。*/
		text-overflow: ellipsis;
		/*显示省略号来代表被修剪的文本*/
	}

	.book_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.book_item {
		width: 31%;
		font-size: 28rpx;
		color: #777;
		image {
			display: block;
			border-radius: 8rpx;
			width: 100%;
			height: 320rpx;
		}
	}
</style>
